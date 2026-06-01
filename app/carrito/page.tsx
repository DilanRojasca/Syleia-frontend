'use client'

import Link from 'next/link'
import { useCart } from '@/application/cart/useCart'
import { formatPrice } from '@/shared/lib/formatters'
import { WhatsAppButton } from '@/shared/ui/WhatsAppButton'

export default function CarritoPage() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart()

  const waMessage =
    '¡Hola Syleia! Quiero hacer este pedido:\n\n' +
    items
      .map(
        i =>
          `• ${i.product.name} (${i.product.colors.find(c => c.slug === i.colorSlug)?.name ?? i.colorSlug}) × ${i.quantity} = ${formatPrice(
            (i.priceMode === 'mayor' ? i.product.prices.mayor : i.product.prices.detal) * i.quantity,
          )}`,
      )
      .join('\n') +
    `\n\nTOTAL: ${formatPrice(totalPrice)} 🌸`

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="text-5xl">🛍️</span>
        <div>
          <h1 className="font-serif text-2xl text-ink mb-2">Tu carrito está vacío</h1>
          <p className="font-sans text-ink-soft text-sm">
            Descubre la colección y encuentra tu favorito.
          </p>
        </div>
        <Link href="/tienda" className="btn-primary">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
      <h1 className="section-title mb-10">Tu carrito</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">

        <div className="flex flex-col gap-4">
          {items.map(item => {
            const color = item.product.colors.find(c => c.slug === item.colorSlug)
            const price =
              item.priceMode === 'mayor' ? item.product.prices.mayor : item.product.prices.detal

            return (
              <article
                key={`${item.product.id}-${item.colorSlug}`}
                className="flex gap-4 bg-paper rounded-card p-4 shadow-card"
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif text-sm font-medium text-ink leading-snug">
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {color && (
                          <span
                            className="w-3 h-3 rounded-full border border-line flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                        )}
                        <span className="text-xs font-sans text-ink-soft">{color?.name}</span>
                        {item.priceMode === 'mayor' && (
                          <span className="text-xs font-sans text-ink-soft">· Mayor</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id, item.colorSlug)}
                      aria-label={`Eliminar ${item.product.name}`}
                      className="text-line hover:text-ink-soft transition-colors flex-shrink-0 p-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-line rounded-pill overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.colorSlug, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-sans font-medium text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.colorSlug, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink text-sm"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-base font-semibold text-ink">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}

          <button
            type="button"
            onClick={clearCart}
            className="btn-ghost text-ink-soft self-start mt-1"
          >
            Vaciar carrito
          </button>
        </div>

        <aside>
          <div className="bg-paper rounded-card shadow-card p-6 flex flex-col gap-5 sticky top-24">
            <h2 className="font-serif text-xl text-ink">Resumen del pedido</h2>

            <div className="flex flex-col gap-2 text-sm font-sans">
              {items.map(item => {
                const price =
                  item.priceMode === 'mayor'
                    ? item.product.prices.mayor
                    : item.product.prices.detal
                return (
                  <div
                    key={`${item.product.id}-${item.colorSlug}`}
                    className="flex justify-between gap-3 text-ink-soft"
                  >
                    <span className="truncate">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="flex-shrink-0">{formatPrice(price * item.quantity)}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-line pt-4 flex justify-between items-center">
              <span className="font-sans text-sm font-medium text-ink-soft">Subtotal</span>
              <span className="font-serif text-xl font-semibold text-ink">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-xs font-sans text-ink-soft bg-sand-dark rounded-lg px-3 py-2.5 leading-relaxed">
              🚚 El costo de envío se calcula al confirmar el pedido por WhatsApp. Envíos a todo Colombia.
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <WhatsAppButton
                message={waMessage}
                label="Confirmar por WhatsApp"
                className="justify-center py-4 text-base"
              />
              <Link
                href="/tienda"
                className="btn-ghost justify-center py-2 text-sm text-ink-soft"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
