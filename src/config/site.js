// ============================================================
// CONFIGURAÇÃO DO SITE — edite aqui os dados reais da marca.
// Campos vazios ("") não aparecem no site.
// ============================================================

export const siteConfig = {
  brand: 'BP Glow Nails',
  owner: 'Beatrice Portella',

  // WhatsApp: somente dígitos, com código do país e DDD.
  // Exemplo de formato: "5511912345678"
  // PLACEHOLDER: enquanto estiver vazio, os botões de agendamento ficam
  // desativados e nenhum link falso é criado.
  whatsappNumber: '5511968953078',

  // Mensagem inicial usada no link do WhatsApp.
  whatsappMessage:
    'Olá, meu nome é  Beatrice! Gostaria de consultar os horários disponíveis para agendar um atendimento na BP Glow Nails.',

  // Instagram: apenas o usuário, sem @. Exemplo: "bpglownails"
  instagramHandle: 'bpglownails',

  // Endereço, em texto livre. Exemplo: "Rua Exemplo, 123 — Bairro, Cidade"
  address: '',

  // Horários de atendimento. Cada item: { days: 'Segunda a sexta', hours: '9h às 18h' }
  businessHours: [],

  // Depoimentos: mude para true SOMENTE quando houver avaliações reais
  // preenchidas em src/data/content.js (lista "testimonials").
  showTestimonials: false,
}