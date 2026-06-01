import type { Product, ProductCategory, ProductColor } from '@/domain/catalog/types'
import type { IProductRepository } from '@/domain/catalog/productRepository'

export const SWATCH_COLORS: ProductColor[] = [
  { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
  { name: 'Champagne',   hex: '#F5E6C8', slug: 'champagne' },
  { name: 'Verde Menta', hex: '#C5DDD3', slug: 'verde-menta' },
  { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
  { name: 'Dorado',      hex: '#D4B896', slug: 'dorado' },
  { name: 'Lila',        hex: '#C9B8E8', slug: 'lila' },
]

const PRODUCTS: Product[] = [
  {
    id: 'sch-001',
    slug: 'scrunchie-satin-rosado-palo',
    name: 'Scrunchie Satín Rosado Palo',
    shortDescription: 'El clásico de Syleia en su tono más suave.',
    description:
      'Elaborado en satén de alta calidad, este scrunchie cuida las hebras de tu cabello mientras duermes o descansas. No deja marcas, no produce fricción. El tono rosado palo es ideal para looks casuales y nocturnos.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
      { name: 'Champagne',   hex: '#F5E6C8', slug: 'champagne' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-sch-rosado/600/600',
      'https://picsum.photos/seed/syleia-sch-rosado-2/600/600',
    ],
    featured: true,
    inStock: true,
    isNew: false,
    tags: ['scrunchie', 'satin', 'rosado', 'básico'],
  },
  {
    id: 'sch-002',
    slug: 'scrunchie-satin-lila',
    name: 'Scrunchie Satín Lila',
    shortDescription: 'El favorito de la temporada, en lila soñador.',
    description:
      'Este es el tono estrella de Syleia. El lila suave en satén premium eleva cualquier look — desde el pijama hasta el moño del día. Cuida tu cabello mientras añade ese detalle especial.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Lila',        hex: '#C9B8E8', slug: 'lila' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Verde Menta', hex: '#C5DDD3', slug: 'verde-menta' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-sch-lila/600/600',
      'https://picsum.photos/seed/syleia-sch-lila-2/600/600',
    ],
    featured: true,
    inStock: true,
    isNew: true,
    tags: ['scrunchie', 'satin', 'lila', 'favorito'],
  },
  {
    id: 'sch-003',
    slug: 'scrunchie-satin-champagne',
    name: 'Scrunchie Satín Champagne',
    shortDescription: 'Elegancia neutra para cada ocasión.',
    description:
      'El champagne es el neutro elegante que combina con todo. Perfecto para regalar o para llevar todos los días. En satén premium para que tu cabello descanse con estilo.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Dorado',    hex: '#D4B896', slug: 'dorado' },
      { name: 'Nude',      hex: '#E8D5C0', slug: 'nude' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-sch-champagne/600/600',
      'https://picsum.photos/seed/syleia-sch-champagne-2/600/600',
    ],
    featured: true,
    inStock: true,
    tags: ['scrunchie', 'satin', 'champagne', 'neutro'],
  },
  {
    id: 'sch-004',
    slug: 'scrunchie-satin-verde-menta',
    name: 'Scrunchie Satín Verde Menta',
    shortDescription: 'Un toque fresco y delicado en satén.',
    description:
      'El verde menta suave aporta frescura y personalidad sin perder la delicadeza. Ideal para quienes buscan un acento de color que no grite demasiado.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Verde Menta', hex: '#C5DDD3', slug: 'verde-menta' },
      { name: 'Lila',        hex: '#C9B8E8', slug: 'lila' },
      { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-sch-menta/600/600',
    ],
    featured: false,
    inStock: true,
    tags: ['scrunchie', 'satin', 'verde', 'menta'],
  },
  {
    id: 'sch-005',
    slug: 'scrunchie-satin-nude',
    name: 'Scrunchie Satín Nude',
    shortDescription: 'Invisible, suave y siempre elegante.',
    description:
      'El nude es el scrunchie de diario por excelencia. Casi invisible sobre el cabello claro, añade suavidad y delicadeza a cualquier look sin desviar la atención.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Nude',      hex: '#E8D5C0', slug: 'nude' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Dorado',    hex: '#D4B896', slug: 'dorado' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-sch-nude/600/600',
    ],
    featured: false,
    inStock: true,
    tags: ['scrunchie', 'satin', 'nude', 'básico'],
  },
  {
    id: 'pack-001',
    slug: 'pack-scrunchies-x6',
    name: 'Pack × 6 Scrunchies',
    shortDescription: 'Los 6 tonos de Syleia juntos — el regalo perfecto.',
    description:
      'Todos los colores de la colección en un solo pack. Rosado palo, champagne, verde menta, nude, dorado y lila. Presentación especial lista para regalar. Precio especial por paquete.',
    category: 'scrunchies',
    prices: { detal: 50000, mayor: 32000, mayorMin: 3 },
    colors: [
      { name: 'Mix Colores', hex: '#ECE6DA', slug: 'mix' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-pack-6/600/600',
      'https://picsum.photos/seed/syleia-pack-6-2/600/600',
    ],
    featured: true,
    inStock: true,
    isNew: true,
    tags: ['pack', 'regalo', 'coleccion-completa'],
  },
  {
    id: 'combo-001',
    slug: 'combo-descanso-champagne',
    name: 'Combo Descanso Champagne',
    shortDescription: 'Gorro de satén + funda de almohada. El lujo del descanso.',
    description:
      'El kit completo para una rutina nocturna que cuida tu cabello. El gorro de satén mantiene tus ondas y evita el frizz mientras duermes. La funda de almohada en satén reduce la fricción en rostro y cabello. Todo en el elegante champagne Syleia.',
    category: 'combo-descanso',
    prices: { detal: 48000, mayor: 34000, mayorMin: 2 },
    colors: [
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Nude',      hex: '#E8D5C0', slug: 'nude' },
      { name: 'Lila',      hex: '#C9B8E8', slug: 'lila' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-combo-champagne/600/600',
      'https://picsum.photos/seed/syleia-combo-champagne-2/600/600',
    ],
    featured: true,
    inStock: true,
    isNew: false,
    tags: ['combo', 'gorro', 'funda', 'descanso', 'regalo'],
  },
  {
    id: 'combo-002',
    slug: 'combo-descanso-nude',
    name: 'Combo Descanso Nude',
    shortDescription: 'Gorro de satén + funda de almohada en nude suave.',
    description:
      'El mismo kit de descanso que enamora, en el tone nude más suave y versátil. Combina con cualquier ropa de cama. Presentación lista para regalar.',
    category: 'combo-descanso',
    prices: { detal: 48000, mayor: 34000, mayorMin: 2 },
    colors: [
      { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Champagne',   hex: '#F5E6C8', slug: 'champagne' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-combo-nude/600/600',
    ],
    featured: false,
    inStock: true,
    tags: ['combo', 'gorro', 'funda', 'descanso'],
  },
  {
    id: 'gor-001',
    slug: 'gorro-satin-rosado-palo',
    name: 'Gorro de Satén Rosado Palo',
    shortDescription: 'Para dormir y despertar con el cabello intacto.',
    description:
      'Elástico ajustable, satén suave por dentro y por fuera. Protege tu peinado, reduce el frizz y cuida las puntas mientras duermes. Una inversión para la salud de tu cabello.',
    category: 'gorros',
    prices: { detal: 25000, mayor: 18000, mayorMin: 4 },
    colors: [
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Champagne',   hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
      { name: 'Lila',        hex: '#C9B8E8', slug: 'lila' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-gorro-rosado/600/600',
    ],
    featured: false,
    inStock: true,
    tags: ['gorro', 'satin', 'nocturno', 'cabello'],
  },
  {
    id: 'fun-001',
    slug: 'funda-almohada-satin-nude',
    name: 'Funda de Almohada Satén Nude',
    shortDescription: 'Duérmete bella. Despiértate sin frizz.',
    description:
      'Funda de almohada en satén premium, doble cara. Reduce la fricción sobre piel y cabello para una mejor higiene capilar y facial. Talla estándar (50×70 cm). Cierre invisible en uno de los lados.',
    category: 'fundas',
    prices: { detal: 32000, mayor: 22000, mayorMin: 4 },
    colors: [
      { name: 'Nude',        hex: '#E8D5C0', slug: 'nude' },
      { name: 'Champagne',   hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Lila',        hex: '#C9B8E8', slug: 'lila' },
    ],
    images: [
      'https://picsum.photos/seed/syleia-funda-nude/600/600',
      'https://picsum.photos/seed/syleia-funda-nude-2/600/600',
    ],
    featured: false,
    inStock: true,
    tags: ['funda', 'almohada', 'satin', 'nocturno'],
  },
]

class MockProductRepository implements IProductRepository {
  getAll(): Product[] {
    return PRODUCTS
  }

  getBySlug(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug)
  }

  getByCategory(category: ProductCategory): Product[] {
    return PRODUCTS.filter(p => p.category === category)
  }

  getFeatured(): Product[] {
    return PRODUCTS.filter(p => p.featured)
  }
}

export const productRepository: IProductRepository = new MockProductRepository()
