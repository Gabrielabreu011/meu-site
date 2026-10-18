import { motion } from 'motion/react'
import { cn, getWhatsAppLink } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 select-none'

const variants = {
  primary:
    'bg-rosegold-deep text-cream hover:brightness-110 focus-visible:outline-cocoa',
  secondary:
    'border border-rosegold/60 bg-cream/60 text-cocoa hover:border-cocoa hover:bg-blush/30',
  light:
    'bg-cream text-cocoa shadow-soft hover:bg-nude',
}

/**
 * Botão/link com efeito de hover discreto.
 * Se receber `href`, renderiza <a>; caso contrário, <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  external = false,
  disabled = false,
  className,
  children,
  onClick,
  ...props
}) {
  const reduced = useReducedMotionPreference()
  const classes = cn(
    base,
    variants[variant],
    disabled && 'cursor-not-allowed opacity-75',
    className,
  )
  const motionProps = reduced || disabled
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2 } }

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * Botão de agendamento pelo WhatsApp.
 * Enquanto não houver número válido em src/config/site.js, fica desativado
 * e não cria nenhum link falso.
 */
export function BookingButton({ message, variant = 'primary', className, children = 'Agendar horário' }) {
  const link = getWhatsAppLink(message)

  if (!link) {
    return (
      <Button
        variant={variant}
        className={className}
        disabled
        title="O contato por WhatsApp será liberado em breve"
      >
        {children}
      </Button>
    )
  }

  return (
    <Button href={link} external variant={variant} className={className}>
      {children}
    </Button>
  )
}