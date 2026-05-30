import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product, PriceMode } from '../../types'
import { formatPrice } from '../../data/products'
import { ColorSwatch } from './ColorSwatch'
import { Badge } from './Badge'

interface ProductCardProps {
  product: Product
  priceMode: PriceMode
}

export function ProductCard({ product, priceMode }: ProductCardProps) {
  const [activeColor, setActiveColor] = useState(product.colors[0])
  const price = priceMode === 'mayor' ? product.prices.mayor : product.prices.detal

  return (
    <Link to={`/producto/${product.slug}`} className="group block">
      <article className="card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-sand">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">Nuevo</Badge>}
            {priceMode === 'mayor' && <Badge variant="mayor">Mayor</Badge>}
          </div>

          {/* Quick action overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="bg-paper/90 backdrop-blur-sm text-ink text-xs font-sans font-medium px-5 py-2 rounded-pill shadow-card">
              Ver producto →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3">
          <div>
            <p className="text-xs font-sans text-ink-soft uppercase tracking-widest mb-1">
              {product.category === 'scrunchies' && 'Scrunchies'}
              {product.category === 'combo-descanso' && 'Combo Descanso'}
              {product.category === 'gorros' && 'Gorros'}
              {product.category === 'fundas' && 'Fundas'}
            </p>
            <h3 className="font-serif text-base font-medium text-ink leading-snug">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-semibold text-ink">
              {formatPrice(price)}
            </span>
            {priceMode === 'mayor' && (
              <span className="text-xs font-sans text-ink-soft">
                mín. {product.prices.mayorMin}u
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5" onClick={e => e.preventDefault()}>
              {product.colors.map(c => (
                <ColorSwatch
                  key={c.slug}
                  color={c}
                  size="sm"
                  selected={activeColor.slug === c.slug}
                  onClick={() => setActiveColor(c)}
                />
              ))}
              <span className="text-xs text-ink-soft ml-1 font-sans">{activeColor.name}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
