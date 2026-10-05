import Composer from '../components/Composer'
import TweetCard from '../components/TweetCard'
import { useState } from 'react'
import { useApp } from '../store'

export default function Home() {
  const { tweets, me } = useApp()
  const [tab, setTab] = useState('all')
  const feed = tweets.filter((t) => !t.parentId && (tab === 'all' || t.userId === me.id || me.following.includes(t.userId)))
  return (
    <>
      <div role="tablist" className="flex border-b border-line">
        {[['all', 'For you'], ['following', 'Following']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`flex-1 p-4 font-bold ${tab === k ? 'border-b-4 border-accent' : 'text-muted hover:bg-line'}`}>{label}</button>
        ))}
      </div>
      <Composer />
      {feed.length === 0 && <p className="p-6 text-muted">Nothing here yet. Follow people or write a post.</p>}
      {feed.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </>
  )
}
