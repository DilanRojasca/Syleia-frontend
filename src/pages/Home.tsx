import { useState } from 'react'
import type { PriceMode } from '../types'
import { Hero } from '../components/sections/Hero'
import { SocialProof } from '../components/sections/SocialProof'
import { CategoryGrid } from '../components/sections/CategoryGrid'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { WholesaleCTA } from '../components/sections/WholesaleCTA'

export function Home() {
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
