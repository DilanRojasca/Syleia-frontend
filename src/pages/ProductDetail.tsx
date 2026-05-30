import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { PriceMode } from '../types'
import { getProductBySlug, formatPrice, products } from '../data/products'
import { ColorSwatch } from '../components/ui/ColorSwatch'
import { PriceModeToggle, PriceTag } from '../components/ui/PriceDisplay'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { Badge } from '../components/ui/Badge'
import { ProductCard } from '../components/ui/ProductCard'
import { useCart } from '../context/CartContext'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getProductBySlug(slug ?? '')

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? null)
  const [priceMode, setPriceMode] = useState<PriceMode>('detal')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <span className="text-5xl">🌸</span>
        <h1 className="font-serif text-2xl text-ink">Producto no encontrado</h1>
        <Link to="/tienda" className="btn-primary">Volver a la tienda</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedColor) return
    addItem(product, selectedColor.slug, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const waMessage = `¡Hola Syleia! Me interesa el producto: ${product.name} (${selectedColor?.name ?? ''}) — precio ${priceMode === 'mayor' ? 'por mayor' : 'detal'}: ${formatPrice(priceMode === 'mayor' ? product.prices.mayor : product.prices.detal)} 🌸`

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-ink-soft mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink transition-colors">Inicio</Link>
        <span aria-hidden>›</span>
        <Link to="/tienda" className="hover:text-ink transition-colors">Tienda</Link>
        <span aria-hidden>›</span>
        <span className="text-ink truncate max-w-[180px]">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16">

        {/* Images */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-card overflow-hidden bg-sand shadow-card">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} — ${selectedColor?.name}`}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4">
                <Badge variant="new">Nuevo</Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150 flex-shrink-0 ${
                    activeImage === i ? 'border-ink' : 'border-transparent hover:border-line'
                  }`}
                  aria-label={`Imagen ${i + 1}`}
                  aria-pressed={activeImage === i}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-7">

          {/* Category + name */}
          <div>
            <p className="text-xs font-sans text-ink-soft uppercase tracking-widest mb-2">
              {product.category === 'scrunchies' && 'Scrunchies'}
              {product.category === 'combo-descanso' && 'Combo Descanso'}
              {product.category === 'gorros' && 'Gorros'}
              {product.category === 'fundas' && 'Fundas'}
            </p>
            <h1 className="font-serif text-heading text-ink leading-tight">{product.name}</h1>
            <p className="font-sans text-base text-ink-soft mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Price toggle + price */}
          <div className="flex flex-col gap-3 py-5 border-y border-line">
            <PriceModeToggle mode={priceMode} onChange={setPriceMode} />
            <PriceTag
              detal={product.prices.detal}
              mayor={product.prices.mayor}
              mayorMin={product.prices.mayorMin}
              mode={priceMode}
              size="lg"
            />
          </div>

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-medium text-ink">Color</span>
                <span className="font-sans text-sm text-ink-soft">{selectedColor?.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <ColorSwatch
                    key={color.slug}
                    color={color}
                    size="lg"
                    selected={selectedColor?.slug === color.slug}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-ink">Cantidad</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-line rounded-pill overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-sand transition-colors"
                  aria-label="Reducir cantidad"
                >
                  −
                </button>
                <span className="w-10 text-center font-sans text-sm font-medium text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-sand transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              {priceMode === 'mayor' && (
                <span className="text-xs font-sans text-ink-soft">
                  mín. {product.prices.mayorMin} unidades
                </span>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`btn-primary justify-center py-4 text-base transition-all duration-300 ${
                added ? 'bg-green-800' : ''
              }`}
            >
              {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </button>
            <WhatsAppButton
              message={waMessage}
              label="Pedir directamente por WhatsApp"
              className="justify-center py-4"
            />
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-line">
            <h2 className="font-sans text-xs uppercase tracking-widest text-ink-soft mb-3 font-medium">
              Descripción
            </h2>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-sans text-ink-soft bg-sand-dark px-3 py-1 rounded-pill"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20 pt-12 border-t border-line">
          <h2 className="section-title mb-8">También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5">
            {related.map(p => (
              <ProductCard key={p.id} product={p} priceMode={priceMode} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
