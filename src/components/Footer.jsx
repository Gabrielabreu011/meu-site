import { MessageCircle } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import Container from './Container'
import Logo from './Logo'
import { navLinks } from '../data/content'
import { siteConfig } from '../config/site'
import { getInstagramLink, getWhatsAppLink } from '../lib/utils'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const instagram = getInstagramLink()
  const whatsapp = getWhatsAppLink()

  return (
    <footer className="border-t border-blush/60 bg-nude">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo imgClassName="h-36 w-36 rounded-3xl shadow-soft" />
          <p className="mt-4 max-w-xs text-ink/75">
            Beleza nos detalhes, delicadeza em cada traço.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-xl">Navegar</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink/80 transition-colors hover:text-cocoa">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {(instagram || whatsapp) && (
          <div>
            <h2 className="font-display text-xl">Contato</h2>
            <ul className="mt-4 space-y-3">
              {whatsapp && (
                <li>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-cocoa"
                  >
                    <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-cocoa"
                  >
                    <InstagramIcon size={18} /> @{siteConfig.instagramHandle.replace(/^@/, '')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>

      <div className="border-t border-blush/60 py-5">
        <Container className="text-sm text-ink/65">
          © {currentYear} {siteConfig.brand} — {siteConfig.owner}. Todos os direitos reservados.
        </Container>
      </div>
    </footer>
  )
}