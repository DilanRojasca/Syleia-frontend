'use client'

import { useContext } from 'react'
import { CartContext, type CartContextValue } from '@/infrastructure/cart/cartStore'

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
