import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/shared/layout/Header'
import { Footer } from '@/shared/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'SATINA — Suavidad que se siente',
  description:
    'SATINA — Accesorios de satín para el cabello. Scrunchies, gorros y fundas de almohada. Envíos a todo Colombia.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
