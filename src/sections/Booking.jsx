import { Clock, MapPin, MessageCircle } from 'lucide-react'
import InstagramIcon from '../components/InstagramIcon'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Sparkle from '../components/Sparkle'
import Button, { BookingButton } from '../components/Button'
import { siteConfig } from '../config/site'
import { getInstagramLink, getWhatsAppLink } from '../lib/utils'

function InfoRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-rosegold/50 text-blush">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-xl text-cream">{label}</p>
        <div className="mt-1 text-cream/80">{children}</div>
      </div>
    </li>
  )
}

export default function Booking() {
  const whatsapp = getWhatsAppLink()
  const instagram = getInstagramLink()
  const { address, businessHours, instagramHandle } = siteConfig
  const hasInfo = whatsapp || instagram || address || businessHours.length > 0

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-cocoa py-24 text-cream sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 id="contato-titulo" className="text-4xl text-cream sm:text-5xl">
            Agende seu horário
          </h2>
          <span aria-hidden="true" className="mt-5 flex items-center gap-3">
            <span className="h-px w-12 bg-rosegold-metal" />
            <Sparkle className="h-4 w-4" />
          </span>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/85">
            Fale diretamente com a Beatrice para consultar os horários disponíveis e combinar os
            detalhes do seu atendimento.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <BookingButton variant="light">Agendar pelo WhatsApp</BookingButton>
            {instagram && (
              <Button href={instagram} external variant="outlineLight">
                <InstagramIcon size={18} /> Ver Instagram
              </Button>
            )}
          </div>

          {!whatsapp && (
            <p className="mt-4 text-sm text-cream/75">
              O contato por WhatsApp será liberado em breve.
              {import.meta.env.DEV && (
                <span className="mt-1 block text-blush">
                  (Aviso de desenvolvimento: informe o número em src/config/site.js)
                </span>
              )}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          {hasInfo ? (
            <ul className="space-y-8">
              {whatsapp && (
                <InfoRow icon={MessageCircle} label="WhatsApp">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="underline decoration-rosegold underline-offset-4 hover:text-cream">
                    Enviar mensagem
                  </a>
                </InfoRow>
              )}
              {instagram && (
                <InfoRow icon={InstagramIcon} label="Instagram">
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-rosegold underline-offset-4 hover:text-cream">
                    @{instagramHandle.replace(/^@/, '')}
                  </a>
                </InfoRow>
              )}
              {address && (
                <InfoRow icon={MapPin} label="Endereço">
                  <p>{address}</p>
                </InfoRow>
              )}
              {businessHours.length > 0 && (
                <InfoRow icon={Clock} label="Horários">
                  <ul className="space-y-1">
                    {businessHours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.hours}
                      </li>
                    ))}
                  </ul>
                </InfoRow>
              )}
            </ul>
          ) : (
            <p className="max-w-sm border-l border-rosegold/60 pl-6 font-display text-2xl leading-snug text-cream/90">
              Endereço, horários e redes sociais serão divulgados aqui em breve.
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  )
}