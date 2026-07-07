import Image from 'next/image'
import Link from 'next/link'
import { FeaturedProducts } from '@/ui/catalog/sections/FeaturedProducts'

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LIFESTYLE_ROSA = 'https://res.cloudinary.com/dp8w2covu/image/upload/w_1200,q_auto,f_auto/v1780767529/WhatsApp_Image_2026-05-26_at_20.35.29_ccceyt.jpg'
const LIFESTYLE_LAVANDA = 'https://res.cloudinary.com/dp8w2covu/image/upload/w_1200,q_auto,f_auto/v1781026854/WhatsApp_Image_2026-06-09_at_12.38.47_6_tfl3k1.jpg'

const RITUAL_STEPS = [
  {
    n: '01',
    title: 'Seca sin fricción',
    desc: 'Después del lavado, envuelve tu cabello en la toalla de microfibra. Absorbe sin frotar ni romper la fibra.',
    link: '/producto/toalla',
  },
  {
    n: '02',
    title: 'Peina y recoge',
    desc: 'Usa el scrunchie de satín para recoger sin marcar, o el tubo de ondas para despertar con ondas naturales.',
    link: '/producto/tubo',
  },
  {
    n: '03',
    title: 'Protege la noche',
    desc: 'El gorro de satín y la funda de almohada sellan la hidratación mientras duermes.',
    link: '/producto/gorro',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-7 lg:gap-[clamp(28px,5vw,72px)] items-center py-10 lg:py-[clamp(40px,6vw,88px)] border-b border-line">
        <div>
          <span className="mono-label text-accent-deep">Nueva colección · 2026</span>
          <h1 className="font-serif font-normal text-[clamp(44px,5.6vw,84px)] leading-[0.98] tracking-[-0.02em] mt-4 mb-5 text-balance">
            El cuidado empieza{' '}
            <em className="italic text-accent-deep">mientras duermes</em>
          </h1>
          <p className="text-ink-soft max-w-[440px] text-pretty mb-8">
            Satín y microfibra que reducen el frizz, conservan la hidratación y protegen tu cabello noche tras noche.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <Link href="/tienda" className="btn btn-primary">
              Ver catálogo <ArrowIcon />
            </Link>
            <Link href="/ritual" className="btn btn-ghost">
              El ritual
            </Link>
          </div>
        </div>

        <figure className="relative">
          <div className="relative rounded-card overflow-hidden aspect-[4/4.6]">
            <Image
              src={LIFESTYLE_ROSA}
              alt="Scrunchies de satín SATINA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <figcaption className="absolute left-3.5 bottom-3.5 bg-paper/92 backdrop-blur-sm px-3.5 py-2 rounded-sm font-mono text-[10px] tracking-[0.16em] uppercase text-ink-soft">
            Satín premium · hecho a mano
          </figcaption>
        </figure>
      </section>

      {/* Featured products */}
      <FeaturedProducts />

      {/* Ritual band */}
      <section className="shell section border-t border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-7 lg:gap-[clamp(28px,5vw,72px)] items-center">
          <div className="relative rounded-card overflow-hidden aspect-[4/4.4]">
            <Image
              src={LIFESTYLE_LAVANDA}
              alt="Ritual nocturno SATINA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div>
            <span className="mono-label">El ritual SATINA</span>
            <h2 className="font-serif font-normal text-[clamp(30px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em] mt-2.5 mb-0">
              Tres pasos, <em className="italic text-accent-deep">cada noche</em>
            </h2>

            <div className="flex flex-col mt-7">
              {RITUAL_STEPS.map(step => (
                <div key={step.n} className="grid grid-cols-[56px_1fr] gap-4 py-5 border-t border-line">
                  <span className="font-serif italic text-[28px] text-accent-deep leading-none">{step.n}</span>
                  <div>
                    <h3 className="font-serif text-[21px] font-medium mb-1">{step.title}</h3>
                    <p className="text-[14px] text-ink-soft max-w-[420px]">
                      {step.desc}{' '}
                      <Link href={step.link} className="border-b border-line text-accent-deep hover:border-accent-deep transition-colors">
                        Ver producto
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
