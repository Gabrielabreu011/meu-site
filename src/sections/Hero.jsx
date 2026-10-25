import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import Sparkle from '../components/Sparkle'
import { SplitText } from '../components/MotionKit'
import { EASE, INTRO_SECONDS } from '../lib/motion'
import Button, { BookingButton } from '../components/Button'
import InstagramIcon from '../components/InstagramIcon'
import { getInstagramLink } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const ease = EASE

export default function Hero() {
  const reduced = useReducedMotionPreference()
  const instagram = getInstagramLink()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const range = (v) => (reduced ? 0 : v)
  const textY = useTransform(scrollYProgress, [0, 1], [0, range(-50)])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, range(110)])
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.9])
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, range(-3)])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, range(220)])
  const sparkY = useTransform(scrollYProgress, [0, 1], [0, range(-160)])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.2])

  const d = reduced ? 0 : INTRO_SECONDS
  const item = (i) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.01 : 0.9, delay: d + 0.7 + i * 0.12, ease },
  })

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[linear-gradient(115deg,#F5E7E2_0%,#FBF1ED_38%,#F2DED8_66%,#FFFCFA_100%)] pb-20 pt-32 sm:pt-36 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div style={{ y: blobY }} className="absolute -right-24 top-6 h-[26rem] w-[26rem] rounded-full bg-blush/50 blur-3xl" />
        <motion.div style={{ y: blobY }} className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rosegold/15 blur-3xl" />
        <motion.div style={{ y: sparkY }} className="absolute inset-0">
          <Sparkle twinkle className="absolute left-[6%] top-[30%] hidden h-5 w-5 sm:block" />
          <Sparkle twinkle delay={1.6} className="absolute left-[44%] top-[22%] hidden h-4 w-4 lg:block" />
          <Sparkle twinkle delay={0.8} className="absolute bottom-[14%] left-[40%] hidden h-6 w-6 lg:block" />
        </motion.div>
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }}>
          <SplitText as="h1" id="hero-title" onView={false} delay={d + 0.2} stagger={0.12}
            text="Suas unhas, sua essência." wordClassName="text-rosegold-deep"
            className="pb-2 text-[3.1rem] sm:text-7xl lg:text-[5.2rem]" />
          <motion.p {...item(1)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            Beleza nos detalhes, delicadeza em cada traço. Descubra uma experiência de cuidado e autoestima com Beatrice Portella.
          </motion.p>
          <motion.div {...item(2)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BookingButton>Agendar meu horário</BookingButton>
            <Button href="#servicos" variant="secondary">Conhecer os serviços</Button>
          </motion.div>
          {instagram && (
            <motion.a {...item(3)} href={instagram} target="_blank" rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-cocoa underline decoration-rosegold underline-offset-4 transition-colors hover:text-ink">
              <InstagramIcon size={18} /> Acompanhe os trabalhos no Instagram
            </motion.a>
          )}
        </motion.div>

        <motion.div style={{ y: logoY, scale: logoScale, rotate: logoRotate }} className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
          <div className="bg-rosegold-metal rounded-[2.5rem] p-[2px] shadow-lift">
            <motion.div className="overflow-hidden rounded-[calc(2.5rem-2px)] bg-nude"
              initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, delay: d + 0.3, ease }}>
              <motion.div initial={reduced ? false : { scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 2, delay: d + 0.3, ease }}>
                <Logo imgClassName="block aspect-square w-full" />
              </motion.div>
            </motion.div>
          </div>
          <Sparkle twinkle className="absolute -right-3 -top-4 h-9 w-9 sm:-right-6" />
          <Sparkle twinkle delay={2} className="absolute -bottom-4 -left-3 h-6 w-6 sm:-left-6" />
        </motion.div>
      </Container>
    </section>
  )
}