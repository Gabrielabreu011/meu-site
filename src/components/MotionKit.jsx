import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Sparkle from './Sparkle'
import { EASE, INTRO_SECONDS } from '../lib/motion'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

/** Revela o texto palavra por palavra, subindo de uma máscara. */
export function SplitText({ text, as = 'span', className, wordClassName, delay = 0, stagger = 0.08, onView = true, ...props }) {
  const reduced = useReducedMotionPreference()
  const Tag = motion[as]
  const words = text.split(' ')
  const parent = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } } }
  const child = {
    hidden: { y: reduced ? 0 : '115%', rotate: reduced ? 0 : 5, opacity: reduced ? 0 : 1 },
    show: { y: 0, rotate: 0, opacity: 1, transition: { duration: reduced ? 0.01 : 1, ease: EASE } },
  }
  const trigger = onView ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } } : { animate: 'show' }

  return (
    <Tag className={className} variants={parent} initial="hidden" aria-label={text} {...trigger} {...props}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span className={`inline-block ${wordClassName ?? ''}`} variants={child}>{word}</motion.span>
          {i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Fio rose gold no topo que acompanha a rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="bg-rosegold-metal fixed inset-x-0 top-0 z-[55] h-[3px] origin-left" />
}

/** Fio ondulado em rose gold que se desenha entre as seções. */
export function WaveDivider() {
  return (
    <div aria-hidden="true" className="bg-cream">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block h-12 w-full">
        <defs>
          <linearGradient id="wave-g" x1="0" x2="1">
            <stop offset="0" stopColor="#E6BDB2" stopOpacity="0" />
            <stop offset="0.5" stopColor="#B77970" />
            <stop offset="1" stopColor="#E6BDB2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d="M0 30 C200 0 400 60 600 30 S1000 0 1200 30" fill="none" stroke="url(#wave-g)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
      </svg>
    </div>
  )
}

/** Abertura cinematográfica: monograma desenhado e cortina que sobe. Toca a cada carregamento da página. */
export function Intro() {
  const reduced = useReducedMotionPreference()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), INTRO_SECONDS * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!reduced && !done && (
        <motion.div aria-hidden="true" className="bg-nude fixed inset-0 z-[70] grid place-items-center"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div className="relative grid place-items-center">
            <svg viewBox="0 0 200 200" className="h-44 w-44">
              <motion.circle cx="100" cy="100" r="90" fill="none" stroke="#B77970" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
            </svg>
            <motion.span className="text-rosegold-deep absolute font-display text-6xl"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>BP</motion.span>
            <motion.span className="absolute -right-3 top-4" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
              <Sparkle className="h-7 w-7" />
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}