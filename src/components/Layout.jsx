import { NavLink, Outlet, Link } from 'react-router-dom'
import { useApp } from '../store'
import WhoToFollow from './WhoToFollow'

export default function Layout() {
  const { me, trending, unread, dark, setDark } = useApp()
  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/explore', label: 'Explore' },
    { to: '/bookmarks', label: 'Bookmarks' },
    { to: '/notifications', label: unread ? `Alerts (${unread})` : 'Alerts' },
    { to: `/profile/${me.handle}`, label: 'Profile' },
  ]
  const cls = ({ isActive }) =>
    `rounded-full px-2 py-2 text-sm md:px-4 md:text-lg ${isActive ? 'bg-accent text-accent-ink font-bold' : 'hover:bg-line'}`

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col gap-2 p-4 md:flex">
        <Link to="/" className="mb-4 text-3xl font-extrabold text-accent">Chirp</Link>
        {links.map((l) => <NavLink key={l.to} {...l} className={cls}>{l.label}</NavLink>)}
        <button onClick={() => setDark(!dark)} className="mt-auto rounded-full border border-line px-4 py-2 text-left hover:bg-line">
          {dark ? 'Switch to light mode' : 'Switch to dark mode'}
        </button>
      </aside>

      <main className="min-w-0 flex-1 border-x border-line pb-20 md:pb-0">
        <header className="flex items-center justify-between border-b border-line p-4 md:hidden">
          <span className="text-2xl font-extrabold text-accent">Chirp</span>
          <button onClick={() => setDark(!dark)} className="rounded-full border border-line px-3 py-1 text-sm">
            {dark ? 'Light' : 'Dark'}
          </button>
        </header>
        <Outlet />
      </main>

      <aside className="hidden w-72 shrink-0 p-4 lg:block">
        <div className="rounded-2xl border border-line bg-card p-4">
          <h2 className="mb-2 text-lg font-bold">Trending hashtags</h2>
          {trending.length === 0 && <p className="text-muted">No hashtags yet. Add one to a post.</p>}
          {trending.map(([tag, n]) => (
            <Link key={tag} to={`/explore?tag=${encodeURIComponent(tag)}`} className="flex justify-between py-1 hover:text-accent">
              <span>{tag}</span><span className="text-muted">{n} {n === 1 ? 'post' : 'posts'}</span>
            </Link>
          ))}
        </div>
        <WhoToFollow />
      </aside>

      <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-line bg-card p-2 md:hidden">
        {links.map((l) => <NavLink key={l.to} {...l} className={cls}>{l.label}</NavLink>)}
      </nav>
    </div>
  )
}
