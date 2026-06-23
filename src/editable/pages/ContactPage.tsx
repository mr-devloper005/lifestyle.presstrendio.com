'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1080px] px-4 py-10 sm:px-6 lg:py-16">
          <div className="overflow-hidden rounded-[2.4rem] border border-[#186f65]/12 bg-[linear-gradient(135deg,#186f65_0%,#3c8c68_45%,#b2533e_100%)] text-white shadow-[0_24px_70px_rgba(24,111,101,0.14)]">
            <div className="px-7 py-10 sm:px-10 sm:py-14">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-soft)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="editorial-brand mt-4 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">{pagesContent.contact.title}</h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/78">{pagesContent.contact.description}</p>
            </div>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="grid gap-4">
              {desks.map((desk, index) => (
                <div key={desk.title} className="rounded-[1.8rem] border border-[#186f65]/12 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <desk.icon className="h-5 w-5 text-[#b2533e]" />
                    <span className="text-xs font-black text-[var(--slot4-muted-text)]">0{index + 1}</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-black text-[var(--slot4-dark-bg)]">{desk.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{desk.body}</p>
                </div>
              ))}
            </aside>

            <div className="rounded-[2rem] border border-[#186f65]/12 bg-white p-7 shadow-sm sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b2533e]">Send a message</p>
              <h2 className="mt-3 text-3xl font-black text-[var(--slot4-dark-bg)]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
