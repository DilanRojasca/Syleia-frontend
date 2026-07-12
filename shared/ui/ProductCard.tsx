'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/domain/catalog/types'
import { formatPrice } from '@/shared/lib/formatters'
import { useCart } from '@/application/cart/useCart'

interface ProductCardProps {
  product: Product
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <article className="flex flex-col group">
      {/* Media */}
      <div className="relative bg-accent-tint rounded-card overflow-hidden aspect-[1/1.08]">
        <Link href={`/producto/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-[450ms] group-hover:scale-[1.045]"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        <span className="absolute top-3 left-3 font-mono text-[9.5px] tracking-[0.16em] uppercase bg-paper/90 text-ink-soft px-2.5 py-1.5 rounded-sm">
          {product.category}
        </span>

        {product.isNew && (
          <span className="absolute top-3 right-3 font-mono text-[9.5px] tracking-[0.12em] uppercase bg-accent-deep text-white px-2.5 py-1.5 rounded-sm">
            Nuevo
          </span>
        )}

        <button
          type="button"
          title="Agregar a la bolsa"
          onClick={() => addItem(product, '', 1)}
          className="absolute right-3 bottom-3 z-10 w-[42px] h-[42px] grid place-items-center bg-paper rounded-full shadow-quickadd transition-all duration-200 hover:bg-ink hover:text-paper text-ink opacity-100 translate-y-0 md:opacity-0 md:translate-y-1.5 md:group-hover:opacity-100 md:group-hover:translate-y-0"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Body */}
      <div className="pt-3.5 px-0.5 flex flex-col gap-1">
        <h3 className="font-serif text-[21px] font-medium leading-[1.15]">
          <Link href={`/producto/${product.slug}`} className="hover:text-accent-deep transition-colors">
            {product.name}
          </Link>
        </h3>
        <span className="text-[13px] text-ink-soft">{product.tagline}</span>
        <span className="font-mono text-[13px] mt-1.5">{formatPrice(product.prices.detal)}</span>
      </div>
    </article>
  )
}
