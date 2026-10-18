import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { faqs } from '../data/content'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotionPreference()

  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading id="duvidas-titulo" title="Perguntas frequentes" />
        <Reveal className="mt-12 divide-y divide-blush/70 border-y border-blush/70">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <h3 className="font-sans text-base font-normal leading-normal tracking-normal">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-2xl text-ink">{item.q}</span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: reduced ? 0.01 : 0.3 }}
                      className="shrink-0 text-cocoa"
                    >
                      <ChevronDown size={22} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="overflow-hidden"
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink/75">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </Container>
    </section>
  )
}