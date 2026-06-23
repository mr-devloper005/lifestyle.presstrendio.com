import Link from 'next/link'
import { ArrowRight, Globe2, Headphones, Plus, Search, Shapes, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

const faqItems = [
  'How much does it cost to distribute a release?',
  'What is the best way to reach the right outlets?',
  'How do teams coordinate press assets across channels?',
  'What should go into a strong launch announcement?',
  'How can brands keep media workflows organized?',
]

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const headline = lead?.title || `There for every stage of your story.`
  const subhead = getEditableExcerpt(lead, 220) || `Distribution, outreach, newsroom visibility, and campaign support built for fast-moving communications teams.`

  return (
    <section className="premium-hero-curve isolate bg-[var(--hero-gradient)] text-[var(--slot4-page-text)]">
      <div className={`${dc.shell.section} relative py-10 sm:py-14 lg:py-20`}>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-soft)]">Media distribution platform</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[5.4rem]">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--slot4-page-text)]/80 sm:text-lg">
              {subhead}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--slot4-page-text)]/72">
              One platform for release planning, media visibility, content discovery, and the teams keeping every announcement moving.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="border border-white/35 px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <Link href={lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute} className="glass-card group block rounded-[2rem] border border-white/30 shadow-[0_28px_70px_rgba(0,0,0,0.18)]">
              <div className="bg-[rgba(252,224,155,.52)] px-5 py-5 text-[var(--slot4-page-text)]">
                <p className="text-4xl font-light leading-none sm:text-5xl">Get your story seen</p>
                <p className="mt-2 text-4xl font-black leading-none sm:text-5xl">in the right places.</p>
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-right text-2xl font-semibold text-[var(--slot4-dark-bg)]">Media Visibility</p>
                <h2 className="mt-8 text-3xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">
                  {lead?.title || SITE_CONFIG.name}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">
                  {getEditableExcerpt(lead, 140)}
                </p>
              </div>
              <div className="bg-white px-5 py-3 text-[var(--slot4-dark-bg)]">
                <p className="text-2xl font-black tracking-[-0.04em]">Monthly Reach: Category-led discovery</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const logos = ['Sherwin Williams', 'Moderna', 'LG', 'Kohler', 'Merck', '5WPR']
  const statCards = [
    { label: 'Experience', value: '20+', copy: 'Years supporting public-facing communications and release workflows.' },
    { label: 'Global Reach', value: '120+', copy: 'Markets and categories covered through active distribution planning.' },
    { label: 'Real Humans', value: '100%', copy: 'Clear handoff between launch planning, outreach, and support.' },
    { label: 'One Platform', value: '1 login', copy: 'A connected workspace for releases, media lists, and visibility tracking.' },
  ]
  const railPosts = posts.slice(2, 8)

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-light tracking-[-0.05em] text-[var(--slot4-accent-fill)] sm:text-6xl">Brands we&apos;ve supported at every stage.</h2>
          <p className="mt-6 text-center text-lg leading-8 text-[var(--slot4-muted-text)]">
            From launches and announcements to media rollouts and executive updates, teams need a surface that stays calm while the story moves fast.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="hidden text-5xl text-[var(--slot4-dark-bg)] md:block">‹</div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="flex min-h-32 items-center justify-center border border-[#186f65]/10 bg-white px-4 text-center text-2xl font-black tracking-[-0.04em] text-[var(--slot4-dark-bg)] shadow-sm">
                {logo}
              </div>
            ))}
          </div>
          <div className="hidden text-5xl text-[var(--slot4-dark-bg)] md:block">›</div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {statCards.map((item) => (
            <article key={item.label} className="rounded-[2rem] border border-[#186f65]/12 bg-white p-6 shadow-[0_18px_42px_rgba(24,111,101,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">{item.label}</p>
              <h3 className="mt-5 text-5xl font-black tracking-[-0.06em] text-[var(--slot4-dark-bg)]">{item.value}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--slot4-muted-text)]">{item.copy}</p>
            </article>
          ))}
        </div>

        {railPosts.length ? (
          <div className="mt-14">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Latest coverage</p>
                <h3 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--slot4-dark-bg)]">What teams are launching now</h3>
              </div>
              <Link href={primaryRoute} className="hidden text-sm font-black text-[var(--slot4-dark-bg)] hover:text-[var(--slot4-accent-fill)] sm:inline-flex">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className={dc.layout.rail}>
              {railPosts.map((post, index) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="w-[250px] shrink-0 snap-start rounded-[1.8rem] border border-[#186f65]/12 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-[280px]">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">
                    {String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}
                  </p>
                  <h4 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const briefs = posts.slice(6, 9)
  const dataPost = posts[9] || posts[1] || feature
  const analyticsPost = posts[10] || posts[2] || feature
  const features = [
    {
      title: 'Distribution',
      body: 'Launch announcements with room for strong headlines, category context, and release-ready supporting details.',
      href: primaryRoute,
      post: feature,
    },
    {
      title: 'Media Database & Monitoring',
      body: 'Keep lists, discovery, and media context visible while you prepare and publish the story.',
      href: dataPost ? postHref(primaryTask, dataPost, primaryRoute) : primaryRoute,
      post: dataPost,
    },
    {
      title: 'Insights & Analytics',
      body: 'Understand what moved, what resonated, and what deserves a second wave after publication.',
      href: analyticsPost ? postHref(primaryTask, analyticsPost, primaryRoute) : primaryRoute,
      post: analyticsPost,
    },
  ]

  return (
    <section className="bg-[linear-gradient(180deg,#fffdf5_0%,#fffdf5_58%,#eef2db_58%,#eef2db_100%)]">
      <div className={`${dc.shell.section} py-16 sm:py-20`}>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-light tracking-[-0.05em] text-[var(--slot4-accent-fill)] sm:text-6xl">Two platforms. One team. Built for wherever you are.</h2>
          <p className="mt-6 text-lg leading-9 text-[var(--slot4-muted-text)]">
            Modern communications teams do not need more tools to juggle. They need one clear environment for visibility, publishing, and follow-through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {features.map((item, index) => (
            <Link key={item.title} href={item.href} className={`group rounded-[2rem] border border-[#186f65]/12 p-7 shadow-[0_22px_48px_rgba(24,111,101,0.10)] ${index === 0 ? 'bg-[var(--slot4-dark-bg)] text-white' : 'bg-white text-[var(--slot4-page-text)]'}`}>
              <div className="p-7">
                <p className={`text-xs font-black uppercase tracking-[0.22em] ${index === 0 ? 'text-[var(--slot4-accent-soft)]' : 'text-[var(--slot4-accent-fill)]'}`}>{index === 0 ? 'Featured workflow' : 'Product lane'}</p>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.05em]">{item.title}</h3>
                <p className={`mt-4 text-base leading-8 ${index === 0 ? 'text-white/76' : 'text-[var(--slot4-muted-text)]'}`}>{item.body}</p>
                <p className={`mt-4 text-sm leading-7 ${index === 0 ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{getEditableExcerpt(item.post, 120)}</p>
                <span className={`mt-6 inline-flex text-sm font-black ${index === 0 ? 'text-white' : 'text-[var(--slot4-dark-bg)]'}`}>Explore <ArrowRight className="ml-2 h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>

        {briefs.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {briefs.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="rounded-[1.8rem] border border-[#186f65]/12 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
                <h4 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : posts.slice(3)
  const lead = source[0] || posts[0]
  const listPosts = source.slice(1, 6)
  if (!lead) return null

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} py-16 sm:py-20`}>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-light tracking-[-0.05em] text-[var(--slot4-accent-fill)] sm:text-6xl">Straight answers to what prospects ask before they sign up.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slot4-muted-text)]">
            Search the archive, browse topic-led stories, and move between high-level strategy and practical release examples without losing context.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group rounded-[2rem] border border-[#186f65]/12 bg-white p-8 shadow-[0_20px_50px_rgba(24,111,101,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Editor&apos;s pick</p>
            <h3 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[var(--slot4-dark-bg)]">{lead.title}</h3>
            <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(lead, 185)}</p>
            <span className="mt-6 inline-flex text-sm font-black text-[var(--slot4-dark-bg)]">Read full story <ArrowRight className="ml-2 h-4 w-4" /></span>
          </Link>

          <div className="rounded-[2rem] border border-[#186f65]/12 bg-white px-6 py-4 shadow-sm">
            {faqItems.map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 border-b border-[#186f65]/10 py-5 last:border-b-0">
                <p className="text-xl tracking-[-0.03em] text-[var(--slot4-accent-fill)]">{item}</p>
                <Plus className="h-5 w-5 shrink-0 text-[var(--slot4-dark-bg)]" />
              </div>
            ))}
          </div>
        </div>

        {listPosts.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {listPosts.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group rounded-[1.8rem] border border-[#186f65]/12 p-5 shadow-sm ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--slot4-panel-bg)]'}`}>
                <div className={`grid gap-4 ${index % 3 === 0 ? 'sm:grid-cols-[1fr_110px]' : 'sm:grid-cols-[110px_1fr]'}`}>
                  {index % 3 === 0 ? (
                    <>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
                        <h4 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h4>
                        <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 125)}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
                        <h4 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h4>
                        <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 125)}</p>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <form action="/search" className="mt-14 grid gap-5 rounded-[2rem] bg-[var(--slot4-panel-bg)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.04em] text-[var(--slot4-dark-bg)]">Search the full archive</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">Explore every {taskLabel(primaryTask).toLowerCase()} with category-aware search and story-led results.</p>
          </div>
          <label className="flex overflow-hidden rounded-full border border-[#186f65]/15 bg-white sm:min-w-[420px]">
            <Search className="ml-5 mt-4 h-4 w-4 text-[var(--slot4-dark-bg)]" />
            <input name="q" placeholder="Search stories, topics, and media updates" className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm outline-none" />
            <button className="bg-[var(--slot4-dark-bg)] px-6 text-xs font-black uppercase tracking-[0.14em] text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  const tiles = [
    { icon: Globe2, title: 'Global Reach', copy: 'Bring one story into the channels where customers, partners, and journalists are already paying attention.' },
    { icon: Headphones, title: 'Real Support', copy: 'Keep coordination simple with clear next steps and a product surface built to reduce handoff friction.' },
    { icon: Shapes, title: 'One Platform', copy: 'Move from planning to release distribution to follow-up without rebuilding the workflow every time.' },
  ]

  return (
    <section className="bg-[linear-gradient(180deg,#eef2db_0%,#fffdf5_100%)]">
      <div className={`${dc.shell.section} py-16 sm:py-20`}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2.4rem] bg-[var(--slot4-dark-bg)] px-7 py-10 text-white sm:px-10 lg:py-14">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-soft)]">Stay informed</p>
            <h2 className="mt-4 max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.06em]">The stories shaping what comes next.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Fresh releases, smarter media workflows, and a premium publishing surface for modern communications teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={dc.button.accent}>Send a Tip</Link>
              <Link href="/signup" className="rounded-full border border-white/30 px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] hover:bg-white hover:text-[var(--slot4-dark-bg)]">Join the readership</Link>
            </div>
          </div>

          <div className="grid gap-4">
            {tiles.map((tile) => (
              <article key={tile.title} className="rounded-[1.8rem] border border-[#186f65]/12 bg-white p-6 shadow-sm">
                <tile.icon className="h-7 w-7 text-[var(--slot4-accent-fill)]" />
                <h3 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{tile.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{tile.copy}</p>
              </article>
            ))}
            <div className="rounded-[1.8rem] bg-[var(--slot4-accent-fill)] p-6 text-white">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em]">
                <Sparkles className="h-5 w-5" /> Momentum
              </div>
              <p className="mt-4 text-xl leading-8">A sharper interface makes every release feel intentional, premium, and easier to act on.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
