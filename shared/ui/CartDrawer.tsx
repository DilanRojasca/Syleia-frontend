'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/application/cart/useCart'
import { formatPrice } from '@/shared/lib/formatters'

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

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

function QtyStepper({ value, onChange, max = 99 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="flex items-center border border-line rounded-sm bg-paper">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors text-base"
        aria-label="Menos"
      >
        −
      </button>
      <span className="w-7 text-center font-mono text-[13px]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors text-base"
        aria-label="Más"
      >
        +
      </button>
    </div>
  )
}

export function CartDrawer() {
  const { items, totalPrice, totalItems, isDrawerOpen, setDrawerOpen, updateQuantity, removeItem } = useCart()

  if (!isDrawerOpen) return null

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'
  const waMessage =
    '¡Hola SATINA! 🌷 Quiero confirmar mi pedido:\n\n' +
    items.map(i => `· ${i.quantity} × ${i.product.name} — ${formatPrice(i.product.prices.detal * i.quantity)}`).join('\n') +
    `\n\nTotal: ${formatPrice(totalPrice)}`

  return (
    <>
      {/* Veil */}
      <div
        className="fixed inset-0 bg-ink/35 z-[90] animate-veil-in"
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Bolsa de compras"
        className="fixed top-0 right-0 bottom-0 w-[min(430px,92vw)] bg-paper z-[100] flex flex-col shadow-drawer animate-drawer-in"
      >
        {/* Head */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <h2 className="font-serif font-medium text-2xl">Tu bolsa</h2>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-accent-tint transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="empty-state py-[70px]">
              <div className="empty-mark">~</div>
              <h2 className="font-serif font-normal text-[26px] mt-4 mb-2">Tu bolsa está vacía</h2>
              <p className="text-ink-soft text-sm mb-6">El satín te espera.</p>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setDrawerOpen(false)}
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            items.map(line => (
              <div
                key={`${line.product.id}-${line.colorSlug}`}
                className="grid grid-cols-[76px_1fr_auto] gap-4 py-4 border-b border-line-soft items-center"
              >
                <Link href={`/producto/${line.product.slug}`} onClick={() => setDrawerOpen(false)} className="rounded-sm overflow-hidden bg-accent-tint block w-[76px] h-[86px] relative">
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
                    <Link href={`/producto/${line.product.slug}`} onClick={() => setDrawerOpen(false)} className="hover:text-accent-deep transition-colors">
                      {line.product.name}
                    </Link>
                  </h4>
                  <div className="font-mono text-[11.5px] text-ink-soft mt-1">{formatPrice(line.product.prices.detal)} c/u</div>
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <QtyStepper
                      value={line.quantity}
                      onChange={q => updateQuantity(line.product.id, line.colorSlug, q)}
                      max={line.product.stock ?? 99}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(line.product.id, line.colorSlug)}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft border-b border-line hover:text-accent-deep hover:border-accent-deep transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <span className="font-mono text-[13px] self-start pt-1">
                  {formatPrice(line.product.prices.detal * line.quantity)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 pb-6 pt-4 border-t border-line flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="mono-label">Subtotal</span>
              <strong className="font-mono text-[17px] font-medium">{formatPrice(totalPrice)}</strong>
            </div>
            <Link
              href="/carrito"
              className="btn btn-primary btn-block"
              onClick={() => setDrawerOpen(false)}
            >
              Ver bolsa completa
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-block"
              onClick={() => setDrawerOpen(false)}
            >
              <WAIcon /> Pedir por WhatsApp <ArrowIcon />
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
