import { motion } from 'motion/react'

/** Fio ondulado em rose gold que se desenha entre as seções. */
export default function WaveDivider() {
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