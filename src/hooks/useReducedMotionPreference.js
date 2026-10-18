import { useReducedMotion } from 'motion/react'

/** Retorna true se o usuário prefere menos movimento (configuração do sistema). */
export function useReducedMotionPreference() {
  return Boolean(useReducedMotion())
}

export default useReducedMotionPreference