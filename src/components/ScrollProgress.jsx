import { motion, useScroll, useSpring } from 'motion/react'

/** Fio rose gold no topo que acompanha a rolagem da página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="bg-rosegold-metal fixed inset-x-0 top-0 z-[55] h-[3px] origin-left" />
}