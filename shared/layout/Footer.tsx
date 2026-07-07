import Link from 'next/link'

function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="text-ink-soft">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M13 14 Q20 8 27 14 Q22 20 27 26 Q20 32 13 26 Q18 20 13 14 Z" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

const LINKS_TIENDA = [
  { href: '/tienda', label: 'Catálogo completo' },
  { href: '/tienda?categoria=Nocturno', label: 'Línea nocturna' },
  { href: '/tienda?categoria=Diario', label: 'Uso diario' },
  { href: '/ritual', label: 'El ritual SATINA' },
]

const LINKS_AYUDA = [
  { href: '/checkout', label: 'Cómo comprar' },
  { href: '/carrito', label: 'Mi bolsa' },
]

export function Footer() {
  return (
    <footer className="border-t border-line mt-10">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 py-12 lg:py-[52px]">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <BrandMark size={26} />
              <span className="font-serif italic text-[23px] font-medium">SATINA</span>
            </Link>
            <p className="text-[13.5px] text-ink-soft max-w-[300px] mt-3 leading-relaxed">
              Accesorios de satín y microfibra pensados para cuidar tu cabello todos los días — y todas las noches.
            </p>
          </div>

          {/* Tienda */}
          <div className="flex flex-col">
            <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft mb-4 font-medium">
              Tienda
            </h4>
            <nav className="flex flex-col gap-2.5">
              {LINKS_TIENDA.map(l => (
                <Link key={l.href} href={l.href} className="text-[14px] text-ink hover:text-accent-deep transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ayuda */}
          <div className="flex flex-col">
            <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft mb-4 font-medium">
              Ayuda
            </h4>
            <nav className="flex flex-col gap-2.5">
              {LINKS_AYUDA.map(l => (
                <Link key={l.href} href={l.href} className="text-[14px] text-ink hover:text-accent-deep transition-colors">
                  {l.label}
                </Link>
              ))}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-ink hover:text-accent-deep transition-colors"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-line-soft font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-soft">
          <span>© {new Date().getFullYear()} SATINA</span>
          <span>Hecho con satín · Colombia</span>
        </div>
      </div>
    </footer>
  )
}
