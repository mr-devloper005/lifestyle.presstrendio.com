import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 lg:py-16">
          <div className="grid overflow-hidden rounded-[2.4rem] border border-[#186f65]/12 bg-white shadow-[0_24px_70px_rgba(24,111,101,0.10)] lg:grid-cols-[1.02fr_.98fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b2533e]">Create account</p>
              <h1 className="mt-3 text-3xl font-black text-[var(--slot4-dark-bg)]">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-5 border-t border-[#186f65]/12 pt-5 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-black text-[#b2533e] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
            <div className="flex flex-col justify-center bg-[linear-gradient(135deg,#186f65_0%,#3c8c68_45%,#b2533e_100%)] p-8 text-white sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-soft)]">{pagesContent.auth.signup.badge}</p>
              <h2 className="editorial-brand mt-5 max-w-xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-white/76">{pagesContent.auth.signup.description}</p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
