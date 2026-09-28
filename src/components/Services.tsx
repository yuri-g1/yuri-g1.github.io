import { BrowsersIcon, BugBeetleIcon, CubeIcon, FigmaLogoIcon, GaugeIcon, HardDrivesIcon, type Icon } from '@phosphor-icons/react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

const icons: Icon[] = [BrowsersIcon, FigmaLogoIcon, GaugeIcon, CubeIcon, HardDrivesIcon, BugBeetleIcon]

const spans = ['md:col-span-2 md:row-span-2', '', '', '', '', '']
const card = 'bg-[#fbfbfa] ring-1 ring-line shadow-[0_20px_40px_-24px_rgb(18_18_17/0.22)]'
const tones = ['bg-fg text-bg', card, card, card, card, card]

export function Services() {
  const { t } = useLang()

  return (
    <section className="mx-auto mt-10 w-full max-w-[1400px] px-4 md:mt-16 md:px-8">
      <Reveal>
        <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:-ml-1 md:text-7xl lg:-ml-2">{t.services.title}</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:auto-rows-[minmax(240px,auto)] md:grid-cols-3">
        {t.services.items.map((s, i) => {
          const Icon = icons[i]
          const featured = i === 0
          return (
            <Reveal key={i} delay={(i % 3) * 0.06} className={spans[i]}>
              <article
                className={`relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl p-6 md:p-8 ${tones[i]}`}
              >
                {featured && (
                  <img
                    src="/landing-pages.webp"
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-left-top opacity-40"
                  />
                )}
                {featured && <div className="absolute inset-0 bg-gradient-to-t from-fg via-fg/70 to-fg/20" />}
                {!featured && (
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-accent text-fg">
                    <Icon size={24} weight="duotone" />
                  </span>
                )}
                <div className={`relative ${featured ? 'mt-auto' : ''}`}>
                  <h3 className={`${featured ? 'text-4xl md:text-5xl' : 'text-2xl'} font-semibold tracking-[-0.03em]`}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-[40ch] ${featured ? 'text-bg/70 md:text-lg' : 'text-muted'}`}>
                    {s.description}
                  </p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
