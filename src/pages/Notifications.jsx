import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store'
import { timeAgo } from '../utils/format'
import Avatar from '../components/Avatar'

export default function Notifications() {
  const { notifications, getUser, markRead } = useApp()
  useEffect(() => { const t = setTimeout(markRead, 1500); return () => clearTimeout(t) }, [markRead])

  return (
    <>
      <h1 className="border-b border-line p-4 text-xl font-bold">Alerts</h1>
      {notifications.length === 0 && <p className="p-6 text-muted">No alerts yet. Post something and see who reacts.</p>}
      {notifications.map((n) => {
        const u = getUser(n.userId)
        return (
          <Link key={n.id} to={`/tweet/${n.tweetId}`}
            className={`flex items-center gap-3 border-b border-line p-4 hover:bg-line ${n.read ? '' : 'bg-card font-bold'}`}>
            <Avatar name={u.name} size={36} />
            <span className="flex-1">{u.name} liked your post</span>
            <span className="font-normal text-muted">{timeAgo(n.createdAt)}</span>
          </Link>
        )
      })}
    </>
  )
}
