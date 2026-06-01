import type { Product } from '@/domain/catalog/types'

export type PriceMode = 'detal' | 'mayor'

export interface CartItem {
  product: Product
  colorSlug: string
  quantity: number
  priceMode: PriceMode
}

export interface CartState {
  items: CartItem[]
  priceMode: PriceMode
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product; colorSlug: string; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string; colorSlug: string }
  | { type: 'UPDATE_QTY'; productId: string; colorSlug: string; quantity: number }
  | { type: 'SET_PRICE_MODE'; mode: PriceMode }
  | { type: 'CLEAR' }
