const ITEMS = [
  '✦  Envíos a todo Colombia',
  '✦  Satén de calidad premium',
  '✦  Al por mayor disponible',
  '✦  Despachos en 24 h',
  '✦  100% hecho con amor',
  '✦  Cuida tu cabello mientras duermes',
]

export function SocialProof() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="w-full overflow-hidden bg-sand-dark border-y border-line py-3.5">
      <div
        className="flex gap-0 whitespace-nowrap animate-marquee"
        style={{ width: 'max-content' }}
        aria-label="Beneficios SATINA"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 font-sans text-sm text-ink-soft tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
