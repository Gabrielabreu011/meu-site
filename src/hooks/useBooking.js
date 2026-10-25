import { createContext, useContext } from 'react'

export const BookingContext = createContext({ openBooking: () => {} })

/** Permite que qualquer botão abra a janela de agendamento. */
export function useBooking() {
  return useContext(BookingContext)
}