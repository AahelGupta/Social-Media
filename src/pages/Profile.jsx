import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TweetCard from '../components/TweetCard'
import { useApp } from '../store'
import FollowButton from '../components/FollowButton'

export default function Profile() {
  const { handle } = useParams()
  const { allUsers, me, tweets, updateProfile } = useApp()
  const user = allUsers.find((u) => u.handle === handle)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: me.name, bio: me.bio })

  if (!user) return <p className="p-6 text-muted">No user with the handle @{handle}.</p>
  const mine = user.id === me.id
  const posts = tweets.filter((t) => t.userId === user.id && !t.parentId)
  const stat = mine ? `${me.following.length} following` : `${user.followers + (me.following.includes(user.id) ? 1 : 0)} followers`
  const save = () => { updateProfile({ name: form.name.trim() || me.name, bio: form.bio }); setEditing(false) }
  const input = 'w-full rounded-lg border border-line bg-card px-3 py-2 outline-none focus:border-accent'

  return (
    <>
      <div className="border-b border-line p-6">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-accent-ink">{user.name[0]}</div>
        {editing ? (
          <div className="space-y-2">
            <input aria-label="Name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <textarea aria-label="Bio" className={input} rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            <button onClick={save} className="rounded-full bg-accent px-4 py-1.5 font-bold text-accent-ink">Save profile</button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold">{user.name}</h1>
            <p className="text-muted">@{user.handle}</p>
            <p className="mt-2">{user.bio}</p>
            <p className="mt-1 text-muted">{stat}</p>
            {!mine && <div className="mt-3"><FollowButton userId={user.id} /></div>}
            {mine && <button onClick={() => setEditing(true)} className="mt-3 rounded-full border border-line px-4 py-1.5 hover:bg-line">Edit profile</button>}
          </>
        )}
      </div>
      {posts.length === 0 && <p className="p-6 text-muted">{mine ? 'You haven’t posted yet. Head to Home to write one.' : 'No posts yet.'}</p>}
      {posts.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </>
  )
}
