import { useParams, Link } from 'react-router-dom'
import Composer from '../components/Composer'
import TweetCard from '../components/TweetCard'
import { useApp } from '../store'

export default function TweetDetail() {
  const { id } = useParams()
  const { tweets, getUser } = useApp()
  const tweet = tweets.find((t) => t.id === id)
  if (!tweet) return <p className="p-6 text-muted">This post was deleted or doesn’t exist. <Link to="/" className="text-accent">Back to Home</Link></p>
  const parent = tweet.parentId && tweets.find((t) => t.id === tweet.parentId)
  const replies = tweets.filter((t) => t.parentId === id)

  return (
    <>
      <h1 className="border-b border-line p-4 text-xl font-bold">Post</h1>
      {parent && (
        <Link to={`/tweet/${parent.id}`} className="block border-b border-line px-4 py-2 text-muted hover:text-accent">
          Replying to @{getUser(parent.userId).handle}
        </Link>
      )}
      <TweetCard tweet={tweet} />
      <Composer parentId={id} />
      {replies.length === 0 && <p className="p-6 text-muted">No replies yet. Write the first one.</p>}
      {replies.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </>
  )
}
