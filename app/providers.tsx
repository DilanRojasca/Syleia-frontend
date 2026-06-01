'use client'

import { CartProvider } from '@/infrastructure/cart/cartStore'

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
