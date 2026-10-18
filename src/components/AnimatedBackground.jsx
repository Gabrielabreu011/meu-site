const blobs = [
  {
    className: 'left-[-10%] top-[5%] h-[34rem] w-[34rem] bg-blush/60',
    animation: 'blob-one 26s ease-in-out infinite both',
  },
  {
    className: 'right-[-12%] top-[35%] h-[38rem] w-[38rem] bg-rosegold/35',
    animation: 'blob-two 32s ease-in-out infinite both',
  },
  {
    className: 'left-[25%] bottom-[-15%] h-[30rem] w-[30rem] bg-nude',
    animation: 'blob-three 29s ease-in-out infinite both',
  },
]

/** Manchas de luz em rose gold que se movem devagar pelo fundo da página. */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-70 mix-blend-multiply"
    >
      {blobs.map(({ className, animation }) => (
        <span
          key={className}
          className={`absolute rounded-full blur-3xl ${className}`}
          style={{ animation }}
        />
      ))}
    </div>
  )
}