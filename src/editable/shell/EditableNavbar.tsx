'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn, Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)] shadow-[0_1px_0_rgba(255,255,255,.08)]">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="editorial-brand min-w-0 text-2xl font-black tracking-[-0.06em] text-white sm:text-4xl">
            <span className="flex items-center gap-3">
              <img src="/favicon.png" alt={SITE_CONFIG.name} className="h-9 w-9 rounded-full bg-white/10 object-contain p-1 sm:h-11 sm:w-11" />
              <span>{SITE_CONFIG.name}</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-white/10 p-1 lg:flex">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {session ? (
              <button onClick={logout} className="hidden items-center gap-2 px-4 py-3 text-sm font-black text-white/90 transition hover:text-[var(--slot4-accent-soft)] sm:inline-flex">
                Logout <LogIn className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#186f65]/10 bg-[var(--slot4-surface-bg)] px-4 py-4 shadow-xl lg:hidden">
          <div className="grid gap-2">
            {quickLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="border border-[#186f65]/10 bg-white px-4 py-3 text-sm font-black text-[var(--slot4-page-text)]">
                {item.label}
              </Link>
            ))}
            <Link href={session ? '/create' : '/signup'} onClick={() => setOpen(false)} className="bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-black text-white">
              {session ? 'Publish' : 'Create account'}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
