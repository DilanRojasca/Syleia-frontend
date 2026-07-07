import type { Product, ProductCategory } from '@/domain/catalog/types'

export interface IProductRepository {
  getAll(): Promise<Product[]>
  getBySlug(slug: string): Promise<Product | undefined>
  getByCategory(category: ProductCategory): Promise<Product[]>
  getFeatured(): Promise<Product[]>
}
