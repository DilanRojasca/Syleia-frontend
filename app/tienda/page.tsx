import { Suspense } from 'react'
import { CatalogContent } from './CatalogContent'

export default function TiendaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="font-sans text-ink-soft text-sm animate-pulse">Cargando tienda…</span>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
