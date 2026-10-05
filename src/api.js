// Mock backend persisted in localStorage.
// To use a real API (JSON Server, MockAPI, Supabase), replace loadData/saveData with fetch() calls.
const KEY = 'chirp:v2'
const ago = (m) => new Date(Date.now() - m * 60000).toISOString()

const seed = {
  me: { id: 'u0', name: 'You', handle: 'you', bio: 'Building in public.', following: ['u1'] },
  users: [
    { id: 'u1', name: 'Asha Rao', handle: 'asha', bio: 'Frontend dev. Coffee, CSS, repeat.', followers: 120 },
    { id: 'u2', name: 'Dev Patel', handle: 'devp', bio: 'Shipping small things every day.', followers: 86 },
    { id: 'u3', name: 'Mira Sen', handle: 'mira', bio: 'Designer who codes a little.', followers: 240 },
  ],
  tweets: [
    { id: 't1', userId: 'u1', text: 'Tailwind v4 config being just CSS is lovely. #react #tailwind', createdAt: ago(12), likes: ['u2'] },
    { id: 't2', userId: 'u2', text: 'Rebuilt my timeline with React Router today. #react #webdev', createdAt: ago(55), likes: ['u1', 'u3'] },
    { id: 't3', userId: 'u3', text: 'Dark mode is a design token problem, not a styling problem. #design', createdAt: ago(190), likes: [] },
    { id: 't4', userId: 'u1', text: 'Small components, clear props, fewer bugs. #react', createdAt: ago(600), likes: ['u3'] },
    { id: 't5', userId: 'u0', text: 'Hello Chirp! #welcome', createdAt: ago(900), likes: ['u1'] },
    { id: 't6', userId: 'u3', parentId: 't2', text: 'Nice. Did you use nested routes?', createdAt: ago(40), likes: [] },
  ],
  bookmarks: [],
  notifications: [{ id: 'n1', type: 'like', userId: 'u1', tweetId: 't5', createdAt: ago(800), read: false }],
}

export async function loadData() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return seed
}

export async function saveData(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
}
