import { useQuery } from '@tanstack/react-query'
import type { ProductCategory } from '@/domain/catalog/types'
import { productRepository } from '@/infrastructure/catalog/productRepository'

export function useProducts(category?: ProductCategory | 'all') {
  return useQuery({
    queryKey: ['products', category ?? 'all'],
    queryFn: () =>
      !category || category === 'all'
        ? productRepository.getAll()
        : productRepository.getByCategory(category as ProductCategory),
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productRepository.getFeatured(),
  })
}
