/** Brilho decorativo em formato de estrela de quatro pontas. */
function Sparkle({ twinkle = false, delay = 0, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-rosegold ${className}`}
      style={twinkle ? { animation: `twinkle 3.6s ease-in-out ${delay}s infinite` } : undefined}
    >
      <path d="M12 0C12.8 6.5 17.5 11.2 24 12C17.5 12.8 12.8 17.5 12 24C11.2 17.5 6.5 12.8 0 12C6.5 11.2 11.2 6.5 12 0Z" />
    </svg>
  )
}

// Exporta nos dois formatos: `import Sparkle from` e `import { Sparkle } from` funcionam.
export { Sparkle }
export default Sparkle