import Link from 'next/link'

const LINKS_TIENDA = [
  { href: '/tienda', label: 'Todos los productos' },
  { href: '/tienda?categoria=scrunchies', label: 'Scrunchies' },
  { href: '/tienda?categoria=combo-descanso', label: 'Combos Descanso' },
  { href: '/tienda?modo=mayor', label: 'Por Mayor' },
]

const LINKS_INFO = [
  { href: '/como-comprar', label: 'Cómo comprar' },
  { href: '/envios', label: 'Envíos y tiempos' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/politica-devoluciones', label: 'Devoluciones' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <span className="font-serif text-3xl italic text-paper">Syleia</span>
            <p className="font-sans text-sm text-paper/60 leading-relaxed max-w-xs">
              Accesorios de satén que cuidan tu cabello y hacen tu descanso más bonito.
              Hecho con amor en Colombia.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com/syleia.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Syleia"
                className="text-paper/60 hover:text-paper transition-colors duration-150"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@syleia.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Syleia"
                className="text-paper/60 hover:text-paper transition-colors duration-150"
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                  <path d="M11.97 0h-2.6v12.3a2.77 2.77 0 01-2.76 2.77 2.77 2.77 0 01-2.77-2.77 2.77 2.77 0 012.77-2.76c.27 0 .53.04.77.11V6.97A5.38 5.38 0 006.61 6.8a5.38 5.38 0 00-5.37 5.38A5.38 5.38 0 006.61 17.56a5.38 5.38 0 005.36-5.38V5.97A8.08 8.08 0 0016 7.26V4.64a5.49 5.49 0 01-4.03-4.64z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase text-paper/40 mb-1">
              Tienda
            </h4>
            {LINKS_TIENDA.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm text-paper/70 hover:text-paper transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Información */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase text-paper/40 mb-1">
              Información
            </h4>
            {LINKS_INFO.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm text-paper/70 hover:text-paper transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase text-paper/40 mb-1">
              Contacto
            </h4>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-paper/70 hover:text-paper transition-colors duration-150"
            >
              WhatsApp +57 300 123 4567
            </a>
            <a
              href="mailto:hola@syleia.co"
              className="font-sans text-sm text-paper/70 hover:text-paper transition-colors duration-150"
            >
              hola@syleia.co
            </a>
            <p className="font-sans text-xs text-paper/40 mt-2 leading-relaxed">
              Medellín, Colombia<br />
              Lun–Sáb · 8 am – 6 pm
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6 border-t border-paper/10">
          <p className="font-sans text-xs text-paper/40">
            © {new Date().getFullYear()} Syleia. Hecho con amor en Colombia.
          </p>
          <p className="font-sans text-xs text-paper/30 italic font-serif">
            Suavidad que se siente
          </p>
        </div>
      </div>
    </footer>
  )
}
