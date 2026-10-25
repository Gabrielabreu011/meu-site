import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Send, X } from 'lucide-react'
import { services } from '../data/content'
import { siteConfig } from '../config/site'
import { cn, getWhatsAppLink } from '../lib/utils'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

const periods = ['Manhã', 'Tarde', 'Noite', 'Sem preferência']

const pad = (n) => String(n).padStart(2, '0')

function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const weekday = new Date(y, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'long' })
  return `${pad(d)}/${pad(m)}/${y} (${weekday})`
}

/** Monta a mensagem que será aberta no WhatsApp, só com o que a pessoa preencheu. */
function buildMessage({ name, selected, date, period, notes }) {
  const chosen = services.filter((s) => selected.includes(s.id)).map((s) => s.name)
  const lines = [
    `Olá, Beatrice! Gostaria de agendar um atendimento na ${siteConfig.brand}.`,
    '',
    `*Nome:* ${name.trim()}`,
    `*Serviço(s):* ${chosen.join(', ')}`,
  ]
  if (date) lines.push(`*Data preferida:* ${formatDate(date)}`)
  if (period) lines.push(`*Período:* ${period}`)
  if (notes.trim()) lines.push(`*Observações:* ${notes.trim()}`)
  lines.push('', 'Pode me confirmar a disponibilidade?')
  return lines.join('\n')
}

const fieldClass =
  'w-full rounded-2xl border border-rosegold/40 bg-cream px-4 py-3 text-ink placeholder:text-ink/45 focus:border-cocoa'

const chipBase =
  'inline-flex cursor-pointer select-none items-center rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cocoa'
const chipOff = 'border-rosegold/40 bg-cream text-ink/80 hover:border-cocoa'
const chipOn = 'border-transparent bg-rosegold-deep text-cream'

function BookingForm({ initialServiceId, onClose }) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState(initialServiceId ? [initialServiceId] : [])
  const [date, setDate] = useState('')
  const [period, setPeriod] = useState('Sem preferência')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)

  const [minDate] = useState(() => {
    const t = new Date()
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
  })

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const toggleService = (id) =>
    setSelected((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!name.trim()) next.name = 'Informe seu nome.'
    if (selected.length === 0) next.services = 'Escolha pelo menos um serviço.'
    setErrors(next)
    if (next.name) nameRef.current?.focus()
    if (Object.keys(next).length > 0) return

    const link = getWhatsAppLink(buildMessage({ name, selected, date, period, notes }))
    if (!link) return
    window.open(link, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
      <div>
        <label htmlFor="ag-nome" className="mb-2 block text-sm font-medium text-ink">
          Seu nome
        </label>
        <input
          ref={nameRef}
          id="ag-nome"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'ag-nome-erro' : undefined}
          placeholder="Como posso te chamar?"
          className={fieldClass}
        />
        {errors.name && (
          <p id="ag-nome-erro" role="alert" className="mt-2 text-sm text-cocoa">
            {errors.name}
          </p>
        )}
      </div>

      <fieldset aria-describedby={errors.services ? 'ag-servicos-erro' : undefined}>
        <legend className="mb-2 text-sm font-medium text-ink">O que você quer fazer?</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => {
            const on = selected.includes(service.id)
            return (
              <label key={service.id}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={on}
                  onChange={() => toggleService(service.id)}
                />
                <span className={cn(chipBase, on ? chipOn : chipOff)}>{service.name}</span>
              </label>
            )
          })}
        </div>
        {errors.services && (
          <p id="ag-servicos-erro" role="alert" className="mt-2 text-sm text-cocoa">
            {errors.services}
          </p>
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="ag-data" className="mb-2 block text-sm font-medium text-ink">
            Data preferida <span className="font-normal text-ink/55">(opcional)</span>
          </label>
          <input
            id="ag-data"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink">Período</legend>
          <div className="flex flex-wrap gap-2">
            {periods.map((p) => {
              const on = period === p
              return (
                <label key={p}>
                  <input
                    type="radio"
                    name="ag-periodo"
                    className="peer sr-only"
                    checked={on}
                    onChange={() => setPeriod(p)}
                  />
                  <span className={cn(chipBase, on ? chipOn : chipOff)}>{p}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="ag-obs" className="mb-2 block text-sm font-medium text-ink">
          Observações <span className="font-normal text-ink/55">(opcional)</span>
        </label>
        <textarea
          id="ag-obs"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Cor, formato, referência de nail art..."
          className={cn(fieldClass, 'resize-none')}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-rosegold-deep inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-wide text-cream transition hover:brightness-110"
        >
          <Send size={18} aria-hidden="true" /> Enviar pelo WhatsApp
        </button>
        <p className="mt-3 text-center text-sm text-ink/60">
          O WhatsApp abre com sua solicitação pronta. O horário só fica confirmado depois que a Beatrice responder.
        </p>
      </div>
    </form>
  )
}

/** Janela de agendamento: a pessoa escolhe o que quer e o WhatsApp abre com a mensagem pronta. */
export default function BookingModal({ open, serviceId, onClose }) {
  const reduced = useReducedMotionPreference()
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="agendar-titulo"
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-lift sm:max-w-xl sm:rounded-3xl sm:p-9"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar agendamento"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-rosegold/40 text-cocoa"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <h2 id="agendar-titulo" className="pr-10 text-3xl sm:text-4xl">
              Agendar horário
            </h2>
            <p className="mt-2 text-ink/70">Conte o que você quer fazer e envie direto para a Beatrice.</p>
            <BookingForm initialServiceId={serviceId} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}