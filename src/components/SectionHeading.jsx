import { motion } from 'motion/react'
import { cn } from '../lib/utils'
import Reveal from './Reveal'
import Sparkle from './Sparkle'
import SplitText from './SplitText'

export default function SectionHeading({ id, title, description, align = 'center', className }) {
  const center = align === 'center'
  const line = (origin) => (
    <motion.span className={`h-px w-12 bg-rosegold-metal ${origin}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
      viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
  )
  return (
    <div className={cn('max-w-2xl', center ? 'mx-auto text-center' : 'text-left', className)}>
      <SplitText as="h2" id={id} text={title} className="text-4xl sm:text-5xl" />
      <span aria-hidden="true" className={cn('mt-5 flex items-center gap-3', center && 'justify-center')}>
        {center && line('origin-right')}
        <motion.span initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6 }}>
          <Sparkle className="h-4 w-4" />
        </motion.span>
        {line('origin-left')}
      </span>
      {description && (
        <Reveal delay={0.3}><p className="mt-5 text-lg leading-relaxed text-ink/75">{description}</p></Reveal>
      )}
    </div>
  )
}