import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Container from '../components/Container'
import About from './About'
import Testimonials from './Testimonials'
import Services from './Services'
import Gallery from './Gallery'
import FAQ from './FAQ'
import Booking from './Booking'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const tabs = [
  { id: 'sobre', label: 'Sobre', content: () => (<><About /><Testimonials /></>) },
  { id: 'servicos', label: 'Serviços', content: () => <Services /> },
  { id: 'galeria', label: 'Galeria', content: () => <Gallery /> },
  { id: 'duvidas', label: 'Perguntas', content: () => <FAQ /> },
  { id: 'contato', label: 'Contato', content: () => <Booking /> },
]

const isTab = (id) => tabs.some((t) => t.id === id)

/** Reúne Sobre, Serviços, Galeria, Perguntas e Contato em abas: uma janela por vez. */
export default function Explore() {
  const [active, setActive] = useState(() => {
    const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    return isTab(id) ? id : 'sobre'
  })
  const reduced = useReducedMotionPreference()
  const tabRefs = useRef([])

  // Links do tipo #galeria (menu, botões, rodapé) abrem a aba certa e descem até ela
  useEffect(() => {
    const open = (id) => {
      setActive(id)
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          document.getElementById('explorar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
        ),
      )
    }
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href').slice(1)
      if (!id || !isTab(id)) return
      e.preventDefault()
      window.history.replaceState(null, '', `#${id}`)
      open(id)
    }
    const onHash = () => {
      const id = window.location.hash.slice(1)
      if (isTab(id)) open(id)
    }
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [reduced])

  const select = (id) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const onKeyDown = (e, index) => {
    const steps = { ArrowRight: 1, ArrowLeft: -1 }
    let next = null
    if (e.key in steps) next = (index + steps[e.key] + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next === null) return
    e.preventDefault()
    select(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  const current = tabs.find((t) => t.id === active)

  return (
    <div id="explorar">
      <Container className="pb-2 pt-14">
        <div
          role="tablist"
          aria-label="Seções do site"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:justify-center sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`aba-${tab.id}`}
                aria-selected={selected}
                aria-controls="aba-painel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative shrink-0 whitespace-nowrap rounded-full border px-6 py-3 text-[0.95rem] transition-colors duration-300 ${
                  selected
                    ? 'border-transparent text-cream'
                    : 'border-rosegold/40 bg-cream/70 text-ink/80 hover:border-cocoa hover:text-cocoa'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="aba-indicador"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-rosegold-deep"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </Container>

      <div
        role="tabpanel"
        id="aba-painel"
        aria-labelledby={`aba-${active}`}
        className="min-h-[34rem] [&>section]:py-12 sm:[&>section]:py-16"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="[&>section]:py-12 sm:[&>section]:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {current.content()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}