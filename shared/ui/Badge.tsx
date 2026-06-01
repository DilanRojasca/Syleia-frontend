interface BadgeProps {
  children: React.ReactNode
  variant?: 'new' | 'sale' | 'featured' | 'mayor'
}

const variants = {
  new:      'bg-lilac/60 text-ink',
  sale:     'bg-blush/70 text-ink',
  featured: 'bg-champagne text-ink',
  mayor:    'bg-ink text-paper',
}

export function Badge({ children, variant = 'new' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-pill text-xs font-sans font-medium tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
