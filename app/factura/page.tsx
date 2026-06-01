'use client'

import { useRef } from 'react'
import { useCart } from '@/application/cart/useCart'
import { formatPrice } from '@/shared/lib/formatters'

function PrintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

export default function FacturaPage() {
  const { items, totalPrice } = useCart()
  const printRef = useRef<HTMLDivElement>(null)

  const invoiceNumber = `SYL-${String(Date.now()).slice(-5)}`
  const today = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  const handlePrint = () => window.print()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-end mb-6 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="btn-secondary gap-2 py-2 px-5 text-sm"
        >
          <PrintIcon />
          Imprimir factura
        </button>
      </div>

      <div
        ref={printRef}
        className="bg-paper border border-line rounded-card shadow-card overflow-hidden"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        <div className="bg-sand-dark px-8 py-6 border-b border-line">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-3xl italic text-ink">Syleia</p>
              <p className="text-xs text-ink-soft mt-0.5 font-sans">Suavidad que se siente</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-xs text-ink-soft uppercase tracking-widest font-medium">Factura</p>
              <p className="font-serif text-lg text-ink font-medium mt-0.5">{invoiceNumber}</p>
              <p className="text-xs text-ink-soft font-sans mt-1">{today}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-b border-line/60 grid grid-cols-2 gap-4">
          {[
            { label: 'Cliente', value: '___________________________' },
            { label: 'Ciudad', value: '___________________________' },
            { label: 'Teléfono', value: '___________________________' },
            { label: 'Método de pago', value: '___________________________' },
          ].map(field => (
            <div key={field.label}>
              <p className="text-xs font-sans uppercase tracking-widest text-ink-soft font-medium mb-1">
                {field.label}
              </p>
              <p className="font-sans text-sm text-ink">{field.value}</p>
            </div>
          ))}
        </div>

        <div className="px-8 py-5">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-line">
                {['Producto', 'Cant.', 'Precio', 'Total'].map((h, i) => (
                  <th
                    key={h}
                    className={`text-xs uppercase tracking-widest text-ink-soft font-medium pb-3 ${
                      i === 0 ? 'text-left' : i === 1 ? 'text-center' : 'text-right'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/50">
              {items.length > 0 ? (
                items.map(item => {
                  const color = item.product.colors.find(c => c.slug === item.colorSlug)
                  const price =
                    item.priceMode === 'mayor'
                      ? item.product.prices.mayor
                      : item.product.prices.detal
                  return (
                    <tr key={`${item.product.id}-${item.colorSlug}`}>
                      <td className="py-3 pr-4">
                        <p className="text-ink font-medium">{item.product.name}</p>
                        {color && <p className="text-ink-soft text-xs mt-0.5">{color.name}</p>}
                      </td>
                      <td className="py-3 text-center text-ink-soft">{item.quantity}</td>
                      <td className="py-3 text-right text-ink-soft">{formatPrice(price)}</td>
                      <td className="py-3 text-right text-ink font-medium">
                        {formatPrice(price * item.quantity)}
                      </td>
                    </tr>
                  )
                })
              ) : (
                [1, 2, 3].map(n => (
                  <tr key={n}>
                    <td className="py-4 pr-4"><div className="h-4 bg-line/30 rounded w-48" /></td>
                    <td className="py-4 text-center"><div className="h-4 bg-line/30 rounded w-6 mx-auto" /></td>
                    <td className="py-4 text-right"><div className="h-4 bg-line/30 rounded w-20 ml-auto" /></td>
                    <td className="py-4 text-right"><div className="h-4 bg-line/30 rounded w-24 ml-auto" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-5 bg-sand-dark/60 border-t border-line">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-sans text-ink-soft">* No incluye IVA</p>
              <p className="text-xs font-sans text-ink-soft mt-0.5">
                Precio incluye costo de producto. Envío aparte.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-sans uppercase tracking-widest text-ink-soft font-medium mb-1">Total</p>
              <p className="font-serif text-2xl font-semibold text-ink">
                {items.length > 0 ? formatPrice(totalPrice) : '$ _________'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-serif text-sm italic text-ink-soft">¡Gracias por tu compra! ♡</p>
          <p className="font-sans text-xs text-ink-soft">
            @syleia.co · hola@syleia.co · +57 300 123 4567
          </p>
        </div>
      </div>
    </div>
  )
}
