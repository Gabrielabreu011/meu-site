import { useCallback, useMemo, useState } from 'react'
import BookingModal from '../components/BookingModal'
import { BookingContext } from '../hooks/useBooking'

/** Guarda se a janela de agendamento está aberta e qual serviço vem marcado. */
export function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, serviceId: null })

  const openBooking = useCallback((serviceId = null) => setState({ open: true, serviceId }), [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])
  const value = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={state.open} serviceId={state.serviceId} onClose={close} />
    </BookingContext.Provider>
  )
}