export type LeadRecord = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  stage: string;
  score: number;
  owner: string;
  createdAt: string;
};

export const leadsTableData: LeadRecord[] = [
  {
    id: "LD-2045",
    name: "Gabriel Araújo",
    company: "Flux Digital",
    email: "gabriel@fluxdigital.com",
    phone: "+55 11 98888-7766",
    source: "Meta Ads",
    stage: "interested",
    score: 87,
    owner: "Squad Performance",
    createdAt: "2024-05-17T10:00:00Z",
  },
  {
    id: "LD-2038",
    name: "Ana Ribeiro",
    company: "NovaClin",
    email: "ana.ribeiro@novaclin.com",
    phone: "+55 21 97777-5544",
    source: "SEO",
    stage: "contacted",
    score: 72,
    owner: "Squad CS",
    createdAt: "2024-05-15T14:15:00Z",
  },
  {
    id: "LD-2033",
    name: "Lucas Carvalho",
    company: "Neon Bank",
    email: "lucas@neonbank.com",
    phone: "+55 31 96666-9988",
    source: "Referral",
    stage: "negotiating",
    score: 91,
    owner: "GMV Growth",
    createdAt: "2024-05-14T09:30:00Z",
  },
  {
    id: "LD-2031",
    name: "Fernanda Oliveira",
    company: "PulseFit",
    email: "fernanda@pulsefit.com",
    phone: "+55 48 95555-8833",
    source: "Google Ads",
    stage: "new",
    score: 64,
    owner: "Fit Squad",
    createdAt: "2024-05-13T16:45:00Z",
  },
  {
    id: "LD-2024",
    name: "Thiago Tavares",
    company: "OmniData",
    email: "thiago@omndata.ai",
    phone: "+55 61 94444-1122",
    source: "LinkedIn",
    stage: "closed_won",
    score: 95,
    owner: "Enterprise Lab",
    createdAt: "2024-05-12T11:20:00Z",
  },
];

export const pipelineStages = [
  {
    key: "new",
    title: "New",
    cards: ["LD-2031"],
  },
  {
    key: "contacted",
    title: "Contacted",
    cards: ["LD-2038"],
  },
  {
    key: "interested",
    title: "Interested",
    cards: ["LD-2045"],
  },
  {
    key: "negotiating",
    title: "Negotiating",
    cards: ["LD-2033"],
  },
  {
    key: "closed_won",
    title: "Closed Won",
    cards: ["LD-2024"],
  },
  {
    key: "closed_lost",
    title: "Closed Lost",
    cards: [],
  },
];

export const dashboardMetrics = [
  {
    label: "Leads na semana",
    value: "148",
    delta: "+18%",
  },
  {
    label: "Taxa de resposta WhatsApp",
    value: "64%",
    delta: "+6%",
  },
  {
    label: "Leads quentes",
    value: "23",
    delta: "+4%",
  },
  {
    label: "Média de SLA",
    value: "14m",
    delta: "-12%",
  },
];

export const leadsByDay = [
  { date: "Seg", value: 12 },
  { date: "Ter", value: 19 },
  { date: "Qua", value: 32 },
  { date: "Qui", value: 24 },
  { date: "Sex", value: 15 },
  { date: "Sáb", value: 7 },
  { date: "Dom", value: 5 },
];

export const whatsappResponseRate = [
  { label: "Recebidas", value: 320 },
  { label: "Enviadas", value: 510 },
];

export const utmBreakdown = [
  { key: "utm_source", value: "meta" },
  { key: "utm_medium", value: "paid_social" },
  { key: "utm_campaign", value: "swas_launch" },
  { key: "utm_term", value: "crm+agencia" },
  { key: "utm_content", value: "creative_07" },
  { key: "fbclid", value: "AwrjR-il1lJ0" },
  { key: "referrer", value: "instagram.com" },
];

export const leadEvents = [
  {
    id: "EVT-01",
    type: "opened_message",
    label: "Mensagem aberta",
    timestamp: "Há 3 minutos",
  },
  {
    id: "EVT-02",
    type: "clicked_button",
    label: "Clique no CTA",
    timestamp: "Há 8 minutos",
  },
  {
    id: "EVT-03",
    type: "responded",
    label: "Resposta recebida",
    timestamp: "Há 12 minutos",
  },
  {
    id: "EVT-04",
    type: "scheduled",
    label: "Call agendada",
    timestamp: "Há 20 minutos",
  },
];

export const whatsappMessages = [
  {
    id: "MSG-1",
    direction: "out",
    content: "Fala Gabriel, aqui é o Gui da GTX 🚀 Tudo certo?",
    timestamp: "10:02",
  },
  {
    id: "MSG-2",
    direction: "in",
    content: "Tudo sim! Recebi o material e curti muito.",
    timestamp: "10:05",
  },
  {
    id: "MSG-3",
    direction: "out",
    content: "Boa! Consigo te mostrar o painel amanhã às 9h, pode ser?",
    timestamp: "10:06",
  },
  {
    id: "MSG-4",
    direction: "in",
    content: "Perfeito, agenda nesse horário por favor 🙌",
    timestamp: "10:08",
  },
];

export const leadHeatScore = [
  { metric: "opened_message", value: 4 },
  { metric: "clicked_button", value: 3 },
  { metric: "responded", value: 2 },
  { metric: "scheduled", value: 1 },
];

export const defaultLeadId = "LD-2045";
