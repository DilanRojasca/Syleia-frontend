'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { ProductCategory } from '@/domain/catalog/types'
import { useProducts } from '@/application/catalog/useProducts'
import { ProductCard } from '@/shared/ui/ProductCard'

const CATEGORIES: Array<ProductCategory | 'Todos'> = ['Todos', 'Nocturno', 'Diario', 'Peinado', 'Post-lavado']

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

export function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const urlCategory = searchParams.get('categoria') ?? 'Todos'
  const [sort, setSort] = useState<SortKey>('featured')
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'Todos'>(
    urlCategory as ProductCategory | 'Todos',
  )

  const { data: products = [], isLoading, isError } = useProducts(
    activeCategory === 'Todos' ? 'all' : (activeCategory as ProductCategory),
  )

  const sorted = useMemo(() => {
    const list = [...products]
    if (sort === 'price-asc') list.sort((a, b) => a.prices.detal - b.prices.detal)
    if (sort === 'price-desc') list.sort((a, b) => b.prices.detal - a.prices.detal)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, sort])

  const handleCategory = (cat: ProductCategory | 'Todos') => {
    setActiveCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'Todos') params.delete('categoria')
    else params.set('categoria', cat)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="shell">
      {/* Page head */}
      <div className="pt-10 pb-7">
        <span className="mono-label text-accent-deep">Catálogo 2026 · Vol. 01</span>
        <h1 className="page-title mt-2">
          Todos los <em>productos</em>
        </h1>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between gap-5 flex-wrap py-4 border-b border-line mb-9">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(cat)}
              className={`font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 border rounded-pill transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-ink border-ink text-paper'
                  : 'border-line text-ink-soft hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          aria-label="Ordenar productos"
          className="font-mono text-[11px] tracking-[0.1em] uppercase bg-transparent border border-line rounded-sm px-3 py-2.5 text-ink-soft focus:border-ink outline-none"
        >
          <option value="featured">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[22px] pb-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-3">
              <div className="aspect-[1/1.08] bg-sand-dark rounded-card" />
              <div className="h-5 bg-sand-dark rounded w-2/3" />
              <div className="h-3 bg-sand-dark rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <p className="font-serif text-xl text-ink">No se pudieron cargar los productos</p>
          <p className="text-sm text-ink-soft">Verifica tu conexión e intenta de nuevo.</p>
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[22px] pb-20 animate-fade-in">
          {sorted.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-mark">~</div>
          <h2 className="font-serif font-normal text-[34px] mt-4 mb-2">Sin productos aqui</h2>
          <p className="text-ink-soft mb-7">Prueba con otra categoria.</p>
          <button type="button" onClick={() => handleCategory('Todos')} className="btn-ghost">
            Ver todos
          </button>
        </div>
      )}
    </div>
  )
}
