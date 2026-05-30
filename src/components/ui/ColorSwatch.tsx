interface ColorSwatchProps {
  color: { name: string; hex: string; slug: string }
  selected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-9 h-9',
}

export function ColorSwatch({ color, selected, onClick, size = 'md' }: ColorSwatchProps) {
  return (
    <button
      type="button"
      title={color.name}
      onClick={onClick}
      className={`
        ${sizes[size]} rounded-full transition-all duration-200 focus-visible:outline-none
        flex-shrink-0 relative
        ${selected
          ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper scale-110'
          : 'ring-1 ring-line hover:ring-ink-soft hover:scale-105'
        }
      `}
      style={{ backgroundColor: color.hex }}
    />
  )
}
