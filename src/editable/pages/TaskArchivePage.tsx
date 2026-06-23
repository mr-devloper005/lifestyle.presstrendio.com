import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Camera,
  Download,
  FileText,
  Filter,
  Globe2,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Newspaper,
  Search,
  UserRound,
} from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body) || 'More details inside this post.'
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  mediaDistribution: { icon: Newspaper, archiveClass: 'grid gap-5 lg:grid-cols-[1.15fr_.85fr] xl:grid-cols-[1.2fr_.8fr]', promise: 'Organize releases, media notes, updates, and supporting assets in one clear flow.', badge: 'News' },
  article: { icon: FileText, archiveClass: 'grid gap-5 lg:grid-cols-[1.15fr_.85fr] xl:grid-cols-[1.2fr_.8fr]', promise: 'Browse editorial posts with strong hierarchy, larger headlines, and clear summaries.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight identity, location, service context, and contact-ready details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Image-first browsing with visual rhythm and concise captioning.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved resources stay tidy, quick to scan, and easy to revisit.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards keep file purpose and summary visible at a glance.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on people, roles, and discoverable context.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const label = taskConfig?.label || task
  const page = pagination.page || 1
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': preset.colors.background,
    '--archive-text': preset.colors.foreground,
    '--archive-surface': preset.colors.surface,
    '--archive-accent': preset.colors.accent,
  } as CSSProperties
  const dynamicCategories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const raw = getCategory(post, '')
      return raw ? { name: raw, slug: normalizeCategory(raw) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())
  const categoryLabel = category === 'all' ? 'All categories' : dynamicCategories.find((item) => item.slug === category)?.name || category

  if (task === 'mediaDistribution' || task === 'article') {
    return (
      <PremiumEditorialArchive
        posts={posts}
        pagination={pagination}
        category={category}
        categoryLabel={categoryLabel}
        categories={dynamicCategories}
        basePath={basePath}
        label={label}
      />
    )
  }

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="bg-[linear-gradient(135deg,var(--slot4-dark-bg),#3a8668_45%,var(--slot4-accent-fill))] text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-soft)]">
                <Icon className="h-4 w-4" /> {label}
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">{voice?.description || SITE_CONFIG.description}</p>
              <div className="mt-6 rounded-[1.8rem] border border-white/15 bg-white/10 p-5 text-sm font-semibold leading-7 text-white/80">{deck.promise}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={basePath} className="rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--slot4-dark-bg)]">Browse all</Link>
                <Link href="/search" className="rounded-full border border-white/30 px-5 py-3 text-sm font-black text-white">Search posts</Link>
              </div>
            </div>

            <form action={basePath} className="self-end rounded-[2rem] border border-white/15 bg-white/12 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/70"><Filter className="h-4 w-4" /> Filter</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-2xl border border-white/20 bg-white/92 px-4 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
                <option value="all">All categories</option>
                {dynamicCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded-2xl bg-[var(--slot4-accent-fill)] text-sm font-black text-white">Apply</button>
              <p className="mt-3 text-xs font-bold text-white/65">Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug || `${task}-${index}`} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm opacity-65">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function PremiumEditorialArchive({
  posts,
  pagination,
  category,
  categoryLabel,
  categories,
  basePath,
  label,
}: {
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  categoryLabel: string
  categories: { name: string; slug: string }[]
  basePath: string
  label: string
}) {
  const page = pagination.page || 1
  const lead = posts[0]
  const spotlight = posts.slice(1, 3)
  const productCards = posts.slice(3, 6)
  const editorialList = posts.slice(6, 12)
  const stats = [
    { label: 'Experience', value: '20+', copy: 'Years of release-led storytelling and announcement support.' },
    { label: 'Global Reach', value: '120+', copy: 'Markets and media lanes coordinated through one publishing surface.' },
    { label: 'Support', value: '100%', copy: 'Workflows designed to keep teams aligned before and after launch.' },
    { label: 'Workspace', value: '1 login', copy: 'One place for publishing, media context, and follow-up visibility.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="premium-hero-curve isolate overflow-hidden bg-[linear-gradient(135deg,var(--slot4-dark-bg),#3d8768_42%,var(--slot4-accent-fill))] text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.75fr] lg:px-8 lg:py-20">
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-soft)]">{category === 'all' ? label : categoryLabel}</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-[5.2rem]">
                There for every stage of your story.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                Press release distribution, media visibility, and content discovery in a premium interface built for modern media distribution teams.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/74">
                One platform. Clear launch paths. Flexible layouts for releases, updates, and editorial follow-through.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={basePath} className="bg-[var(--slot4-dark-bg)] px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]">
                  Browse releases
                </Link>
                <Link href="/contact" className="border border-white/30 px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]">
                  Contact team
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              {lead ? (
                <Link href={`${basePath}/${lead.slug}`} className="glass-card group block overflow-hidden rounded-[2rem] border border-white/25 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                  <div className="bg-[rgba(252,224,155,.20)] px-5 py-5">
                    <p className="text-4xl font-light leading-none sm:text-5xl">Get your story seen</p>
                    <p className="mt-2 text-4xl font-black leading-none sm:text-5xl">in the right places.</p>
                  </div>
                  <div className="relative aspect-[11/8] overflow-hidden">
                    <img src={getImage(lead)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.66))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-right text-2xl font-semibold text-white">Featured Release</p>
                      <p className="mt-8 max-w-xs text-sm font-semibold leading-6 text-white/86">{getSummary(lead)}</p>
                    </div>
                  </div>
                  <div className="bg-white px-5 py-3 text-[var(--slot4-dark-bg)]">
                    <p className="text-2xl font-black tracking-[-0.04em]">Monthly Reach: discovery-led visibility</p>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-[var(--slot4-surface-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 border-b border-[#186f65]/12 pb-5">
              <Link href={basePath} className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${category === 'all' ? 'bg-[var(--slot4-dark-bg)] text-white' : 'bg-white text-[var(--slot4-page-text)]'}`}>Latest</Link>
              {categories.slice(0, 8).map((item) => (
                <Link key={item.slug} href={pageHref(basePath, item.slug, 1)} className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${category === item.slug ? 'bg-[var(--slot4-accent-fill)] text-white' : 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]'}`}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {stats.map((item) => (
                <article key={item.label} className="rounded-[2rem] border border-[#186f65]/12 bg-white p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">{item.label}</p>
                  <h2 className="mt-5 text-5xl font-black tracking-[-0.06em] text-[var(--slot4-dark-bg)]">{item.value}</h2>
                  <p className="mt-4 text-base leading-7 text-[var(--slot4-muted-text)]">{item.copy}</p>
                </article>
              ))}
            </div>

            {lead ? (
              <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
                <Link href={`${basePath}/${lead.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#186f65]/12 bg-white shadow-[0_22px_48px_rgba(24,111,101,0.10)]">
                  <div className="grid min-h-full lg:grid-cols-[1.05fr_.95fr]">
                    <div className="relative min-h-[360px] overflow-hidden">
                      <img src={getImage(lead)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="bg-[var(--slot4-dark-bg)] p-8 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-soft)]">{getCategory(lead, label)}</p>
                      <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.05em]">{lead.title}</h2>
                      <p className="mt-5 text-base leading-8 text-white/76">{getSummary(lead)}</p>
                    </div>
                  </div>
                </Link>
                <div className="grid gap-5">
                  {spotlight.map((post, index) => (
                    <Link key={post.id || post.slug || index} href={`${basePath}/${post.slug}`} className="grid gap-4 rounded-[1.8rem] border border-[#186f65]/12 bg-white p-5 shadow-sm sm:grid-cols-[120px_1fr]">
                      <img src={getImage(post)} alt="" className="h-28 w-full rounded-[1.25rem] object-cover" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{index === 0 ? 'Spotlight' : getCategory(post, label)}</p>
                        <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {productCards.map((post, index) => (
                <Link key={post.id || post.slug || index} href={`${basePath}/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#186f65]/12 bg-white shadow-[0_22px_48px_rgba(24,111,101,0.10)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,111,101,.06),rgba(24,111,101,.76))]" />
                  </div>
                  <div className="bg-[var(--slot4-dark-bg)] p-7 text-white">
                    <h3 className="text-3xl font-black tracking-[-0.05em]">
                      {index === 0 ? 'Press Release Distribution' : index === 1 ? 'Media Database & Monitoring' : 'Insights and Analytics'}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-white/74">{getSummary(post)}</p>
                    <span className="mt-6 inline-flex text-sm font-black">Explore <ArrowRight className="ml-2 h-4 w-4" /></span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_.8fr]">
              <div>
                <div className="flex items-end justify-between gap-4 border-b border-[#186f65]/12 pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Latest archive</p>
                    <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--slot4-dark-bg)]">More from the desk</h2>
                  </div>
                  <form action={basePath} className="hidden gap-3 sm:flex">
                    <select name="category" defaultValue={category} className="h-11 min-w-44 rounded-full border border-[#186f65]/15 bg-white px-4 text-sm font-bold outline-none">
                      <option value="all">All categories</option>
                      {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                    </select>
                    <button className="rounded-full bg-[var(--slot4-dark-bg)] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">Filter</button>
                  </form>
                </div>

                <div className="mt-4 grid gap-4">
                  {editorialList.length ? editorialList.map((post, index) => (
                    <Link key={post.id || post.slug || index} href={`${basePath}/${post.slug}`} className={`group rounded-[1.8rem] border border-[#186f65]/12 p-5 shadow-sm ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--slot4-panel-bg)]'}`}>
                      <div className={`grid gap-4 ${index % 3 === 0 ? 'sm:grid-cols-[1fr_120px]' : 'sm:grid-cols-[120px_1fr]'}`}>
                        {index % 3 === 0 ? (
                          <>
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getCategory(post, label)}</p>
                              <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
                            </div>
                            <img src={getImage(post)} alt="" className="h-28 w-full rounded-[1.2rem] object-cover" />
                          </>
                        ) : (
                          <>
                            <img src={getImage(post)} alt="" className="h-28 w-full rounded-[1.2rem] object-cover" />
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getCategory(post, label)}</p>
                              <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  )) : (
                    <div className="rounded-[2rem] border border-dashed border-[#186f65]/15 bg-white p-10 text-center">
                      <Search className="mx-auto h-8 w-8 text-[var(--slot4-dark-bg)]/45" />
                      <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[var(--slot4-dark-bg)]">No stories found</h2>
                      <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or publish a new newsroom story.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#186f65]/12 bg-white p-6 shadow-sm">
                {[
                  'How much does it cost to use a media distribution service?',
                  'What makes a release ready for outreach?',
                  'How do teams keep launch timelines organized?',
                  'What should a newsroom page highlight first?',
                  'How do you deliver a release and keep momentum after publishing?',
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4 border-b border-[#186f65]/10 py-5 last:border-b-0">
                    <p className="text-xl tracking-[-0.03em] text-[var(--slot4-accent-fill)]">{item}</p>
                    <span className="text-3xl text-[var(--slot4-dark-bg)]">+</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[#186f65]/15 bg-white px-5 py-3 text-xs font-black uppercase">Previous</Link> : null}
              <span className="rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-xs font-black uppercase text-white">Page {page} / {pagination.totalPages || 1}</span>
              {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[#186f65]/15 bg-white px-5 py-3 text-xs font-black uppercase">Next</Link> : null}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className={`group overflow-hidden rounded-[2rem] border border-[#186f65]/12 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index % 3 === 0 ? 'bg-white' : index % 3 === 1 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-dark-bg)] text-white'}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-dark-bg)]">{category}</span>
      </div>
      <div className="p-5">
        <p className={`text-[10px] font-black uppercase tracking-[0.22em] ${index % 3 === 2 ? 'text-[var(--slot4-accent-soft)]' : 'text-[var(--slot4-accent-fill)]'}`}>Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-6 ${index % 3 === 2 ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[#186f65]/12 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--slot4-panel-bg)] ring-1 ring-[#186f65]/10">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-dark-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[#186f65]/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-dark-bg)]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[#186f65]/12 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--slot4-dark-bg)] p-5 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-dark-bg)]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[#186f65]/12 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-dark-bg)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-dark-bg)]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[#186f65]/12 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-[var(--slot4-dark-bg)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-[2rem] border border-[#186f65]/12 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-dark-bg)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-dark-bg)]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-dark-bg)]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[#186f65]/12 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-panel-bg)] ring-1 ring-[#186f65]/10">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-dark-bg)]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
    </Link>
  )
}
