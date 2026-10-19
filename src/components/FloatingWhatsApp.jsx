import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

/**
 * Botão fixo no canto da tela que abre o WhatsApp com a mensagem inicial.
 * Só aparece quando há um número válido em src/config/site.js.
 */
export default function FloatingWhatsApp() {
  const link = getWhatsAppLink()
  const reduced = useReducedMotionPreference()

  if (!link) return null

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Beatrice pelo WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-rosegold-deep text-cream sm:bottom-7 sm:right-7"
      initial={reduced ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} aria-hidden="true" />
    </motion.a>
  )
}