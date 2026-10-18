import { useState } from 'react'
import { cn } from '../lib/utils'
import { siteConfig } from '../config/site'

export const LOGO_SRC = '/images/logo-bp-glow.jpeg'

/**
 * Logo oficial da marca.
 * - variant="full": imagem completa, sem distorção (object-contain).
 * - variant="mark": selo circular + nome, para a barra de navegação.
 * Se o arquivo não existir em public/images/logo-bp-glow.jpeg, aparece um monograma provisório.
 */
export default function Logo({ variant = 'full', className, imgClassName }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={cn('inline-flex items-center gap-3', className)}>
        <span
          aria-hidden="true"
          className="grid h-12 w-12 place-items-center rounded-full border border-rosegold/60 bg-nude font-display text-lg font-medium text-rosegold-deep"
        >
          BP
        </span>
        <span className="font-display text-xl font-medium leading-none text-ink">{siteConfig.brand}</span>
      </span>
    )
  }

  if (variant === 'mark') {
    return (
      <span className={cn('inline-flex items-center gap-3', className)}>
        <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-soft ring-1 ring-rosegold/50 sm:h-16 sm:w-16">
          <img
            src={LOGO_SRC}
            alt=""
            onError={() => setFailed(true)}
            className="h-full w-full scale-[1.65] object-cover"
            style={{ transformOrigin: '42% 38%' }}
          />
        </span>
        <span className="font-display text-xl font-medium leading-none text-ink sm:text-2xl">
          {siteConfig.brand}
        </span>
      </span>
    )
  }

  return (
    <img
      src={LOGO_SRC}
      alt={`Logo ${siteConfig.brand}`}
      onError={() => setFailed(true)}
      className={cn('h-auto w-auto object-contain', imgClassName, className)}
    />
  )
}