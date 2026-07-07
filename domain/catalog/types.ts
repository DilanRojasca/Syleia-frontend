export type ProductCategory = 'Nocturno' | 'Diario' | 'Peinado' | 'Post-lavado'

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
  tagline: string
  shortDescription: string
  description: string
  category: ProductCategory
  prices: ProductPrices
  colors: ProductColor[]
  images: string[]
  features: string[]
  tags: string[]
  featured: boolean
  inStock: boolean
  stock?: number
  isNew?: boolean
}
