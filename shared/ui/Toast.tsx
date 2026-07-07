'use client'

import { useCart } from '@/application/cart/useCart'

export function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink text-paper/95 font-mono text-[11.5px] tracking-[0.1em] px-5 py-3 rounded-pill z-[200] animate-toast-in shadow-toast whitespace-nowrap">
      {toast}
    </div>
  )
}
