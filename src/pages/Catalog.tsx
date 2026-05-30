import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { PriceMode, ProductCategory } from '../types'
import { products } from '../data/products'
import { ProductCard } from '../components/ui/ProductCard'
import { PriceModeToggle } from '../components/ui/PriceDisplay'
import { SocialProof } from '../components/sections/SocialProof'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Todos',
  scrunchies: 'Scrunchies',
  'combo-descanso': 'Combo Descanso',
  gorros: 'Gorros',
  fundas: 'Fundas',
}

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = searchParams.get('categoria') ?? 'all'
  const urlMode = (searchParams.get('modo') as PriceMode) ?? 'detal'

  const [priceMode, setPriceMode] = useState<PriceMode>(urlMode)
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter(p => p.category === (activeCategory as ProductCategory))
  }, [activeCategory])

  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    const p = new URLSearchParams(searchParams)
    if (cat === 'all') p.delete('categoria')
    else p.set('categoria', cat)
    setSearchParams(p, { replace: true })
  }

  const handleMode = (mode: PriceMode) => {
    setPriceMode(mode)
    const p = new URLSearchParams(searchParams)
    if (mode === 'detal') p.delete('modo')
    else p.set('modo', mode)
    setSearchParams(p, { replace: true })
  }

  return (
    <>
      <SocialProof />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="section-title">La tienda Syleia</h1>
          <p className="section-subtitle">Satén que cuida. Colores que enamoran.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8
                        pb-4 border-b border-line">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-pill text-sm font-sans transition-all duration-150 border ${
                  activeCategory === cat
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-transparent text-ink-soft border-line hover:border-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Price mode toggle */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-sans text-ink-soft hidden sm:inline">Precio:</span>
            <PriceModeToggle mode={priceMode} onChange={handleMode} />
          </div>
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 animate-fade-in">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} priceMode={priceMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <span className="text-4xl">🌸</span>
            <p className="font-serif text-xl text-ink">No hay productos en esta categoría</p>
            <button
              type="button"
              onClick={() => handleCategory('all')}
              className="btn-ghost mt-1"
            >
              Ver todos →
            </button>
          </div>
        )}

        {/* Product count */}
        <p className="text-xs font-sans text-ink-soft mt-8 text-right">
          {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>
    </>
  )
}
