'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/application/cart/useCart'
import { formatPrice } from '@/shared/lib/formatters'

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" strokeLinejoin="round" />
      <path d="M9 9.3c0 3 2.7 5.7 5.7 5.7l1.3-1.4-1.9-1.2-1 .7a4.6 4.6 0 0 1-2.2-2.2l.7-1-1.2-1.9L9 9.3Z" strokeLinejoin="round" />
    </svg>
  )
}

export default function CarritoPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart()

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'
  const waMessage =
    'Hola SATINA! Quiero confirmar mi pedido:\n\n' +
    items.map(i => `- ${i.quantity} x ${i.product.name} - ${formatPrice(i.product.prices.detal * i.quantity)}`).join('\n') +
    `\n\nTotal: ${formatPrice(totalPrice)}`

  if (items.length === 0) {
    return (
      <div className="shell empty-state py-32">
        <div className="empty-mark">~</div>
        <h2 className="font-serif font-normal text-[34px] mt-5 mb-2">Tu bolsa esta vacia</h2>
        <p className="text-ink-soft mb-7">Explora el catalogo y encuentra tu proximo esencial de satin.</p>
        <Link href="/tienda" className="btn btn-primary">Ver catalogo <ArrowIcon /></Link>
      </div>
    )
  }

  return (
    <div className="shell">
      <div className="pt-10 pb-7">
        <span className="mono-label text-accent-deep">Tu seleccion</span>
        <h1 className="page-title mt-2">La <em>bolsa</em></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.85fr] gap-7 lg:gap-[clamp(28px,4vw,60px)] pb-20 items-start">
        {/* Lines */}
        <div>
          {items.map(line => (
            <div
              key={`${line.product.id}-${line.colorSlug}`}
              className="grid grid-cols-[76px_1fr_auto] gap-4 py-4 border-b border-line-soft items-center"
            >
              <Link href={`/producto/${line.product.slug}`} className="rounded-sm overflow-hidden bg-accent-tint block w-[76px] h-[86px] relative">
                <Image
                  src={line.product.images[0]}
                  alt={line.product.name}
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="76px"
                />
              </Link>
              <div>
                <h4 className="font-serif text-[18px] font-medium leading-tight">
                  <Link href={`/producto/${line.product.slug}`} className="hover:text-accent-deep transition-colors">
                    {line.product.name}
                  </Link>
                </h4>
                <div className="font-mono text-[11.5px] text-ink-soft mt-1">{formatPrice(line.product.prices.detal)} c/u</div>
                <div className="flex items-center gap-2.5 mt-2.5">
                  <div className="flex items-center border border-line rounded-sm bg-paper">
                    <button type="button" onClick={() => updateQuantity(line.product.id, line.colorSlug, line.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors">-</button>
                    <span className="w-7 text-center font-mono text-[13px]">{line.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(line.product.id, line.colorSlug, line.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors">+</button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.product.id, line.colorSlug)}
                    className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft border-b border-line hover:text-accent-deep hover:border-accent-deep transition-colors"
                  >
                    Quitar
                  </button>
                </div>
              </div>
              <span className="font-mono text-[13px] self-start pt-1">{formatPrice(line.product.prices.detal * line.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="summary-card">
          <h3 className="font-serif font-medium text-2xl mb-1">Resumen</h3>
          <div className="flex justify-between text-[14px] text-ink-soft">
            <span>Productos ({totalItems})</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-[14px] text-ink-soft">
            <span>Envio</span>
            <span>Por confirmar</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3.5 text-ink">
            <span className="text-[15px]">Total</span>
            <strong className="font-mono text-[18px] font-medium">{formatPrice(totalPrice)}</strong>
          </div>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent btn-block mt-1"
          >
            <WAIcon /> Finalizar por WhatsApp <ArrowIcon />
          </a>
          <Link href="/tienda" className="btn btn-quiet btn-block text-center">Seguir comprando</Link>
          <p className="flex gap-2 items-start text-[12.5px] text-ink-soft">
            <WAIcon />
            <span>El costo de envio se confirma por WhatsApp segun tu ciudad.</span>
          </p>
        </aside>
      </div>
    </div>
  )
}
