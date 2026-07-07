import { useQuery } from '@tanstack/react-query'
import { productRepository } from '@/infrastructure/catalog/productRepository'

export function useProductDetail(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productRepository.getBySlug(slug),
    enabled: !!slug,
  })
}
