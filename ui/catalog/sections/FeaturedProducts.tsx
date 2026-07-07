'use client'

import Link from 'next/link'
import { useFeaturedProducts } from '@/application/catalog/useProducts'
import { ProductCard } from '@/shared/ui/ProductCard'

export function FeaturedProducts() {
  const { data: featured = [], isLoading } = useFeaturedProducts()

  return (
    <section className="shell section">
      <div className="flex items-end justify-between gap-6 mb-9">
        <div>
          <span className="mono-label">Selección</span>
          <h2 className="font-serif font-normal text-[clamp(30px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em] mt-2.5">
            Los <em className="italic text-accent-deep">esenciales</em>
          </h2>
        </div>
        <Link href="/tienda" className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-soft border-b border-line pb-1 hover:text-ink hover:border-ink transition-all whitespace-nowrap">
          Ver todo el catálogo
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 gap-y-7 lg:gap-5 lg:gap-y-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="aspect-[1/1.08] bg-sand-dark rounded-card" />
                <div className="h-4 bg-sand-dark rounded w-2/3" />
                <div className="h-3 bg-sand-dark rounded w-1/2" />
              </div>
            ))
          : featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  )
}
