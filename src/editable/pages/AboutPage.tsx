import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1080px] px-4 py-10 sm:px-6 lg:py-16">
          <div className="overflow-hidden rounded-[2.4rem] border border-[#186f65]/12 bg-[linear-gradient(135deg,#186f65_0%,#3c8c68_45%,#b2533e_100%)] text-white shadow-[0_24px_70px_rgba(24,111,101,0.14)]">
            <div className="px-7 py-10 sm:px-10 sm:py-14">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-soft)]">{pagesContent.about.badge}</p>
              <h1 className="editorial-brand mt-5 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">
                Independent media, built for clear stories.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">{pagesContent.about.description}</p>
            </div>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <article className="rounded-[2rem] border border-[#186f65]/12 bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#b2533e]">About {SITE_CONFIG.name}</p>
              <div className="article-content mt-8 space-y-6">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="grid gap-4">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className="rounded-[1.8rem] border border-[#186f65]/12 bg-[var(--slot4-surface-bg)] p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b2533e]">0{index + 1}</p>
                  <h2 className="mt-4 text-2xl font-black leading-tight text-[var(--slot4-dark-bg)]">{value.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </section>

          <section className="mt-8 rounded-[2rem] bg-[var(--slot4-dark-bg)] px-7 py-8 text-white sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="editorial-brand max-w-2xl text-4xl font-black leading-none sm:text-5xl">Read the stories shaping the conversation.</h2>
              <Link href="/search" className="inline-flex w-fit rounded-full bg-[#b2533e] px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">Explore the archive</Link>
            </div>
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
