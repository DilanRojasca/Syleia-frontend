import { Link } from 'react-router-dom'
import { WhatsAppButton } from '../ui/WhatsAppButton'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-sand">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-sand-dark/40 hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text column */}
          <div className="flex flex-col gap-7 animate-slide-up">
            {/* Eyebrow */}
            <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-ink-soft">
              Accesorios de satén · Colombia
            </p>

            {/* Headline */}
            <h1 className="font-serif text-display text-ink text-balance leading-[1.05]">
              Suavidad<br />
              <em className="italic text-ink-soft">que se siente</em>
            </h1>

            {/* Body */}
            <p className="font-sans text-lg text-ink-soft max-w-md leading-relaxed">
              Scrunchies, gorros y fundas de almohada en satén de calidad premium.
              Tu cabello merece el mejor descanso.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/tienda" className="btn-primary text-center justify-center sm:justify-start">
                Explorar colección
              </Link>
              <WhatsAppButton
                variant="ghost"
                label="Pedidos por WhatsApp"
                className="justify-center sm:justify-start py-3.5"
              />
            </div>

            {/* Trust micro-copy */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
              {['Envíos a todo Colombia', 'Satén premium', 'Al por mayor'].map(item => (
                <span key={item} className="text-xs font-sans text-ink-soft flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-line inline-block" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative grid grid-cols-2 gap-3 lg:gap-4 animate-fade-in">
            {/* Main big image */}
            <div className="col-span-2 aspect-[4/3] rounded-card overflow-hidden shadow-card-hover">
              <img
                src="https://picsum.photos/seed/syleia-hero-main/800/600"
                alt="Colección Syleia — scrunchies de satén"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>

            {/* Two small images */}
            <div className="aspect-square rounded-card overflow-hidden shadow-card">
              <img
                src="https://picsum.photos/seed/syleia-hero-2/400/400"
                alt="Scrunchie satén lila"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-card overflow-hidden shadow-card">
              <img
                src="https://picsum.photos/seed/syleia-hero-3/400/400"
                alt="Combo Descanso Syleia"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating price badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-paper px-5 py-2.5 rounded-pill shadow-card-hover flex items-center gap-3 whitespace-nowrap">
              <span className="text-xs font-sans text-ink-soft">Scrunchies desde</span>
              <span className="font-serif font-semibold text-ink">$9.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-sand to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
