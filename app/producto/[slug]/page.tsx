'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useProductDetail } from '@/application/catalog/useProductDetail'
import { useProducts } from '@/application/catalog/useProducts'
import { useCart } from '@/application/cart/useCart'
import { formatPrice } from '@/shared/lib/formatters'
import { ProductCard } from '@/shared/ui/ProductCard'

function QtyStepper({ value, onChange, max = 99 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="flex items-center border border-line rounded-sm bg-paper">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-[42px] h-full min-h-[48px] flex items-center justify-center text-ink-soft hover:text-ink transition-colors text-[17px]"
        aria-label="Menos"
      >
        -
      </button>
      <span className="min-w-[36px] text-center font-mono text-[14px]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-[42px] h-full min-h-[48px] flex items-center justify-center text-ink-soft hover:text-ink transition-colors text-[17px]"
        aria-label="Mas"
      >
        +
      </button>
    </div>
  )
}

const ACCORDION_EXTRA = [
  { id: 'cuidado', label: 'Cuidado de la pieza', body: 'Lava a mano con agua fria y jabon suave. No uses secadora ni plancha directa: deja secar a la sombra para conservar el brillo del satin.' },
  { id: 'envio', label: 'Envio y entrega', body: 'Confirmas tu pedido por WhatsApp y coordinamos el envio a toda Colombia. Tiempo estimado: 2-5 dias habiles segun tu ciudad.' },
]

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem, setDrawerOpen } = useCart()
  const { data: product, isLoading, isError } = useProductDetail(slug ?? '')
  const { data: allInCategory = [] } = useProducts(product?.category)

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openAcc, setOpenAcc] = useState<string | null>('detalles')

  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
    window.scrollTo(0, 0)
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-sand-dark" />
          <div className="h-4 w-32 bg-sand-dark rounded" />
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="shell empty-state">
        <div className="empty-mark">?</div>
        <h2 className="font-serif font-normal text-[34px] mt-4 mb-2">Producto no encontrado</h2>
        <Link href="/tienda" className="btn btn-ghost mt-4">Volver al catalogo</Link>
      </div>
    )
  }

  const related = allInCategory
    .filter(p => p.id !== product.id)
    .concat(allInCategory.filter(p => p.id !== product.id))
    .slice(0, 4)

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'
  const waMessage = `Hola SATINA! Me interesa: ${product.name} x${quantity} - ${formatPrice(product.prices.detal * quantity)}`

  const handleAdd = () => {
    addItem(product, '', quantity)
    setDrawerOpen(true)
  }

  const accordions = [
    { id: 'detalles', label: 'Detalles', body: product.description },
    ...ACCORDION_EXTRA,
  ]

  return (
    <main>
      <div className="shell">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 pt-5 mono-label">
          <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/tienda" className="hover:text-ink transition-colors">Catalogo</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        {/* PDP grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-[clamp(32px,5vw,72px)] py-7 pb-20 items-start">

          {/* Gallery */}
          <div className="grid grid-cols-[72px_1fr] gap-3.5 lg:sticky lg:top-24">
            <div className="flex flex-col gap-2.5">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`w-[72px] h-[84px] rounded-sm overflow-hidden border transition-colors bg-accent-tint ${i === activeImage ? 'border-ink' : 'border-transparent'}`}
                >
                  <Image src={src} alt="" fill className="object-cover mix-blend-multiply" sizes="72px" />
                </button>
              ))}
            </div>
            <div className="bg-accent-tint rounded-card overflow-hidden aspect-[1/1.06] relative">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="mono-label">{product.category}</span>
            <h1 className="font-serif font-normal text-[clamp(36px,4vw,54px)] leading-[1.02] tracking-[-0.015em] mt-2.5 mb-1.5">
              {product.name}
            </h1>
            <span className="font-serif italic text-[20px] text-accent-deep">{product.tagline}</span>

            <div className="font-mono text-[19px] mt-5 mb-1">{formatPrice(product.prices.detal)}</div>
            <span className="mono-label">
              {(product.stock ?? 0) > 10 ? 'Disponible' : `Quedan ${product.stock ?? 0} unidades`} - Envio a toda Colombia
            </span>

            <p className="text-ink-soft mt-5 mb-7 max-w-[480px] text-pretty leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {product.features.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-7">
                {product.features.map(f => (
                  <span key={f} className="feature-pill">{f}</span>
                ))}
              </div>
            )}

            <div className="flex gap-3 items-stretch mb-3">
              <QtyStepper value={quantity} onChange={setQuantity} max={product.stock ?? 99} />
              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary flex-1"
              >
                Agregar a la bolsa · {formatPrice(product.prices.detal * quantity)}
              </button>
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-block"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" strokeLinejoin="round" />
                <path d="M9 9.3c0 3 2.7 5.7 5.7 5.7l1.3-1.4-1.9-1.2-1 .7a4.6 4.6 0 0 1-2.2-2.2l.7-1-1.2-1.9L9 9.3Z" strokeLinejoin="round" />
              </svg>
              Pedir ahora por WhatsApp
            </a>

            {/* Accordion */}
            <div className="accordion">
              {accordions.map(a => (
                <div key={a.id} className="accordion-item">
                  <button
                    type="button"
                    className="accordion-trigger"
                    onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)}
                  >
                    {a.label}
                    <span className="font-serif italic text-[20px] text-accent-deep">
                      {openAcc === a.id ? '-' : '+'}
                    </span>
                  </button>
                  {openAcc === a.id && (
                    <div className="accordion-body">{a.body}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="section border-t border-line">
            <div className="flex items-end justify-between gap-6 mb-9">
              <div>
                <span className="mono-label">Completa el ritual</span>
                <h2 className="font-serif font-normal text-[clamp(30px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em] mt-2.5">
                  También te puede <em className="italic text-accent-deep">gustar</em>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-[22px]">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
