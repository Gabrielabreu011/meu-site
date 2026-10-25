import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Sparkle from './Sparkle'

const KEY = 'bp-intro-visto'
const reducedNow = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const seen = typeof window !== 'undefined' && window.sessionStorage.getItem(KEY) === '1'

/** Atraso (em segundos) que o hero espera para começar, enquanto a abertura toca. */
export const INTRO_DELAY = reducedNow || seen ? 0 : 1.5

/** Abertura cinematográfica: monograma desenhado e cortina que sobe. Toca uma vez por visita. */
export default function Intro() {
  const [show, setShow] = useState(INTRO_DELAY > 0)

  useEffect(() => {
    if (!show) return undefined
    const t = setTimeout(() => {
      window.sessionStorage.setItem(KEY, '1')
      setShow(false)
    }, 1500)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="bg-nude fixed inset-0 z-[70] grid place-items-center"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative grid place-items-center">
            <svg viewBox="0 0 200 200" className="h-44 w-44">
              <motion.circle cx="100" cy="100" r="90" fill="none" stroke="#B77970" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
            </svg>
            <motion.span className="text-rosegold-deep absolute font-display text-6xl"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>BP</motion.span>
            <motion.span className="absolute -right-3 top-4" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.9, duration: 0.6 }}>
              <Sparkle className="h-7 w-7" />
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}