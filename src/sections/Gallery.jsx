import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import NailMotif from '../components/NailMotif'
import { gallery } from '../data/content'
import { cn } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const shapeClass = {
  tall: 'md:row-span-2',
  wide: 'md:col-span-2',
  square: '',
}

const toneClass = {
  nude: 'from-nude to-blush/50',
  blush: 'from-blush/70 to-nude',
  rose: 'from-rosegold/35 to-blush/60',
}

function Placeholder({ tone, large = false }) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br',
        toneClass[tone] ?? toneClass.nude,
      )}
    >
      <NailMotif className={large ? 'h-40 w-32' : 'h-16 w-14 sm:h-20 sm:w-16'} />
      <span className="px-3 text-center text-xs text-cocoa/80">Espaço reservado para foto</span>
    </div>
  )
}

function Lightbox({ index, onClose, onNavigate }) {
  const reduced = useReducedMotionPreference()
  const closeRef = useRef(null)
  const item = gallery[index]

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da galeria"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-cream text-cocoa shadow-soft"
      >
        <X size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(-1)
        }}
        aria-label="Imagem anterior"
        className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-cocoa sm:left-6"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(1)
        }}
        aria-label="Próxima imagem"
        className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-cocoa sm:right-6"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={item.id}
          className="max-h-[85vh] w-[min(88vw,32rem)] overflow-hidden rounded-3xl bg-cream shadow-lift"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.src ? (
            <>
              <img src={item.src} alt={item.alt} className="max-h-[75vh] w-full object-contain" />
              <figcaption className="p-4 text-center text-sm text-ink/75">{item.alt}</figcaption>
            </>
          ) : (
            <div className="aspect-[4/5] w-full">
              <Placeholder tone={item.tone} large />
            </div>
          )}
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const reduced = useReducedMotionPreference()

  const close = useCallback(() => setActive(null), [])
  const navigate = useCallback(
    (step) => setActive((i) => (i === null ? i : (i + step + gallery.length) % gallery.length)),
    [],
  )

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="galeria-titulo"
          title="Galeria"
          description="Um olhar sobre o estilo da BP Glow Nails: tons nude, rosa, francesinha e detalhes em rose gold."
        />

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-3 md:auto-rows-[14rem]">
          {gallery.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 0.07} y={16} className={cn('min-h-0', shapeClass[item.shape])}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={item.src ? `Ampliar foto: ${item.alt}` : `Ampliar espaço reservado ${i + 1}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-blush/60 shadow-soft"
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-700',
                      !reduced && 'group-hover:scale-105',
                    )}
                  />
                ) : (
                  <Placeholder tone={item.tone} />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-cocoa/0 transition-colors duration-300 group-hover:bg-cocoa/10"
                />
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>

      <AnimatePresence>
        {active !== null && <Lightbox index={active} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </section>
  )
}