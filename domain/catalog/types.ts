export type ProductCategory = 'scrunchies' | 'combo-descanso' | 'gorros' | 'fundas'

export interface ProductColor {
  name: string
  hex: string
  slug: string
}

export interface ProductPrices {
  detal: number
  mayor: number
  mayorMin: number
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  category: ProductCategory
  prices: ProductPrices
  colors: ProductColor[]
  images: string[]
  featured: boolean
  inStock: boolean
  isNew?: boolean
  tags: string[]
}
