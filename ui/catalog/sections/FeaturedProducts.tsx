'use client'

import Link from 'next/link'
import type { PriceMode } from '@/domain/cart/types'
import { useFeaturedProducts } from '@/application/catalog/useProducts'
import { ProductCard } from '@/shared/ui/ProductCard'
import { PriceModeToggle } from '@/shared/ui/PriceDisplay'

interface FeaturedProductsProps {
  priceMode: PriceMode
  onModeChange: (mode: PriceMode) => void
}

export function FeaturedProducts({ priceMode, onModeChange }: FeaturedProductsProps) {
  const featured = useFeaturedProducts()

  return (
    <section className="py-20 lg:py-28 bg-sand-dark/50">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <h2 className="section-title">Favoritos de la colección</h2>
            <p className="section-subtitle">Los más pedidos. Y los que más cuidan.</p>
          </div>
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <PriceModeToggle mode={priceMode} onChange={onModeChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} priceMode={priceMode} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/tienda" className="btn-secondary">
            Ver toda la tienda
          </Link>
        </div>
      </div>
    </section>
  )
}
