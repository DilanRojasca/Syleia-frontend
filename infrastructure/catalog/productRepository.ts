import type { Product, ProductCategory } from '@/domain/catalog/types'
import type { IProductRepository } from '@/domain/catalog/productRepository'

const CLD = 'https://res.cloudinary.com/dp8w2covu/image/upload'
const cld = (id: string, w = 800) => `${CLD}/w_${w},q_auto,f_auto/${id}`

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'gorro',
    slug: 'gorro',
    name: 'Gorro de satín',
    tagline: 'Protección nocturna',
    shortDescription: 'Protección nocturna para tu cabello',
    description: 'Gorro de satín elaborado con material suave y ligero, diseñado para proteger el cabello mientras duermes o realizas tu rutina de cuidado capilar. Ayuda a reducir el frizz, evitar el quiebre y conservar la hidratación natural del cabello.',
    category: 'Nocturno',
    prices: { detal: 32000, mayor: 26000, mayorMin: 6 },
    colors: [],
    images: [
      cld('v1781026941/WhatsApp_Image_2026-06-09_at_12.38.45_3_i59knl.jpg'),
      cld('v1781026941/WhatsApp_Image_2026-06-09_at_12.38.45_2_ci9v8k.jpg'),
    ],
    features: ['Reduce el frizz', 'Conserva la hidratación', 'Uso nocturno'],
    tags: ['satín', 'noche', 'cabello'],
    featured: true,
    inStock: true,
    stock: 14,
  },
  {
    id: 'scrunchie',
    slug: 'scrunchie',
    name: 'Scrunchie de satín',
    tagline: 'Recoge sin maltratar',
    shortDescription: 'Recoge sin maltratar tu cabello',
    description: 'Scrunchie de satín elaborado con tela suave y brillante, ideal para recoger el cabello sin maltratarlo ni generar frizz. Su diseño elegante y cómodo aporta un toque delicado para el uso diario.',
    category: 'Diario',
    prices: { detal: 10000, mayor: 7500, mayorMin: 12 },
    colors: [],
    images: [cld('v1781026943/WhatsApp_Image_2026-06-09_at_12.38.45_fswwde.jpg')],
    features: ['Tela suave y brillante', 'Sin marcas en el cabello', 'Diseño elegante'],
    tags: ['satín', 'diario', 'scrunchie'],
    featured: true,
    inStock: true,
    stock: 32,
  },
  {
    id: 'tulipan',
    slug: 'tulipan',
    name: 'Scrunchie tulipán',
    tagline: 'Detalle floral',
    shortDescription: 'Scrunchie con detalle de tulipán',
    description: 'Scrunchie de satín con detalle de tulipán en sus extremos, diseñado para recoger el cabello con un toque femenino y delicado. Recoge sin marcar ni generar frizz, con un acento floral que aporta personalidad al peinado.',
    category: 'Diario',
    prices: { detal: 14000, mayor: 10500, mayorMin: 12 },
    colors: [],
    images: [cld('v1781026944/WhatsApp_Image_2026-06-09_at_12.38.44_dj4efz.jpg')],
    features: ['Detalle de tulipán', 'Satín suave', 'Toque femenino'],
    tags: ['satín', 'diario', 'floral'],
    featured: true,
    inStock: true,
    stock: 18,
    isNew: true,
  },
  {
    id: 'tubo',
    slug: 'tubo',
    name: 'Tubo de ondas',
    tagline: 'Ondas sin calor',
    shortDescription: 'Ondas naturales sin aplicar calor',
    description: 'Tubo de ondas de satín diseñado para crear ondas suaves y definidas sin aplicar calor al cabello. Una alternativa cómoda y práctica para lograr peinados naturales mientras cuidas la salud de tu cabello.',
    category: 'Peinado',
    prices: { detal: 28000, mayor: 22000, mayorMin: 6 },
    colors: [],
    images: [cld('v1781026942/WhatsApp_Image_2026-06-09_at_12.38.45_1_e2ecyf.jpg')],
    features: ['Ondas sin calor', 'Peinado natural', 'Reduce el quiebre'],
    tags: ['satín', 'peinado', 'ondas'],
    featured: false,
    inStock: true,
    stock: 11,
  },
  {
    id: 'funda',
    slug: 'funda',
    name: 'Funda de almohada',
    tagline: 'Para cabello y piel',
    shortDescription: 'Protege cabello y piel mientras duermes',
    description: 'Funda de satín diseñada para proteger tanto el cabello como la piel mientras duermes. Reduce el frizz, el quiebre y la pérdida de hidratación, mientras su textura suave disminuye la fricción en el rostro.',
    category: 'Nocturno',
    prices: { detal: 38000, mayor: 30000, mayorMin: 4 },
    colors: [],
    images: [cld('v1781026940/WhatsApp_Image_2026-06-09_at_12.38.45_4_qkhzx1.jpg')],
    features: ['Cuida cabello y piel', 'Menos fricción', 'Previene marcas'],
    tags: ['satín', 'noche', 'piel'],
    featured: true,
    inStock: true,
    stock: 9,
  },
  {
    id: 'balaca',
    slug: 'balaca',
    name: 'Balaca de satín',
    tagline: 'Skin care esencial',
    shortDescription: 'El complemento perfecto para tu rutina',
    description: 'Balaca de satín diseñada para brindar comodidad y estilo mientras protege el cabello del frizz y el quiebre. El accesorio perfecto para complementar tu rutina de skin care o para el uso diario.',
    category: 'Diario',
    prices: { detal: 15000, mayor: 11500, mayorMin: 12 },
    colors: [],
    images: [cld('v1781026943/WhatsApp_Image_2026-06-09_at_12.38.44_1_ln5c9g.jpg')],
    features: ['Acabado suave', 'Ideal para skin care', 'Uso diario'],
    tags: ['satín', 'diario', 'skincare'],
    featured: false,
    inStock: true,
    stock: 21,
  },
  {
    id: 'toalla',
    slug: 'toalla',
    name: 'Toalla de microfibra',
    tagline: 'Secado delicado',
    shortDescription: 'Seca rápido sin dañar la fibra capilar',
    description: 'Toalla de microfibra diseñada para secar el cabello de forma rápida y delicada, reduciendo el frizz y el quiebre causado por la fricción. Material suave y absorbente que protege la fibra capilar.',
    category: 'Post-lavado',
    prices: { detal: 35000, mayor: 28000, mayorMin: 4 },
    colors: [],
    images: [cld('v1781026940/WhatsApp_Image_2026-06-09_at_12.38.45_5_mwvrb0.jpg')],
    features: ['Secado rápido', 'Suave y absorbente', 'Protege la fibra'],
    tags: ['microfibra', 'post-lavado', 'secado'],
    featured: false,
    inStock: true,
    stock: 16,
  },
]

class MockProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return MOCK_PRODUCTS
  }

  async getBySlug(slug: string): Promise<Product | undefined> {
    return MOCK_PRODUCTS.find(p => p.slug === slug)
  }

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => p.category === category)
  }

  async getFeatured(): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => p.featured)
  }
}

// In the browser we go through the same-origin Next.js rewrite (/api/backend)
// to avoid CORS entirely; on the server we hit the backend directly.
const API_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL && '/api/backend'

// c_limit scales the image down to fit inside 800x800 without cropping it.
// Any transformation segments already present in the URL are stripped first
// so they don't stack with this one.
function optimizeCloudinaryUrl(url: string): string {
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace(/\/upload\/(?:[^/]*,[^/]*\/)*/, '/upload/w_800,h_800,c_limit,f_auto,q_auto/')
}

function normalizeProduct(p: Product): Product {
  return { ...p, images: p.images.map(optimizeCloudinaryUrl) }
}

class ApiProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`)
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
    const data: Product[] = await res.json()
    return data.map(normalizeProduct)
  }

  async getBySlug(slug: string): Promise<Product | undefined> {
    const res = await fetch(`${API_URL}/products/${slug}`)
    if (res.status === 404) return undefined
    if (!res.ok) throw new Error(`Failed to fetch product "${slug}": ${res.status}`)
    const data: Product = await res.json()
    return normalizeProduct(data)
  }

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    const all = await this.getAll()
    return all.filter(p => p.category === category)
  }

  async getFeatured(): Promise<Product[]> {
    const all = await this.getAll()
    return all.filter(p => p.featured)
  }
}

// The backend now serves the new product schema. Falls back to mock data
// when NEXT_PUBLIC_API_URL is not configured (e.g. offline development).
export const productRepository: IProductRepository = API_URL
  ? new ApiProductRepository()
  : new MockProductRepository()
