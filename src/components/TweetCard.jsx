import { Link } from 'react-router-dom'
import { useApp } from '../store'
import { timeAgo } from '../utils/format'
import Avatar from './Avatar'

function RichText({ text }) {
  return text.split(/(#\w+)/g).map((part, i) =>
    part.startsWith('#')
      ? <Link key={i} to={`/explore?tag=${encodeURIComponent(part.toLowerCase())}`} className="text-accent hover:underline">{part}</Link>
      : part
  )
}

export default function TweetCard({ tweet }) {
  const { getUser, me, tweets, bookmarks, toggleLike, toggleBookmark, deleteTweet } = useApp()
  const user = getUser(tweet.userId)
  const liked = tweet.likes.includes(me.id)
  const saved = bookmarks.includes(tweet.id)
  const replies = tweets.filter((t) => t.parentId === tweet.id).length
  const btn = 'rounded-full px-2 py-1 text-sm hover:bg-line'

  return (
    <article className="flex gap-3 border-b border-line p-4">
      <Avatar name={user.name} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Link to={`/profile/${user.handle}`} className="font-bold hover:underline">{user.name}</Link>
          <span className="text-muted">@{user.handle}</span>
          <Link to={`/tweet/${tweet.id}`} className="text-muted hover:underline">{timeAgo(tweet.createdAt)}</Link>
        </div>
        <p className="mt-1 whitespace-pre-wrap break-words"><RichText text={tweet.text} /></p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Link to={`/tweet/${tweet.id}`} className={`${btn} text-muted`}>Reply · {replies}</Link>
          <button onClick={() => toggleLike(tweet.id)} aria-pressed={liked} className={`${btn} ${liked ? 'font-bold text-heart' : 'text-muted'}`}>
            {liked ? 'Liked' : 'Like'} · {tweet.likes.length}
          </button>
          <button onClick={() => toggleBookmark(tweet.id)} aria-pressed={saved} className={`${btn} ${saved ? 'font-bold text-accent' : 'text-muted'}`}>
            {saved ? 'Saved' : 'Save'}
          </button>
          {tweet.userId === me.id && (
            <button onClick={() => window.confirm('Delete this post?') && deleteTweet(tweet.id)} className={`${btn} text-muted hover:text-heart`}>Delete</button>
          )}
        </div>
      </div>
    </article>
  )
}
