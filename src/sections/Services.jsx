import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Sparkle from '../components/Sparkle'
import { services } from '../data/content'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const spring = { stiffness: 180, damping: 18, mass: 0.6 }

function ServiceCard({ service, reduced }) {
  const { name, description, icon: Icon } = service
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  // Inclinação 3D que segue o mouse
  const tilt = reduced ? 0 : 8
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring)

  // Brilho que acompanha o mouse dentro do cartão
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, rgb(232 194 199 / 0.55), transparent 70%)`

  function handleMove(event) {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.article
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="card-shine group relative h-full rounded-[1.75rem] border border-blush/70 bg-cream p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        {/* Luz que segue o mouse */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <Sparkle className="absolute right-6 top-6 h-4 w-4 scale-50 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" />

        {/* Ícone grande, em rose gold, com contraste forte */}
        <span
          aria-hidden="true"
          className="relative grid h-16 w-16 place-items-center rounded-full bg-rosegold-metal text-cream shadow-lift ring-4 ring-nude transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
        >
          <span className="animate-glow absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Icon size={28} strokeWidth={1.75} className="relative drop-shadow-[0_1px_1px_rgb(111_67_63/0.6)]" />
        </span>

        <h3 className="relative mt-6 text-2xl text-ink">{name}</h3>
        <p className="relative mt-3 leading-relaxed text-ink/75">{description}</p>
      </motion.article>
    </div>
  )
}

export default function Services() {
  const reduced = useReducedMotionPreference()

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-nude/60 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="servicos-titulo" title="Serviços" />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} className="h-full" delay={(index % 3) * 0.1}>
              <ServiceCard service={service} reduced={reduced} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}