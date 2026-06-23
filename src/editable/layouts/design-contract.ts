import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f4ed',
  '--slot4-page-text': '#143c39',
  '--slot4-panel-bg': '#eef2db',
  '--slot4-surface-bg': '#fffdf4',
  '--slot4-muted-text': '#42645f',
  '--slot4-soft-muted-text': '#6d8d81',
  '--slot4-accent': '#b2533e',
  '--slot4-accent-fill': '#b2533e',
  '--slot4-accent-soft': '#fce09b',
  '--slot4-dark-bg': '#186f65',
  '--slot4-dark-text': '#fffdf4',
  '--slot4-media-bg': '#d7e1be',
  '--slot4-cream': '#f7f4ed',
  '--slot4-warm': '#fff7d7',
  '--slot4-lavender': '#b5cb99',
  '--slot4-gray': '#dde6c6',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(181,203,153,0.35), transparent 28%), linear-gradient(180deg, #f5f4eb 0%, #fffdf5 44%, #eef2db 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#186f65]/15',
  darkBorder: 'border-[#fffdf4]/20',
  shadow: 'shadow-[0_18px_42px_rgba(24,111,101,0.10)]',
  shadowStrong: 'shadow-[0_32px_90px_rgba(24,111,101,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(24,111,101,0.02),rgba(24,111,101,0.88))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[250px] shrink-0 snap-start sm:w-[280px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.24em]',
    heroTitle: 'text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[5rem]',
    sectionTitle: 'text-3xl font-black leading-none tracking-[-0.045em] sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-dark-text)] transition hover:brightness-110',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--slot4-dark-bg)]/25 bg-white/70 px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-dark-bg)] hover:text-[var(--slot4-dark-text)]',
    accent: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[var(--slot4-dark-bg)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[2rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(24,111,101,0.16)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a premium media-distribution visual system with curved hero moments, enterprise navigation, layered editorial cards, and clear CTA blocks.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() or buildPostUrl() for all post links so route aliases and task-specific detail pages remain functional.',
  'Prioritize readable desktop and mobile layouts with bold top-level sections and safe fallbacks for missing images, summaries, and categories.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode the reference brand name from the screenshots.',
] as const
