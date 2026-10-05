import { useState } from 'react'
import { useApp } from '../store'

const MAX = 280

export default function Composer({ parentId = null }) {
  const { post, me } = useApp()
  const [text, setText] = useState('')
  const left = MAX - text.length
  const submit = () => { if (text.trim() && left >= 0) { post(text, parentId); setText('') } }

  return (
    <div className="border-b border-line p-4">
      <label htmlFor="composer" className="sr-only">Write a post as {me.name}</label>
      <textarea
        id="composer" value={text} onChange={(e) => setText(e.target.value)} rows={3}
        placeholder={parentId ? 'Write your reply' : "What's happening? Try adding a #hashtag"}
        className="w-full resize-none bg-transparent text-lg outline-none placeholder:text-muted"
      />
      <div className="flex items-center justify-end gap-3">
        <span className={left < 20 ? 'text-heart' : 'text-muted'}>{left}</span>
        <button onClick={submit} disabled={!text.trim() || left < 0}
          className="rounded-full bg-accent px-5 py-2 font-bold text-accent-ink disabled:opacity-40">
          {parentId ? 'Reply' : 'Post'}
        </button>
      </div>
    </div>
  )
}
