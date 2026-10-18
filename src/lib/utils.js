import { siteConfig } from '../config/site'

/** Junta classes CSS ignorando valores vazios. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/** Verifica se o WhatsApp tem entre 10 e 15 dígitos. */
export function isValidWhatsApp(number) {
  return /^\d{10,15}$/.test(String(number ?? '').replace(/\D/g, ''))
}

/** Cria o link do WhatsApp com mensagem inicial. */
export function getWhatsAppLink(message = siteConfig.whatsappMessage) {
  const number = String(siteConfig.whatsappNumber ?? '').replace(/\D/g, '')

  if (!isValidWhatsApp(number)) return null

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Cria o link do Instagram. */
export function getInstagramLink() {
  const handle = String(siteConfig.instagramHandle ?? '')
    .trim()
    .replace(/^@/, '')

  return handle ? `https://instagram.com/${handle}` : null
}