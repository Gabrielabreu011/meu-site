import Sparkle from './Sparkle'

const draw = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** Esmalte */
function PolishBottle() {
  return (
    <svg viewBox="0 0 80 140" {...draw}>
      <rect x="30" y="4" width="20" height="44" rx="6" />
      <path d="M36 12v28M44 12v28" />
      <rect x="34" y="48" width="12" height="10" rx="2" />
      <rect x="12" y="58" width="56" height="78" rx="16" fill="currentColor" fillOpacity="0.12" />
      <path d="M24 74c0-4 3-7 7-7M24 86v20" />
      <path d="M12 104h56" strokeDasharray="2 5" />
    </svg>
  )
}

/** Unha em formato amendoado */
function AlmondNail() {
  return (
    <svg viewBox="0 0 60 100" {...draw}>
      <path
        d="M30 4C42 4 54 30 54 62c0 22-10 34-24 34S6 84 6 62C6 30 18 4 30 4Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M18 44c0-12 4-22 9-30" />
      <path d="M16 78c3 6 8 10 14 10" strokeDasharray="1 5" />
    </svg>
  )
}

/** Pincel de nail art */
function NailBrush() {
  return (
    <svg viewBox="0 0 150 40" {...draw}>
      <path d="M4 20L88 13V27Z" />
      <rect x="88" y="11" width="24" height="18" rx="3" fill="currentColor" fillOpacity="0.12" />
      <path d="M96 11v18M104 11v18" />
      <path d="M112 12C132 14 146 18 146 20C146 22 132 26 112 28Z" fill="currentColor" fillOpacity="0.12" />
    </svg>
  )
}

/** Gota de esmalte */
function Drop() {
  return (
    <svg viewBox="0 0 40 52" {...draw}>
      <path d="M20 4C20 4 4 24 4 35a16 16 0 0 0 32 0C36 24 20 4 20 4Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 36c0 5 3 8 7 9" />
    </svg>
  )
}

const items = [
  { Art: PolishBottle, className: 'left-[2%] top-[14%] w-14 sm:w-20', animation: 'bg-bob-a 14s ease-in-out infinite both' },
  { Art: AlmondNail, className: 'right-[3%] top-[22%] w-10 sm:w-14', animation: 'bg-bob-b 17s ease-in-out infinite both' },
  { Art: NailBrush, className: 'left-[4%] top-[58%] w-24 sm:w-36', animation: 'bg-bob-b 19s ease-in-out infinite both' },
  { Art: Drop, className: 'right-[5%] top-[62%] w-9 sm:w-12', animation: 'bg-bob-a 15s ease-in-out infinite both' },
  { Art: PolishBottle, className: 'right-[10%] bottom-[6%] w-12 sm:w-16', animation: 'bg-bob-b 21s ease-in-out infinite both' },
  { Art: AlmondNail, className: 'left-[12%] bottom-[8%] w-9 sm:w-12', animation: 'bg-bob-a 18s ease-in-out infinite both' },
]

/** Desenhos de manicure (esmalte, unha, pincel, gota) flutuando de leve pelas laterais da página. */
export default function ManicureBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden text-rosegold opacity-30 mix-blend-multiply"
    >
      {items.map(({ Art, className, animation }, index) => (
        <div key={index} className={`absolute ${className}`} style={{ animation }}>
          <Art />
        </div>
      ))}

      <Sparkle twinkle className="absolute left-[22%] top-[34%] hidden h-5 w-5 md:block" />
      <Sparkle twinkle delay={1.2} className="absolute right-[24%] top-[48%] hidden h-4 w-4 md:block" />
      <Sparkle twinkle delay={2.4} className="absolute left-[30%] bottom-[22%] hidden h-6 w-6 md:block" />
    </div>
  )
}