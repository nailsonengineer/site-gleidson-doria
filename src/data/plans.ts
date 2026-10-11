import type { Plan } from '../types';

export const plans: Plan[] = [
  {
    id: 'mensal',
    name: 'MENSAL',
    durationMonths: 1,
    monthlyPrice: 150,
    totalPrice: 150,
    features: [
      'Treino personalizado',
      'Avaliação física inicial',
      'Suporte via WhatsApp',
      'Acesso à área do cliente'
    ],
    paymentLinkKey: 'mensal'
  },
  {
    id: 'trimestral',
    name: 'TRIMESTRAL',
    durationMonths: 3,
    monthlyPrice: 133,
    totalPrice: 400,
    features: [
      'Treino personalizado',
      'Avaliação física periódica',
      'Ajustes quinzenais de carga',
      'Suporte prioritário WhatsApp',
      'Acesso à área do cliente'
    ],
    paymentLinkKey: 'trimestral'
  },
  {
    id: 'semestral',
    name: 'SEMESTRAL',
    durationMonths: 6,
    monthlyPrice: 108,
    totalPrice: 650, 
    badge: 'Mais Popular',
    features: [
      'Treino personalizado avançado',
      'Avaliação física mensal',
      'Planejamento de progressão',
      'Suporte prioritário WhatsApp',
      'Acesso à área do cliente'
    ],
    paymentLinkKey: 'semestral'
  },
  {
    id: 'anual',
    name: 'ANUAL',
    durationMonths: 12,
    monthlyPrice: 92,
    totalPrice: 1100,
    badge: 'Melhor Custo-Benefício',
    features: [
      'Acompanhamento completo de elite',
      'Periodização de longo prazo',
      'Avaliações de bioimpedância',
      'Suporte direto VIP',
      'Acesso total à área do cliente'
    ],
    paymentLinkKey: 'anual'
  }
];