import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

/** Halo suave que acompanha o mouse. Só aparece em telas com mouse e sem preferência por menos movimento. */
export default function CursorGlow() {
  const reduced = useReducedMotionPreference()
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const smoothX = useSpring(x, { stiffness: 110, damping: 20, mass: 0.7 })
  const smoothY = useSpring(y, { stiffness: 110, damping: 20, mass: 0.7 })

  useEffect(() => {
    if (reduced) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const move = (event) => {
      x.set(event.clientX - 160)
      y.set(event.clientY - 160)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-80 w-80 rounded-full bg-blush/45 blur-3xl"
      style={{ x: smoothX, y: smoothY }}
    />
  )
}