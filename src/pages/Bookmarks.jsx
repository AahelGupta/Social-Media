import TweetCard from '../components/TweetCard'
import { useApp } from '../store'

export default function Bookmarks() {
  const { tweets, bookmarks } = useApp()
  const saved = tweets.filter((t) => bookmarks.includes(t.id))
  return (
    <>
      <h1 className="border-b border-line p-4 text-xl font-bold">Bookmarks</h1>
      {saved.length === 0 && <p className="p-6 text-muted">Nothing saved yet. Select Save on any post to keep it here.</p>}
      {saved.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </>
  )
}
