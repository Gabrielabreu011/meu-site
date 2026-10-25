import { motion } from 'motion/react'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

/** Revela o texto palavra por palavra, subindo de uma máscara. */
export default function SplitText({ text, as = 'span', className, wordClassName, delay = 0, stagger = 0.08, onView = true, ...props }) {
  const reduced = useReducedMotionPreference()
  const Tag = motion[as]
  const words = text.split(' ')
  const parent = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } } }
  const child = {
    hidden: { y: reduced ? 0 : '115%', rotate: reduced ? 0 : 5, opacity: reduced ? 0 : 1 },
    show: { y: 0, rotate: 0, opacity: 1, transition: { duration: reduced ? 0.01 : 1, ease: [0.22, 1, 0.36, 1] } },
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