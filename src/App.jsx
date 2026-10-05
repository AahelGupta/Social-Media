import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import TweetDetail from './pages/TweetDetail'
import Bookmarks from './pages/Bookmarks'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="tweet/:id" element={<TweetDetail />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile/:handle" element={<Profile />} />
        <Route path="*" element={<p className="p-6 text-muted">Page not found.</p>} />
      </Route>
    </Routes>
  )
}
