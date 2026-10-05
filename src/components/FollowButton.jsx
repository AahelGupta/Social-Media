import { useApp } from '../store'

export default function FollowButton({ userId }) {
  const { me, toggleFollow } = useApp()
  const on = me.following.includes(userId)
  return (
    <button onClick={() => toggleFollow(userId)} aria-pressed={on}
      className={`rounded-full px-4 py-1.5 text-sm font-bold ${on ? 'border border-line hover:text-heart' : 'bg-accent text-accent-ink'}`}>
      {on ? 'Following' : 'Follow'}
    </button>
  )
}
