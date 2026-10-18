import Sparkle from './Sparkle'

// Posições fixas (sem aleatório) para a página ficar igual a cada carregamento.
const sparkles = [
  { left: '6%', size: 14, duration: 19, delay: 0 },
  { left: '17%', size: 10, duration: 24, delay: 6 },
  { left: '29%', size: 18, duration: 21, delay: 12 },
  { left: '41%', size: 12, duration: 26, delay: 3 },
  { left: '53%', size: 16, duration: 20, delay: 9 },
  { left: '64%', size: 10, duration: 25, delay: 15 },
  { left: '75%', size: 14, duration: 22, delay: 5 },
  { left: '86%', size: 18, duration: 27, delay: 11 },
  { left: '94%', size: 11, duration: 23, delay: 17 },
]

/** Estrelinhas que sobem devagar pelo fundo da página. */
export default function FloatingSparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {sparkles.map(({ left, size, duration, delay }) => (
        <span
          key={left}
          className="absolute"
          style={{
            left,
            bottom: -40,
            width: size,
            height: size,
            animation: `drift ${duration}s linear ${delay}s infinite both`,
          }}
        >
          <Sparkle className="h-full w-full" />
        </span>
      ))}
    </div>
  )
}