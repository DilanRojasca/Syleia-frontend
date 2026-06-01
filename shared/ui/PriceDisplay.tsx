'use client'

import type { PriceMode } from '@/domain/cart/types'
import { formatPrice } from '@/shared/lib/formatters'

interface PriceModeToggleProps {
  mode: PriceMode
  onChange: (mode: PriceMode) => void
  className?: string
}

export function PriceModeToggle({ mode, onChange, className = '' }: PriceModeToggleProps) {
  return (
    <div className={`price-toggle ${className}`}>
      <button
        type="button"
        onClick={() => onChange('detal')}
        className={`price-toggle-btn ${mode === 'detal' ? 'active' : ''}`}
      >
        Detal
      </button>
      <button
        type="button"
        onClick={() => onChange('mayor')}
        className={`price-toggle-btn ${mode === 'mayor' ? 'active' : ''}`}
      >
        Por Mayor
      </button>
    </div>
  )
}

interface PriceTagProps {
  detal: number
  mayor: number
  mayorMin: number
  mode: PriceMode
  size?: 'sm' | 'md' | 'lg'
}

const priceSize = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
}

export function PriceTag({ detal, mayor, mayorMin, mode, size = 'md' }: PriceTagProps) {
  const price = mode === 'mayor' ? mayor : detal

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-serif font-semibold text-ink ${priceSize[size]}`}>
        {formatPrice(price)}
      </span>
      {mode === 'mayor' && (
        <span className="text-xs font-sans text-ink-soft">
          mín. {mayorMin} unidades · {formatPrice(detal)} detal
        </span>
      )}
    </div>
  )
}
