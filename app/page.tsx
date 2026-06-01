'use client'

import { useState } from 'react'
import type { PriceMode } from '@/domain/cart/types'
import { Hero } from '@/ui/catalog/sections/Hero'
import { SocialProof } from '@/ui/catalog/sections/SocialProof'
import { CategoryGrid } from '@/ui/catalog/sections/CategoryGrid'
import { FeaturedProducts } from '@/ui/catalog/sections/FeaturedProducts'
import { WholesaleCTA } from '@/ui/catalog/sections/WholesaleCTA'

export default function HomePage() {
  const [priceMode, setPriceMode] = useState<PriceMode>('detal')

  return (
    <>
      <Hero />
      <SocialProof />
      <CategoryGrid />
      <FeaturedProducts priceMode={priceMode} onModeChange={setPriceMode} />
      <WholesaleCTA />
    </>
  )
}
