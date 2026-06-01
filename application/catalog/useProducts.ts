import { useMemo } from 'react'
import type { Product, ProductCategory } from '@/domain/catalog/types'
import { productRepository } from '@/infrastructure/catalog/productRepository'

export function useProducts(category?: ProductCategory | 'all'): Product[] {
  return useMemo(
    () =>
      !category || category === 'all'
        ? productRepository.getAll()
        : productRepository.getByCategory(category),
    [category],
  )
}

export function useFeaturedProducts(): Product[] {
  return useMemo(() => productRepository.getFeatured(), [])
}
