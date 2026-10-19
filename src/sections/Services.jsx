import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Sparkle from '../components/Sparkle'
import { BookingButton } from '../components/Button'
import { services } from '../data/content'
import { siteConfig } from '../config/site'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const ease = [0.22, 1, 0.36, 1]

export default function Services() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotionPreference()
  const tabRefs = useRef([])

  const current = services[active]
  const Icon = current.icon
  const message = `Olá, Beatrice! Gostaria de agendar um atendimento de ${current.name.toLowerCase()} na ${siteConfig.brand}. Quais horários estão disponíveis?`

  // Navegação por teclado: setas, Home e End
  const onKeyDown = (e, index) => {
    const steps = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = null
    if (e.key in steps) next = (index + steps[e.key] + services.length) % services.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = services.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-nude/60 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="servicos-titulo"
          title="Serviços"
          description="Escolha uma categoria para conhecer o serviço e agendar seu horário."
        />

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[19rem_1fr] lg:gap-10">
          {/* Abas */}
          <div
            role="tablist"
            aria-label="Categorias de serviços"
            aria-orientation="vertical"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, i) => {
              const selected = i === active
              const TabIcon = service.icon
              return (
                <button
                  key={service.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`servico-tab-${service.id}`}
                  aria-selected={selected}
                  aria-controls="servico-painel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-5 py-3 text-left text-[0.95rem] transition-colors duration-300 ${
                    selected
                      ? 'border-transparent text-cream'
                      : 'border-rosegold/40 bg-cream/70 text-ink/80 hover:border-cocoa hover:text-cocoa'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="servico-indicador"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-rosegold-deep"
                      transition={{ duration: 0.35, ease }}
                    />
                  )}
                  <TabIcon size={18} strokeWidth={1.5} aria-hidden="true" className="relative" />
                  <span className="relative">{service.name}</span>
                </button>
              )
            })}
          </div>

          {/* Conteúdo da aba selecionada */}
          <div
            role="tabpanel"
            id="servico-painel"
            aria-labelledby={`servico-tab-${current.id}`}
            tabIndex={0}
            className="relative min-h-[20rem] overflow-hidden rounded-3xl border border-blush/70 bg-cream p-8 shadow-soft sm:p-12"
          >
            <Sparkle className="absolute right-8 top-8 h-6 w-6 opacity-70" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="flex h-full flex-col"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-nude text-cocoa">
                  <Icon size={30} strokeWidth={1.3} aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-4xl sm:text-5xl">{current.name}</h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{current.description}</p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <BookingButton message={message}>Solicitar agendamento</BookingButton>
                  <p className="text-sm text-ink/60">Valores e duração confirmados com a Beatrice.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}