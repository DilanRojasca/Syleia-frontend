import type { Product, ProductCategory } from '@/domain/catalog/types'

export interface IProductRepository {
  getAll(): Product[]
  getBySlug(slug: string): Product | undefined
  getByCategory(category: ProductCategory): Product[]
  getFeatured(): Product[]
}
