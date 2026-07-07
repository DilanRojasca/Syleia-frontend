import { WhatsAppButton } from '@/shared/ui/WhatsAppButton'

const BENEFITS = [
  { icon: '🏷️', label: 'Hasta 35% de descuento', detail: 'vs. precio detal' },
  { icon: '📦', label: 'Mínimo desde 6 unidades', detail: 'en scrunchies' },
  { icon: '🚚', label: 'Envío a todo Colombia', detail: 'Coordinadora / Servientrega' },
  { icon: '🎁', label: 'Empaque de regalo incluido', detail: 'en packs y combos' },
]

export function WholesaleCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-ink" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ECE6DA' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-sand-dark/70">
              Reventa · Boutiques · Spa
            </p>
            <h2 className="font-serif text-heading text-paper leading-tight">
              ¿Vendes accesorios?<br />
              <em className="italic text-sand-dark">Hablemos de mayoreo.</em>
            </h2>
            <p className="font-sans text-base text-paper/70 leading-relaxed max-w-md">
              Precios especiales para revendedoras, boutiques y spas. Pedidos mínimos bajos,
              catálogo completo y despachos en 24 horas a todo Colombia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <WhatsAppButton
                message="¡Hola SATINA! Me interesa el programa de mayoristas 🌸"
                label="Quiero ser mayorista"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {BENEFITS.map(b => (
              <div
                key={b.label}
                className="bg-paper/10 border border-paper/10 rounded-card p-5 hover:bg-paper/15 transition-colors duration-200"
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <p className="font-serif text-sm text-paper font-medium leading-snug mb-1">
                  {b.label}
                </p>
                <p className="font-sans text-xs text-paper/60">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
