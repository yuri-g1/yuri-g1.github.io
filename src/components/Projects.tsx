import { useLang } from '../i18n/context'
import { GitHubActivity } from './GitHubActivity'
import { Reveal } from './Reveal'

const SAP_COVER = '/sap-validator.png'

export function Projects() {
  const { t, lang } = useLang()
  const p = t.projects.items.find((item) => item.title.includes('SAP')) ?? t.projects.items[0]
  const cover = p.gallery[0] ?? SAP_COVER
  const site = t.projects.items.find((item) => item.gallery[0] === '/logistics-scheduling.png') ?? t.projects.items[0]

  return (
    <section id="projetos" className="mx-auto w-full max-w-[1400px] scroll-mt-24 px-4 md:px-8">
      <Reveal>
        <h2 className="text-right text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">{t.projects.title}</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3 md:mt-16 lg:grid-cols-12">
        <Reveal className="overflow-hidden rounded-3xl bg-[#fbfbfa] ring-1 ring-line lg:col-span-7">
          <div className="relative aspect-[16/10] bg-surface">
            <img src={cover} alt={`${t.projects.imageAlt} ${p.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top" />
          </div>
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <div>
              {p.status && <p className="w-fit rounded-full bg-accent px-2.5 py-0.5 text-sm font-medium">{p.status}</p>}
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">{p.title}</h3>
              <p className="mt-3 max-w-[56ch] leading-relaxed text-fg/70">{p.details || p.description}</p>
            </div>
            {p.stack.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s.slug} className="inline-flex items-center gap-2 rounded-full bg-bg px-3 py-1.5 text-sm font-medium ring-1 ring-line">
                    <img src={`https://cdn.simpleicons.org/${s.slug}`} alt="" className="size-4" />
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex flex-col gap-3 lg:col-span-5">
          <GitHubActivity username="yuri-g1" lang={lang} className="w-full" />
          <article className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-[#fbfbfa] ring-1 ring-line">
            <div className="relative aspect-[16/9] bg-surface">
              <img src={site.gallery[0]} alt={`${t.projects.imageAlt} ${site.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">{site.title}</h3>
              <p className="mt-3 leading-relaxed text-fg/70">{site.description}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
