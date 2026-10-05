export default function Avatar({ name, size = 44 }) {
  return (
    <div style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-ink">
      {name[0]}
    </div>
  )
}
