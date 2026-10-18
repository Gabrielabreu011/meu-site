import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Sparkle from '../components/Sparkle'
import { aboutText } from '../data/content'
import { siteConfig } from '../config/site'

export default function About() {
  const [lead, ...rest] = aboutText

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-24 sm:py-32">
      <Container className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <Reveal className="mx-auto">
          <div aria-hidden="true" className="relative grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-full bg-rosegold-metal p-[2px]">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-nude to-blush/60" />
            </div>
            <div className="absolute inset-6 rounded-full border border-rosegold/40" />
            <Sparkle className="absolute -right-1 top-6 h-7 w-7" />
            <span className="relative font-display text-7xl font-medium text-rosegold-deep sm:text-8xl">BP</span>
          </div>
        </Reveal>

        <div>
          <SectionHeading id="sobre-titulo" align="left" title={`Conheça ${siteConfig.owner}`} />
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-2xl leading-snug text-ink sm:text-[1.9rem]">{lead}</p>
            {rest.map((text) => (
              <p key={text} className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
                {text}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}