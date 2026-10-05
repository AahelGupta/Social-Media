import { Link } from 'react-router-dom'
import { useApp } from '../store'
import Avatar from './Avatar'
import FollowButton from './FollowButton'

export default function WhoToFollow() {
  const { suggestions } = useApp()
  return (
    <div className="mt-4 rounded-2xl border border-line bg-card p-4">
      <h2 className="mb-2 text-lg font-bold">Who to follow</h2>
      {suggestions.length === 0 && <p className="text-muted">You follow everyone here.</p>}
      {suggestions.slice(0, 3).map((u) => (
        <div key={u.id} className="flex items-center gap-2 py-2">
          <Avatar name={u.name} size={36} />
          <Link to={`/profile/${u.handle}`} className="min-w-0 flex-1 truncate font-bold hover:underline">{u.name}</Link>
          <FollowButton userId={u.id} />
        </div>
      ))}
    </div>
  )
}
