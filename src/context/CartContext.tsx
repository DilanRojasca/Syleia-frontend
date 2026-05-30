import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CartItem, Product, PriceMode } from '../types'

interface CartState {
  items: CartItem[]
  priceMode: PriceMode
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; colorSlug: string; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string; colorSlug: string }
  | { type: 'UPDATE_QTY'; productId: string; colorSlug: string; quantity: number }
  | { type: 'SET_PRICE_MODE'; mode: PriceMode }
  | { type: 'CLEAR' }

interface CartContextValue extends CartState {
  dispatch: React.Dispatch<CartAction>
  totalItems: number
  totalPrice: number
  addItem: (product: Product, colorSlug: string, quantity?: number) => void
  removeItem: (productId: string, colorSlug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.product.id === action.product.id && i.colorSlug === action.colorSlug,
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id && i.colorSlug === action.colorSlug
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i,
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.product,
            colorSlug: action.colorSlug,
            quantity: action.quantity ?? 1,
            priceMode: state.priceMode,
          },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.productId && i.colorSlug === action.colorSlug),
        ),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        items:
          action.quantity <= 0
            ? state.items.filter(
                i => !(i.product.id === action.productId && i.colorSlug === action.colorSlug),
              )
            : state.items.map(i =>
                i.product.id === action.productId && i.colorSlug === action.colorSlug
                  ? { ...i, quantity: action.quantity }
                  : i,
              ),
      }
    case 'SET_PRICE_MODE':
      return {
        ...state,
        priceMode: action.mode,
        items: state.items.map(i => ({ ...i, priceMode: action.mode })),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], priceMode: 'detal' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const totalPrice = state.items.reduce((sum, i) => {
    const price =
      i.priceMode === 'mayor' ? i.product.prices.mayor : i.product.prices.detal
    return sum + price * i.quantity
  }, 0)

  const addItem = (product: Product, colorSlug: string, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, colorSlug, quantity })

  const removeItem = (productId: string, colorSlug: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId, colorSlug })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider
      value={{ ...state, dispatch, totalItems, totalPrice, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
