import { useId } from 'react'

/** Ilustração decorativa de unha amendoada rosa, usada em espaços reservados. */
export default function NailMotif({ className }) {
  const id = useId()
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6D3D6" />
          <stop offset="0.55" stopColor="#E9AEB8" />
          <stop offset="1" stopColor="#D993A0" />
        </linearGradient>
      </defs>
      <path
        d="M18 104 C14 58 27 6 40 6 C53 6 66 58 62 104 Z"
        fill={`url(#${id}-g)`}
        stroke="#B77970"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path
        d="M29 90 C27 58 32 30 38 18"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}