import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/tienda?modo=mayor', label: 'Por Mayor' },
]

const CartIcon = ({ count }: { count: number }) => (
  <Link
    to="/carrito"
    aria-label={`Carrito — ${count} productos`}
    className="relative p-2 text-ink-soft hover:text-ink transition-colors duration-150"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && (
      <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[1.1rem] min-h-[1.1rem] bg-ink text-paper text-[10px] font-sans font-bold rounded-full flex items-center justify-center leading-none px-0.5">
        {count > 9 ? '9+' : count}
      </span>
    )}
  </Link>
)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md shadow-sticky' : 'bg-paper'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-[1.7rem] italic font-normal text-ink tracking-[-0.01em] mr-auto lg:mr-0"
          aria-label="Syleia — Inicio"
        >
          Syleia
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 mx-auto" aria-label="Navegación principal">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/573001234567?text=Hola%20Syleia%21"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex btn-secondary py-2 px-4 text-xs"
            aria-label="Contactar por WhatsApp"
          >
            WhatsApp
          </a>
          <CartIcon count={totalItems} />

          {/* Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-ink-soft hover:text-ink transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
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
          className="lg:hidden bg-paper border-t border-line px-6 py-4 flex flex-col gap-1"
          aria-label="Menú móvil"
        >
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-base py-2.5 border-b border-line/50 last:border-0 transition-colors ${
                  isActive ? 'text-ink font-medium' : 'text-ink-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-3 justify-center"
          >
            Pedir por WhatsApp
          </a>
        </nav>
      )}
    </header>
  )
}
