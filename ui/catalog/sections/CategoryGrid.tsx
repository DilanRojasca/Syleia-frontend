import Link from 'next/link'

const CATEGORIES = [
  {
    slug: 'scrunchies',
    label: 'Scrunchies',
    description: 'En todos los tonos de la colección',
    count: '6 productos',
    image: 'https://picsum.photos/seed/syleia-cat-scrunchies/600/700',
    accentColor: '#C9B8E8',
  },
  {
    slug: 'combo-descanso',
    label: 'Combo Descanso',
    description: 'Gorro + funda. El ritual de la noche',
    count: '2 combos',
    image: 'https://picsum.photos/seed/syleia-cat-combo/600/700',
    accentColor: '#F5E6C8',
  },
  {
    slug: 'mayor',
    label: 'Al Por Mayor',
    description: 'Precios especiales desde 6 unidades',
    count: 'Todos los productos',
    image: 'https://picsum.photos/seed/syleia-cat-mayor/600/700',
    accentColor: '#C5DDD3',
  },
]

export function CategoryGrid() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h2 className="section-title">Descubre la colección</h2>
          <p className="section-subtitle">Satén que cuida cada detalle de tu cabello</p>
        </div>
        <Link href="/tienda" className="btn-ghost self-start sm:self-auto">
          Ver todo <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={cat.slug === 'mayor' ? '/tienda?modo=mayor' : `/tienda?categoria=${cat.slug}`}
            className="group relative rounded-card overflow-hidden aspect-[3/4] block shadow-card"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-300" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: cat.accentColor }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-paper">
              <p className="text-xs font-sans tracking-widest uppercase opacity-70 mb-1">
                {cat.count}
              </p>
              <h3 className="font-serif text-xl font-medium mb-1">{cat.label}</h3>
              <p className="font-sans text-sm opacity-80 leading-snug">{cat.description}</p>
              <div className="flex items-center gap-1 mt-3 text-sm font-sans font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Ver más <span aria-hidden>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
