import { useMemo } from 'react'
import type { Product } from '@/domain/catalog/types'
import { productRepository } from '@/infrastructure/catalog/productRepository'

export function useProductDetail(slug: string): Product | undefined {
  return useMemo(() => productRepository.getBySlug(slug), [slug])
}
