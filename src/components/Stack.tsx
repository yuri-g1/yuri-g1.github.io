import { stack } from '../data'

export function Stack() {
  return (
    <div className="marquee overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul className="marquee-track flex w-max gap-14 pr-14">
        {[...stack, ...stack].map((s, i) => (
          <li key={i} aria-hidden={i >= stack.length} className="flex items-center gap-3 text-muted">
            <span
              className="size-6 bg-current"
              style={{
                maskImage: `url(https://cdn.simpleicons.org/${s.slug})`,
                WebkitMaskImage: `url(https://cdn.simpleicons.org/${s.slug})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            />
            <span className="whitespace-nowrap text-lg font-medium tracking-tight">{s.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
