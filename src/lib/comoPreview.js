export const stages = [
  {
    id: 'diagnostico',
    label: 'Diagnóstico',
    line: '30 minutos, sem contrato.',
    text: 'Entrega: onde a operação pesa, e se a IA cabe. Se não couber, a conversa acaba ali.',
  },
  {
    id: 'plano',
    label: 'Plano',
    line: 'Sai do diagnóstico.',
    text: 'Entrega: o que fazer agora, o que fica para depois e o que não entra.',
  },
  {
    id: 'acompanhamento',
    label: 'Acompanhamento',
    line: 'Todo mês, enquanto o plano estiver ativo.',
    text: 'Entrega: o ajuste do que já está no ar, e o critério para desligar o que ninguém usa.',
  },
];

export const fields = [
  {
    id: 'atendimento',
    label: 'Atendimento',
    line: 'O pedido chega no WhatsApp e alguém copia para outro lugar.',
    text: 'A mesma pergunta volta porque a resposta não ficou no fluxo.',
  },
  {
    id: 'vendas',
    label: 'Vendas',
    line: 'O próximo contato depende de alguém lembrar.',
    text: 'A proposta espera um dado que está em outra conversa.',
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    line: 'A cobrança sai quando alguém lembra.',
    text: 'O fechamento do dia espera a planilha.',
  },
];

export const bridge = 'Entre o plano e o acompanhamento entram a primeira automação e a expansão. A próxima só começa quando a primeira já faz parte do dia.';
