'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/application/cart/useCart'

function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="text-accent-deep">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M13 14 Q20 8 27 14 Q22 20 27 26 Q20 32 13 26 Q18 20 13 14 Z" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/', label: 'Inicio', exact: true },
  { href: '/tienda', label: 'Catálogo', exact: false },
  { href: '/ritual', label: 'El ritual', exact: true },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, isDrawerOpen, setDrawerOpen } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href.split('?')[0])

  return (
    <>
      {/* Announce bar */}
      <div className="bg-ink text-sand text-center font-mono text-[10.5px] tracking-[0.2em] uppercase py-2.5 px-4">
        Envíos a toda Colombia · Pedido por WhatsApp
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-line transition-all duration-300 ${
          scrolled
            ? 'bg-sand/88 backdrop-blur-[12px]'
            : 'bg-sand'
        }`}
      >
        <div className="shell flex items-center justify-between gap-6 py-3.5">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3" aria-label="SATINA — Inicio">
            <BrandMark size={30} />
            <div className="flex flex-col leading-none">
              <span className="font-serif italic text-[27px] font-medium leading-none">SATINA</span>
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-soft mt-1">
                cuidado capilar · satín
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-7" aria-label="Navegación principal">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] tracking-[0.16em] uppercase py-1.5 border-b transition-all duration-150 ${
                  isActive(link.href, link.exact)
                    ? 'text-ink border-accent-deep'
                    : 'text-ink-soft border-transparent hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Cart button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative grid place-items-center w-10 h-10 rounded-full text-ink transition-colors hover:bg-accent-tint"
              title="Bolsa de compras"
              aria-label={`Bolsa — ${totalItems} productos`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14l-1.1 12H6.1L5 8Z" strokeLinejoin="round" />
                <path d="M9 10V6.5a3 3 0 0 1 6 0V10" strokeLinecap="round" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0 min-w-[17px] h-[17px] px-1 grid place-items-center bg-accent-deep text-white rounded-full font-mono text-[9.5px] leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-accent-tint transition-colors"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            className="lg:hidden bg-sand border-t border-line px-5 py-3 flex flex-col"
            aria-label="Menú móvil"
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] tracking-[0.16em] uppercase py-3.5 border-b border-line/50 last:border-0 transition-colors ${
                  isActive(link.href, link.exact) ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}
