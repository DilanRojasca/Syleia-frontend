'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from '@/infrastructure/cart/cartStore'
import { CartDrawer } from '@/shared/ui/CartDrawer'
import { Toast } from '@/shared/ui/Toast'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
        <CartDrawer />
        <Toast />
      </CartProvider>
    </QueryClientProvider>
  )
}
