export type ProductCategory = 'scrunchies' | 'combo-descanso' | 'gorros' | 'fundas'

export interface ProductColor {
  name: string
  hex: string
  slug: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  category: ProductCategory
  prices: {
    detal: number
    mayor: number
    mayorMin: number
  }
  colors: ProductColor[]
  images: string[]
  featured: boolean
  inStock: boolean
  isNew?: boolean
  tags: string[]
}

export interface CartItem {
  product: Product
  colorSlug: string
  quantity: number
  priceMode: PriceMode
}

export type PriceMode = 'detal' | 'mayor'

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
