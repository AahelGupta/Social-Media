import { useSearchParams, Link } from 'react-router-dom'
import TweetCard from '../components/TweetCard'
import { useApp } from '../store'

export default function Explore() {
  const { tweets, trending, allUsers } = useApp()
  const [params, setParams] = useSearchParams()
  const tag = params.get('tag') || ''
  const q = params.get('q') || ''
  const needle = (tag || q).toLowerCase()
  const results = needle ? tweets.filter((t) => t.text.toLowerCase().includes(needle)) : tweets

  return (
    <>
      <div className="border-b border-line p-4">
        <h1 className="mb-3 text-xl font-bold">Explore</h1>
        <label htmlFor="search" className="sr-only">Search posts</label>
        <input id="search" value={tag ? tag : q} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})}
          placeholder="Search posts or hashtags"
          className="w-full rounded-full border border-line bg-card px-4 py-2 outline-none focus:border-accent" />
        <div className="mt-3 flex flex-wrap gap-2">
          {trending.map(([h]) => (
            <Link key={h} to={`/explore?tag=${encodeURIComponent(h)}`}
              className={`rounded-full border border-line px-3 py-1 text-sm ${tag === h ? 'bg-accent text-accent-ink' : 'hover:bg-line'}`}>{h}</Link>
          ))}
        </div>
      </div>
      <div className="border-b border-line p-4">
        <h2 className="mb-2 font-bold">People</h2>
        <div className="flex flex-wrap gap-3">
          {allUsers.map((u) => <Link key={u.id} to={`/profile/${u.handle}`} className="text-accent hover:underline">@{u.handle}</Link>)}
        </div>
      </div>
      {results.length === 0 && <p className="p-6 text-muted">No posts match “{needle}”. Try another word or hashtag.</p>}
      {results.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </>
  )
}
