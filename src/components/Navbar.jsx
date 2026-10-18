import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Container from './Container'
import Logo from './Logo'
import { BookingButton } from './Button'
import { navLinks } from '../data/content'
import { cn } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotionPreference()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || open
          ? 'border-b border-blush/60 bg-nude/85 shadow-soft backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#inicio" aria-label="BP Glow Nails — ir para o início" className="flex shrink-0 items-center">
          <Logo variant="mark" />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 text-[0.95rem] tracking-wide text-ink/85 transition-colors hover:text-cocoa"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-rosegold-metal transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <BookingButton>Agendar horário</BookingButton>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-rosegold/50 text-cocoa lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="overflow-hidden lg:hidden"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="pb-7 pt-2">
              <nav aria-label="Menu móvel">
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      className="border-b border-blush/60"
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-4 font-display text-2xl text-ink"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <BookingButton className="mt-6 w-full">Agendar horário</BookingButton>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}