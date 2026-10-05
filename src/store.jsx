import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loadData, saveData } from './api'
import { tagsOf } from './utils/format'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)
const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

export function AppProvider({ children }) {
  const [data, setData] = useState(null)
  const [dark, setDark] = useState(() => localStorage.getItem('chirp:dark') === '1')

  useEffect(() => { loadData().then(setData) }, [])
  useEffect(() => { if (data) saveData(data) }, [data])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('chirp:dark', dark ? '1' : '0')
  }, [dark])

  const post = useCallback((text, parentId = null) => {
    const id = 't' + Date.now()
    setData((d) => ({ ...d, tweets: [{ id, userId: d.me.id, text: text.trim(), parentId, createdAt: new Date().toISOString(), likes: [] }, ...d.tweets] }))
    // Simulated activity: another user likes your post a moment later.
    setTimeout(() => setData((d) => {
      if (!d.tweets.some((t) => t.id === id)) return d
      const u = d.users[Math.floor(Math.random() * d.users.length)]
      return {
        ...d,
        tweets: d.tweets.map((t) => (t.id === id ? { ...t, likes: [...new Set([...t.likes, u.id])] } : t)),
        notifications: [{ id: 'n' + Date.now(), type: 'like', userId: u.id, tweetId: id, createdAt: new Date().toISOString(), read: false }, ...d.notifications],
      }
    }), 2500)
  }, [])

  const toggleLike = useCallback((id) => setData((d) => ({
    ...d, tweets: d.tweets.map((t) => (t.id === id ? { ...t, likes: toggle(t.likes, d.me.id) } : t)),
  })), [])
  const toggleBookmark = useCallback((id) => setData((d) => ({ ...d, bookmarks: toggle(d.bookmarks, id) })), [])
  const toggleFollow = useCallback((uid) => setData((d) => ({ ...d, me: { ...d.me, following: toggle(d.me.following, uid) } })), [])
  const deleteTweet = useCallback((id) => setData((d) => ({ ...d, tweets: d.tweets.filter((t) => t.id !== id && t.parentId !== id) })), [])
  const markRead = useCallback(() => setData((d) => (d.notifications.some((n) => !n.read)
    ? { ...d, notifications: d.notifications.map((n) => ({ ...n, read: true })) } : d)), [])
  const updateProfile = useCallback((patch) => setData((d) => ({ ...d, me: { ...d.me, ...patch } })), [])

  if (!data) return <p className="p-8 text-muted">Loading…</p>

  const allUsers = [data.me, ...data.users]
  const getUser = (id) => allUsers.find((u) => u.id === id)
  const counts = {}
  data.tweets.filter((t) => !t.parentId).forEach((t) => tagsOf(t.text).forEach((h) => { counts[h] = (counts[h] || 0) + 1 }))
  const trending = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const unread = data.notifications.filter((n) => !n.read).length
  const suggestions = data.users.filter((u) => !data.me.following.includes(u.id))

  return (
    <Ctx.Provider value={{ ...data, allUsers, getUser, trending, unread, suggestions, dark, setDark,
      post, toggleLike, toggleBookmark, toggleFollow, deleteTweet, markRead, updateProfile }}>
      {children}
    </Ctx.Provider>
  )
}
