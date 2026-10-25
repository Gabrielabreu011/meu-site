import { siteConfig } from '../config/site'

/** Junta classes CSS ignorando valores vazios. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Deixa o número do WhatsApp no formato que o link precisa: só dígitos, com 55.
 * Aceita "(11) 91234-5678", "+55 11 91234-5678", "5511912345678", etc.
 */
export function normalizeWhatsApp(value) {
  let digits = String(value ?? '').replace(/\D/g, '').replace(/^0+/, '')
  // DDD + número sem o código do país (10 ou 11 dígitos): acrescenta o 55 do Brasil
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`
  return digits
}

/** Aceita apenas números plausíveis (12 a 15 dígitos, já com o código do país). */
export function isValidWhatsApp(value) {
  return /^\d{12,15}$/.test(normalizeWhatsApp(value))
}

/**
 * Cria o link do WhatsApp com mensagem inicial.
 * Retorna null enquanto não houver número válido configurado.
 */
export function getWhatsAppLink(message = siteConfig.whatsappMessage) {
  const raw = String(siteConfig.whatsappNumber ?? '').trim()
  if (!isValidWhatsApp(raw)) {
    if (raw && import.meta.env.DEV) {
      console.warn(
        `[BP Glow Nails] O número "${raw}" em src/config/site.js não parece válido. ` +
          'Use DDD + número, por exemplo: 11912345678 ou 5511912345678.',
      )
    }
    return null
  }
  return `https://wa.me/${normalizeWhatsApp(raw)}?text=${encodeURIComponent(message)}`
}

/**
 * Aceita "bpglownails", "@bpglownails" ou o endereço completo do perfil.
 * Retorna só o nome de usuário, ou '' se não for válido.
 */
export function normalizeInstagram(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return ''
  const last = raw.split(/[?#]/)[0].replace(/\/+$/, '').split('/').pop() ?? ''
  const handle = last.replace(/^@/, '')
  return /^[A-Za-z0-9._]{1,30}$/.test(handle) ? handle : ''
}

export function getInstagramLink() {
  const handle = normalizeInstagram(siteConfig.instagramHandle)
  return handle ? `https://instagram.com/${handle}` : null
}