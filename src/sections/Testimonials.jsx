import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { experiencePillars, testimonials } from '../data/content'
import { siteConfig } from '../config/site'

/**
 * Enquanto showTestimonials for false (ou não houver depoimentos reais),
 * esta seção apresenta a experiência de atendimento.
 */
export default function Testimonials() {
  const hasReal = siteConfig.showTestimonials && testimonials.length > 0

  if (hasReal) {
    return (
      <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="bg-nude/60 py-24 sm:py-32">
        <Container>
          <SectionHeading id="depoimentos-titulo" title="Quem já passou por aqui" />
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.08}>
                <figure className="h-full rounded-3xl border border-blush/70 bg-cream p-8 shadow-soft">
                  <blockquote className="font-display text-2xl leading-snug">{t.text}</blockquote>
                  <figcaption className="mt-6 text-sm text-cocoa">{t.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    )
  }

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="bg-nude/60 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="experiencia-titulo"
          title="A experiência BP Glow"
          description="Um atendimento pensado para que cada detalhe seja cuidado, do primeiro contato ao resultado final."
        />
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {experiencePillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={i * 0.1}
              className="md:border-l md:border-rosegold/30 md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="text-3xl">{pillar.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">{pillar.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}