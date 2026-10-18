import {
  Hand,
  Sparkles,
  Gem,
  Paintbrush,
  RefreshCw,
  Flower2,
} from 'lucide-react'

// ------------------------------------------------------------
// Navegação
// ------------------------------------------------------------
export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

// ------------------------------------------------------------
// Sobre — texto editável
// ------------------------------------------------------------
export const aboutText = [
  'Cada detalhe importa. A BP Glow Nails nasceu da paixão pela beleza das unhas e pelo cuidado que faz cada pessoa se sentir ainda mais confiante.',
  'Meu objetivo é proporcionar uma experiência delicada, cuidadosa e especial em cada atendimento.',
]

// ------------------------------------------------------------
// Serviços — DEMONSTRATIVOS. A proprietária deve confirmar e editar.
// Não há preços nem durações: informe-os somente quando forem confirmados.
// ------------------------------------------------------------
export const services = [
  {
    id: 'manicure-tradicional',
    name: 'Manicure tradicional',
    description:
      'Cuidado completo das unhas e cutículas, com esmaltação clássica e acabamento delicado.',
    icon: Hand,
  },
  {
    id: 'esmaltacao-em-gel',
    name: 'Esmaltação em gel',
    description:
      'Cor e brilho intensos, com acabamento uniforme para o dia a dia ou para ocasiões especiais.',
    icon: Sparkles,
  },
  {
    id: 'alongamento',
    name: 'Alongamento de unhas',
    description:
      'Formato e comprimento pensados para o seu estilo, com visual natural e elegante.',
    icon: Gem,
  },
  {
    id: 'nail-art',
    name: 'Nail art e decoração',
    description:
      'Francesinha, detalhes em rose gold e desenhos delicados para deixar suas unhas únicas.',
    icon: Paintbrush,
  },
  {
    id: 'manutencao',
    name: 'Manutenção',
    description:
      'Renovação e cuidado para manter suas unhas bonitas e bem acabadas por mais tempo.',
    icon: RefreshCw,
  },
  {
    id: 'cuidados-finalizacao',
    name: 'Cuidados e finalização',
    description:
      'Hidratação e toques finais que completam a experiência e valorizam o resultado.',
    icon: Flower2,
  },
]

// ------------------------------------------------------------
// Galeria — ESPAÇOS RESERVADOS.
// Para usar fotos reais da Beatrice: coloque os arquivos em
// public/images/gallery/ e preencha "src" e "alt" de cada item.
// Exemplo: src: '/images/gallery/unha-01.jpg'
// Enquanto "src" for null, aparece um espaço reservado elegante.
// "shape" controla a proporção do cartão: tall | wide | square
// ------------------------------------------------------------
export const gallery = [
  { id: 'g1', src: null, alt: 'Unhas em tom nude com acabamento brilhante', shape: 'tall', tone: 'nude' },
  { id: 'g2', src: null, alt: 'Francesinha delicada', shape: 'wide', tone: 'blush' },
  { id: 'g3', src: null, alt: 'Detalhes em rose gold', shape: 'square', tone: 'rose' },
  { id: 'g4', src: null, alt: 'Unhas rosa com brilho sutil', shape: 'square', tone: 'blush' },
  { id: 'g5', src: null, alt: 'Alongamento em formato amendoado', shape: 'wide', tone: 'rose' },
  { id: 'g6', src: null, alt: 'Nail art minimalista', shape: 'square', tone: 'nude' },
]

// ------------------------------------------------------------
// Experiência de atendimento (aparece enquanto não há depoimentos reais)
// ------------------------------------------------------------
export const experiencePillars = [
  {
    title: 'Cuidado em cada detalhe',
    text: 'Do preparo das unhas ao acabamento final, cada etapa é feita com atenção.',
  },
  {
    title: 'Atendimento delicado',
    text: 'Um momento pensado para você relaxar e se sentir bem cuidada.',
  },
  {
    title: 'Seu estilo em primeiro lugar',
    text: 'Formato, cor e decoração combinados com a sua personalidade.',
  },
]

// ------------------------------------------------------------
// Depoimentos REAIS — só serão exibidos se showTestimonials = true.
// Formato: { id, name, text }
// ------------------------------------------------------------
export const testimonials = []

// ------------------------------------------------------------
// Perguntas frequentes — respostas neutras; ajuste com as regras reais.
// ------------------------------------------------------------
export const faqs = [
  {
    q: 'Como faço para agendar?',
    a: 'O agendamento é feito pelo WhatsApp. Toque em “Agendar horário” e envie uma mensagem para consultar os horários disponíveis.',
  },
  {
    q: 'Onde vejo valores e duração dos atendimentos?',
    a: 'Os valores e o tempo de cada serviço são confirmados diretamente com a Beatrice, pelo WhatsApp.',
  },
  {
    q: 'Posso enviar uma referência de nail art?',
    a: 'Sim, você pode conversar com a Beatrice sobre o estilo que imagina para combinar o resultado antes do atendimento.',
  },
  {
    q: 'Como escolho o serviço ideal?',
    a: 'Se estiver em dúvida, conte para a Beatrice como você usa as unhas no dia a dia e o resultado que deseja. Ela ajuda a escolher.',
  },
]