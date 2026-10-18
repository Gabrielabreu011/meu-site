import Sparkle from './Sparkle'

/** Título de seção com detalhe decorativo. `align` pode ser "center" (padrão) ou "left". */
function SectionHeading({ id, title, eyebrow, subtitle, align = 'center', className = '' }) {
  const isLeft = align === 'left'

  return (
    <div className={`max-w-2xl ${isLeft ? 'text-left' : 'mx-auto text-center'} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-rosegold">{eyebrow}</p>
      )}

      <h2 id={id} className="text-4xl text-ink sm:text-5xl">
        {title}
      </h2>

      <div
        aria-hidden="true"
        className={`mt-5 flex items-center gap-3 ${isLeft ? 'justify-start' : 'justify-center'}`}
      >
        <span className="h-px w-12 bg-rosegold-metal" />
        <Sparkle className="h-4 w-4" />
        <span className="h-px w-12 bg-rosegold-metal" />
      </div>

      {subtitle && <p className="mt-5 text-lg leading-relaxed text-ink/75">{subtitle}</p>}
    </div>
  )
}

// Exporta nos dois formatos: `import SectionHeading from` e `import { SectionHeading } from` funcionam.
export { SectionHeading }
export default SectionHeading