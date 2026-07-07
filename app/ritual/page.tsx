import Image from 'next/image'
import Link from 'next/link'

const LIFESTYLE_LAVANDA = 'https://res.cloudinary.com/dp8w2covu/image/upload/w_1200,q_auto,f_auto/v1781026854/WhatsApp_Image_2026-06-09_at_12.38.47_6_tfl3k1.jpg'

const STEPS = [
  {
    n: '01',
    title: 'Seca sin friccion',
    desc: 'Despues del lavado, envuelve tu cabello en la toalla de microfibra. Absorbe sin frotar ni romper la fibra.',
    link: '/producto/toalla',
  },
  {
    n: '02',
    title: 'Peina y recoge',
    desc: 'Usa el scrunchie de satin para recoger sin marcar, o el tubo de ondas para despertar con ondas naturales.',
    link: '/producto/tubo',
  },
  {
    n: '03',
    title: 'Protege la noche',
    desc: 'El gorro de satin y la funda de almohada sellan la hidratacion mientras duermes.',
    link: '/producto/gorro',
  },
]

export default function RitualPage() {
  return (
    <div className="shell">
      <div className="pt-10 pb-7">
        <span className="mono-label text-accent-deep">Filosofia</span>
        <h1 className="page-title mt-2">El <em>ritual</em></h1>
        <p className="text-ink-soft mt-3">Cuidar el cabello no es un paso mas: es un momento tuyo.</p>
      </div>

      <section className="section border-t border-line" style={{ paddingTop: 0 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-7 lg:gap-[clamp(28px,5vw,72px)] items-center">
          <div className="relative rounded-card overflow-hidden aspect-[4/4.4]">
            <Image
              src={LIFESTYLE_LAVANDA}
              alt="Ritual nocturno SATINA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>

          <div>
            <span className="mono-label">El ritual SATINA</span>
            <h2 className="font-serif font-normal text-[clamp(30px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em] mt-2.5">
              Tres pasos, <em className="italic text-accent-deep">cada noche</em>
            </h2>

            <div className="flex flex-col mt-7">
              {STEPS.map(step => (
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

      <section className="section">
        <div className="text-center">
          <Link href="/tienda" className="btn btn-primary">Explorar el catalogo</Link>
        </div>
      </section>
    </div>
  )
}
