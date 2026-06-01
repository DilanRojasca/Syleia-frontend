import type { CartState, CartAction } from '@/domain/cart/types'

export function cartReducer(state: CartState, action: CartAction): CartState {
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
