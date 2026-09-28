import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react'
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Level = 0 | 1 | 2 | 3 | 4
type Contribution = { date: string; count: number; level: Level }
type Repo = { name: string; count: number; logo?: ReactNode; href?: string }
type Hovered = { day: Contribution; x: number; y: number }
type Strings = { total: (n: number, year: number | null) => string; day: (n: number, date: string) => string; top: string; show: string; hide: string }

const SCALE = ['transparent', '#dff6a0', '#c8f53c', '#8fc41c', '#4a6600']
const CELL = 11
const MONTHS = 12
const STACK = 3
const WEEKS_PER_MONTH = 365.25 / 12 / 7
const MIN_LABEL_WEEKS = 3
const EASE = [0.22, 1, 0.36, 1] as const
const SPRING = { type: 'spring', bounce: 0.2, duration: 0.62 } as const
const HEADER_SPRING = { ...SPRING, bounce: 0.45 } as const
const ROW_SPRING = { ...SPRING, bounce: 0.26, delay: 0.08 } as const
const CELL_FADE = { duration: 0.2, ease: EASE } as const
const STAGGER = 0.012

const strings: Record<'pt' | 'en', Strings> = {
  pt: {
    total: (n, y) => `${n} contribuições${y ? ` em ${y}` : ''}`,
    day: (n, d) => `${n} ${n === 1 ? 'contribuição' : 'contribuições'} em ${d}`,
    top: 'Mais contribuições em:',
    show: 'Mostrar repositórios',
    hide: 'Ocultar repositórios',
  },
  en: {
    total: (n, y) => `${n} contributions${y ? ` in ${y}` : ''}`,
    day: (n, d) => `${n} ${n === 1 ? 'contribution' : 'contributions'} on ${d}`,
    top: 'Top contributions in:',
    show: 'Show top repositories',
    hide: 'Hide top repositories',
  },
}

const gapFor = (size: number) => Math.max(2, Math.round(size / 4))
const weeksFor = (months: number) => Math.max(1, Math.ceil(months * WEEKS_PER_MONTH))

function monthLabels(weeks: Contribution[][], locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, { month: 'short' })
  const labels: (string | null)[] = weeks.map(() => null)
  const monthAt = (i: number) => weeks[i]?.[0]?.date.slice(5, 7)
  let start = 0
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue
    if (i - start >= MIN_LABEL_WEEKS && weeks[start]?.[0]) {
      labels[start] = fmt.format(new Date(`${weeks[start][0].date}T00:00:00`)).replace('.', '')
    }
    start = i
  }
  return labels
}

async function fetchCalendar(login: string) {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${login}?y=last`)
  if (!res.ok) return null
  const days: { date: string; count: number; level: number }[] = (await res.json())?.contributions ?? []
  if (!days.length) return null
  const start = days.findIndex((d) => new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0)
  return days.slice(start < 0 ? 0 : start).map<Contribution>((d) => ({
    date: d.date,
    count: d.count,
    level: Math.min(4, Math.max(0, d.level)) as Level,
  }))
}

async function fetchRepos(login: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${login}/events/public?per_page=100`)
  if (!res.ok) return []
  const events: { type: string; repo?: { name: string }; payload?: { commits?: unknown[] } }[] = await res.json()
  const counts = new Map<string, number>()
  for (const e of events) {
    if (e.type !== 'PushEvent' || !e.repo) continue
    counts.set(e.repo.name, (counts.get(e.repo.name) ?? 0) + (e.payload?.commits?.length ?? 1))
  }
  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, STACK)
    .map(([full, count]) => {
      const [owner, name] = full.split('/')
      return {
        name,
        count,
        href: `https://github.com/${full}`,
        logo: owner.toLowerCase() === login.toLowerCase() ? undefined : <img src={`https://github.com/${owner}.png?size=64`} alt="" />,
      }
    })
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date()
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (weeks * 7 - 1 - i))
    return { date: d.toISOString().slice(0, 10), count: 0, level: 0 as Level }
  })
}

function useGitHub(login: string) {
  const [data, setData] = useState<{ contributions: Contribution[]; repos: Repo[] }>()
  useEffect(() => {
    let active = true
    Promise.all([fetchCalendar(login), fetchRepos(login)])
      .then(([contributions, repos]) => {
        if (active && contributions) setData({ contributions, repos })
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [login])
  return data
}

function useFittedColumns(size: number, gap: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<number>()
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setColumns(Math.max(1, Math.floor((el.clientWidth + gap) / (size + gap))))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [size, gap])
  return [ref, columns] as const
}

function Tooltip({ hovered, text, reduce }: { hovered: Hovered; text: string; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(hovered.x)
  useLayoutEffect(() => {
    const edge = 8 + (ref.current?.offsetWidth ?? 0) / 2
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge))
  }, [hovered])
  return createPortal(
    <div className="pointer-events-none fixed z-[70]" style={{ left, top: hovered.y, transform: 'translate(-50%, calc(-100% - 8px))' }}>
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-[11px] font-medium text-bg shadow-md"
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduce ? { duration: 0 } : { duration: 0.14, ease: EASE }}
      >
        {text}
      </motion.div>
    </div>,
    document.body,
  )
}

function Grid({ contributions, label, locale, s, reduce }: { contributions: Contribution[]; label: string; locale: string; s: Strings; reduce: boolean | null }) {
  const weeks = useMemo(() => {
    const out: Contribution[][] = []
    for (let i = 0; i < contributions.length; i += 7) out.push(contributions.slice(i, i + 7))
    return out
  }, [contributions])
  const gap = gapFor(CELL)
  const [ref, columns] = useFittedColumns(CELL, gap)
  const [hovered, setHovered] = useState<Hovered>()
  const cap = Math.min(weeks.length, weeksFor(MONTHS))
  const visible = weeks.slice(-Math.min(cap, columns ?? cap))
  const sweepEnd = (visible.length - 1) * STAGGER + CELL_FADE.duration
  const dateFmt = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })

  const hover = (day: Contribution) => (e: PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    setHovered({ day, x: r.left + r.width / 2, y: r.top })
  }

  return (
    <div ref={ref} role="img" aria-label={label} className="relative">
      <motion.div
        className="flex justify-center"
        style={{ gap, marginBottom: gap }}
        initial={reduce ? false : { opacity: 0, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : sweepEnd }}
      >
        {monthLabels(visible, locale).map((m, i) => (
          <div key={i} className="relative h-3 shrink-0" style={{ width: CELL }}>
            {m && <span className="absolute left-0 top-0 text-[10px] leading-none text-fg/40">{m}</span>}
          </div>
        ))}
      </motion.div>

      <div className="flex justify-center overflow-hidden" style={{ gap }} onPointerLeave={() => setHovered(undefined)}>
        {visible.map((week, wi) => (
          <div key={wi} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <motion.div
                key={day.date}
                onPointerEnter={hover(day)}
                className="shrink-0 rounded-[3px] bg-fg/[0.07]"
                style={{ width: CELL, height: CELL }}
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...CELL_FADE, delay: reduce ? 0 : wi * STAGGER }}
              >
                <div className="h-full w-full rounded-[3px]" style={{ backgroundColor: SCALE[day.level] }} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip
            key="tip"
            hovered={hovered}
            reduce={reduce}
            text={s.day(hovered.day.count, dateFmt.format(new Date(`${hovered.day.date}T00:00:00`)))}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function Avatar({ repo, layoutId, transition, className = '' }: { repo: Repo; layoutId: string; transition: Transition; className?: string }) {
  return (
    <motion.span
      layoutId={layoutId}
      transition={transition}
      className={`grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-surface text-[11px] font-medium uppercase text-fg/70 ring-2 ring-[#fbfbfa] [&_img]:size-full [&_img]:object-cover ${className}`}
    >
      {repo.logo ?? repo.name.charAt(0)}
    </motion.span>
  )
}

export function GitHubActivity({ username, lang, className = '' }: { username: string; lang: 'pt' | 'en'; className?: string }) {
  const reduce = useReducedMotion()
  const uid = useId()
  const [open, setOpen] = useState(false)
  const s = strings[lang]
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US'
  const fetched = useGitHub(username)
  const placeholder = useMemo(() => emptyDays(weeksFor(MONTHS)), [])
  const contributions = fetched?.contributions ?? placeholder
  const repos = fetched?.repos ?? []

  const transition = reduce ? { duration: 0 } : SPRING
  const headerTransition = reduce ? { duration: 0 } : HEADER_SPRING
  const rowTransition = reduce ? { duration: 0 } : ROW_SPRING
  const kick = reduce ? {} : { x: 16, y: 16 }

  const total = useMemo(() => contributions.reduce((sum, d) => sum + d.count, 0), [contributions])
  const parsedYear = Number(contributions.at(-1)?.date.slice(0, 4))
  const heading = s.total(total, Number.isFinite(parsedYear) ? parsedYear : null)

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#fbfbfa] p-4 ring-1 ring-line ${repos.length ? 'pb-[76px]' : ''} ${className}`}>
      <p className="mb-4 px-1.5 text-base font-medium">{heading}</p>

      <Grid contributions={contributions} label={heading} locale={locale} s={s} reduce={reduce} />

      {repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          className={`absolute inset-x-3 bottom-3 overflow-hidden bg-bg/90 backdrop-blur-xl ${open ? 'top-3' : ''}`}
          style={{ borderRadius: 18 }}
          transition={transition}
        >
          <motion.div layout="position" transition={headerTransition} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="truncate text-sm">{s.top}</span>
            <div className="flex items-center gap-3">
              {!open && (
                <div className="flex items-center">
                  {repos.map((repo, i) => (
                    <Avatar key={i} repo={repo} layoutId={`${uid}-${i}`} transition={transition} className="-ml-2 first:ml-0" />
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={open ? s.hide : s.show}
                className="grid size-7 shrink-0 place-items-center rounded-full bg-[#fbfbfa] text-fg/40"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="size-7"
                  initial={false}
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={transition}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                </motion.svg>
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                initial={{ opacity: 0, ...kick }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, ...kick }}
                transition={rowTransition}
                className="px-0.5 pb-1"
              >
                {repos.map((repo, i) => (
                  <li key={i}>
                    <a
                      href={repo.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-fg/5"
                    >
                      <Avatar repo={repo} layoutId={`${uid}-${i}`} transition={transition} />
                      <span className="flex-1 truncate text-sm">{repo.name}</span>
                      <span className="text-sm tabular-nums text-fg/70">{repo.count}</span>
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
