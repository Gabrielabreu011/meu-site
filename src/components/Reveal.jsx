import { motion } from 'motion/react'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

/** Aparecimento suave ao rolar a página. Sem deslocamento se houver preferência por menos movimento. */
function Reveal({ as = 'div', delay = 0, y = 22, className, children, ...props }) {
  const reduced = useReducedMotionPreference()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Exporta nos dois formatos: `import Reveal from` e `import { Reveal } from` funcionam.
export { Reveal }
export default Reveal