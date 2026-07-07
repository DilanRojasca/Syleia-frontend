'use client'

import { createContext, useReducer, useState, type ReactNode } from 'react'
import type { Product } from '@/domain/catalog/types'
import type { CartState } from '@/domain/cart/types'
import { cartReducer } from '@/domain/cart/cartReducer'

export interface CartContextValue extends CartState {
  totalItems: number
  totalPrice: number
  isDrawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  toast: string | null
  showToast: (msg: string) => void
  addItem: (product: Product, colorSlug?: string, quantity?: number) => void
  removeItem: (productId: string, colorSlug?: string) => void
  updateQuantity: (productId: string, colorSlug: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], priceMode: 'detal' })
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const totalPrice = state.items.reduce((sum, i) => {
    const price = i.priceMode === 'mayor' ? i.product.prices.mayor : i.product.prices.detal
    return sum + price * i.quantity
  }, 0)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const addItem = (product: Product, colorSlug = '', quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, colorSlug, quantity })
    showToast(`${product.name} agregado a la bolsa`)
  }

  const removeItem = (productId: string, colorSlug = '') =>
    dispatch({ type: 'REMOVE_ITEM', productId, colorSlug })

  const updateQuantity = (productId: string, colorSlug: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', productId, colorSlug, quantity })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider
      value={{
        ...state,
        totalItems,
        totalPrice,
        isDrawerOpen,
        setDrawerOpen,
        toast,
        showToast,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
