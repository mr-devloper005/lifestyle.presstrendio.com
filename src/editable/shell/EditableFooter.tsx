'use client'

import Link from 'next/link'
import { ArrowRight, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="overflow-hidden bg-[var(--footer-gradient)] text-[var(--slot4-page-text)]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <div>
            <Link href="/" className="editorial-brand text-4xl font-black tracking-[-0.06em] text-[var(--slot4-dark-bg)] sm:text-6xl">
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
              Built for media distributors who want clearer publishing, stronger visibility, and a platform that keeps releases, coverage, and discovery moving together.
            </p>
            <form action="/signup" className="mt-8 flex max-w-xl overflow-hidden rounded-full bg-white/18 p-1 backdrop-blur">
              <input
                name="email"
                type="email"
                placeholder="Email for release updates"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-dark-bg)]">
                Subscribe <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="rounded-[1.8rem] bg-white/30 p-6 backdrop-blur">
            <h3 className="text-lg font-black tracking-[-0.03em] text-[var(--slot4-dark-bg)]">About</h3>
            <div className="mt-4 grid gap-3 text-sm text-[var(--slot4-page-text)]">
              <Link href="/about" className="transition hover:text-[var(--slot4-accent-fill)]">
                About
              </Link>
              <Link href="/contact" className="transition hover:text-[var(--slot4-accent-fill)]">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#186f65]/15 pt-6 text-sm text-[var(--slot4-muted-text)]">
          <p>© {year} {SITE_CONFIG.name}. Media distribution, release management, and public updates.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 font-black text-[var(--slot4-dark-bg)] transition hover:text-[var(--slot4-accent-fill)]">
              Contact team <ArrowRight className="h-4 w-4" />
            </Link>
            {session ? (
              <button onClick={logout} className="font-black text-[var(--slot4-dark-bg)] transition hover:text-[var(--slot4-accent-fill)]">Logout</button>
            ) : (
              <Link href="/signup" className="font-black text-[var(--slot4-dark-bg)] transition hover:text-[var(--slot4-accent-fill)]">Create account</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
