import { motion } from 'motion/react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import Sparkle from '../components/Sparkle'
import Button, { BookingButton } from '../components/Button'
import InstagramIcon from '../components/InstagramIcon'
import { getInstagramLink } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduced = useReducedMotionPreference()
  const instagram = getInstagramLink()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.14, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.85, ease } },
  }

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[linear-gradient(115deg,#F5E7E2_0%,#FBF1ED_38%,#F2DED8_66%,#FFFCFA_100%)] pb-20 pt-32 sm:pt-36 lg:pb-28"
    >
      {/* Brilho acetinado e detalhes decorativos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-6 h-[26rem] w-[26rem] rounded-full bg-blush/50 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rosegold/15 blur-3xl" />
        <Sparkle twinkle className="absolute left-[6%] top-[30%] hidden h-5 w-5 sm:block" />
        <Sparkle twinkle delay={1.6} className="absolute left-[44%] top-[22%] hidden h-4 w-4 lg:block" />
        <Sparkle twinkle delay={0.8} className="absolute bottom-[14%] left-[40%] hidden h-6 w-6 lg:block" />
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            id="hero-title"
            className="text-rosegold-deep pb-2 text-[3.1rem] sm:text-7xl lg:text-[5.2rem]"
          >
            Suas unhas, sua essência.
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            Beleza nos detalhes, delicadeza em cada traço. Descubra uma experiência de cuidado e
            autoestima com Beatrice Portella.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BookingButton>Agendar meu horário</BookingButton>
            <Button href="#servicos" variant="secondary">
              Conhecer os serviços
            </Button>
          </motion.div>
          {instagram && (
            <motion.a
              variants={item}
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-cocoa underline decoration-rosegold underline-offset-4 transition-colors hover:text-ink"
            >
              <InstagramIcon size={18} /> Acompanhe os trabalhos no Instagram
            </motion.a>
          )}
        </motion.div>

        {/* Logo da marca como peça central */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
          <div className="rounded-[2.5rem] bg-rosegold-metal p-[2px] shadow-lift">
            <motion.div
              className="overflow-hidden rounded-[calc(2.5rem-2px)] bg-nude"
              initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
            >
              <Logo imgClassName="block aspect-square w-full" />
            </motion.div>
          </div>
          <Sparkle twinkle className="absolute -right-3 -top-4 h-9 w-9 sm:-right-6" />
          <Sparkle twinkle delay={2} className="absolute -bottom-4 -left-3 h-6 w-6 sm:-left-6" />
        </div>
      </Container>
    </section>
  )
}