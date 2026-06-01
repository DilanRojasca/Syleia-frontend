import type { CartItem } from '@/domain/cart/types'

export interface InvoiceData {
  invoiceNumber: string
  date: string
  customer: {
    name: string
    city: string
    phone: string
  }
  items: CartItem[]
  notes?: string
}
