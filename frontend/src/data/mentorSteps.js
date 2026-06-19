export const mentorSteps = [
  {
    id: 'identificacao',
    title: 'Sobre o mentorado',
    subtitle: 'Vamos começar com o contexto básico para personalizar o diagnóstico.',
    questions: [
      {
        id: 'nome',
        type: 'text',
        label: 'Como se chama o mentorado?',
        placeholder: 'Nome (opcional)',
        required: false,
      },
      {
        id: 'cargo',
        type: 'text',
        label: 'Qual é o cargo ou função atual?',
        placeholder: 'Ex: Gerente Comercial, CEO, Analista de Marketing...',
        required: true,
      },
      {
        id: 'objetivo',
        type: 'textarea',
        label: 'Qual é o principal objetivo desta mentoria?',
        placeholder: 'Ex: estruturar a empresa para crescimento, desenvolver liderança, aumentar vendas...',
        required: true,
      },
    ],
  },
  {
    id: 'comportamento',
    title: 'Perfil comportamental',
    subtitle: 'Como você observa o mentorado na prática — não no ideal.',
    questions: [
      {
        id: 'palavras',
        type: 'multi-select',
        label: 'Selecione até 4 palavras que melhor descrevem seu mentorado:',
        options: [
          'Executor', 'Criativo', 'Analítico', 'Relacional',
          'Estratégico', 'Comunicador', 'Técnico', 'Visionário',
          'Detalhista', 'Impulsivo', 'Colaborativo', 'Independente',
        ],
        max: 4,
        required: true,
      },
      {
        id: 'ponto_forte',
        type: 'textarea',
        label: 'Qual é o maior ponto forte que você já observou nele?',
        placeholder: 'Descreva uma característica ou situação concreta...',
        required: true,
      },
      {
        id: 'ponto_fraco',
        type: 'textarea',
        label: 'Qual comportamento costuma travar o progresso dele?',
        placeholder: 'Seja honesto — isso vai gerar um plano de desenvolvimento mais preciso...',
        required: true,
      },
    ],
  },
  {
    id: 'corporativo',
    title: 'Estilo corporativo',
    subtitle: 'Como ele funciona dentro de uma estrutura organizacional?',
    questions: [
      {
        id: 'estilo_atuacao',
        type: 'single-select',
        label: 'Onde ele se encaixa melhor dentro de uma empresa?',
        options: [
          { value: 'executor', label: 'Executor', desc: 'Faz acontecer, entrega resultados' },
          { value: 'gestor', label: 'Gestor', desc: 'Organiza, coordena, lidera equipes' },
          { value: 'comercial', label: 'Comercial', desc: 'Vende, negocia, abre portas' },
          { value: 'tecnico', label: 'Técnico', desc: 'Especialista profundo no seu domínio' },
          { value: 'estrategico', label: 'Estratégico', desc: 'Pensa no futuro, planeja, posiciona' },
          { value: 'criativo', label: 'Criativo', desc: 'Inova, gera ideias, resolve diferente' },
          { value: 'relacional', label: 'Relacional', desc: 'Conecta pessoas, cria cultura, engaja' },
          { value: 'analitico', label: 'Analítico', desc: 'Dados, processos, qualidade, precisão' },
        ],
        required: true,
      },
      {
        id: 'decisao',
        type: 'single-select',
        label: 'Como ele toma decisões?',
        options: [
          { value: 'rapido_intuitivo', label: 'Rápido e intuitivo', desc: 'Age pela experiência e feeling' },
          { value: 'analitico_dados', label: 'Analítico', desc: 'Pesquisa e usa dados antes de decidir' },
          { value: 'colaborativo', label: 'Colaborativo', desc: 'Busca consenso com a equipe' },
          { value: 'conservador', label: 'Conservador', desc: 'Prefere o caminho conhecido e seguro' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'empresa',
    title: 'Contexto da empresa',
    subtitle: 'O diagnóstico cruza o perfil do mentorado com as necessidades reais do negócio.',
    questions: [
      {
        id: 'areas_atencao',
        type: 'multi-select',
        label: 'Quais áreas precisam de mais atenção agora? (até 3)',
        options: [
          'Gestão', 'Comercial', 'Marketing', 'Atendimento ao cliente',
          'Financeiro', 'Processos internos', 'Equipe / RH', 'Produto ou serviço',
        ],
        max: 3,
        required: true,
      },
      {
        id: 'desafio_empresa',
        type: 'textarea',
        label: 'Qual é o principal desafio da empresa nos próximos 90 dias?',
        placeholder: 'Ex: escalar vendas, reduzir custos, contratar e estruturar equipe, lançar produto...',
        required: true,
      },
    ],
  },
  {
    id: 'foco',
    title: 'Foco do desenvolvimento',
    subtitle: 'Último passo — isso calibra o plano de ação gerado pela IA.',
    questions: [
      {
        id: 'papel_90_dias',
        type: 'single-select',
        label: 'Qual papel o mentorado deve assumir nos próximos 90 dias?',
        options: [
          { value: 'executar', label: 'Executar mais', desc: 'Sair do planejamento e colocar em prática' },
          { value: 'liderar', label: 'Liderar melhor', desc: 'Desenvolver a equipe e aprender a delegar' },
          { value: 'crescer', label: 'Abrir mercado', desc: 'Focar em crescimento e novas oportunidades' },
          { value: 'estruturar', label: 'Estruturar', desc: 'Organizar processos para crescer com consistência' },
        ],
        required: true,
      },
      {
        id: 'preocupacao_mentor',
        type: 'textarea',
        label: 'Como mentor, qual é a sua principal preocupação com esse mentorado?',
        placeholder: 'Sua perspectiva vai enriquecer muito o diagnóstico...',
        required: true,
      },
    ],
  },
]
