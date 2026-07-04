export const quizPerguntas = [
  {
    id: 'q1',
    label: 'Quando um projeto novo começa, você...',
    options: [
      { value: 'executor', texto: 'Já parte para a ação e quer ver resultado andando logo' },
      { value: 'gestor', texto: 'Organiza quem faz o quê e acompanha de perto' },
      { value: 'comercial', texto: 'Pensa em como apresentar e vender a ideia pra quem precisa aprovar' },
      { value: 'tecnico', texto: 'Foca em entender a fundo os detalhes técnicos antes de agir' },
      { value: 'estrategico', texto: 'Pensa no impacto de longo prazo e no posicionamento' },
      { value: 'criativo', texto: 'Busca formas diferentes e inovadoras de resolver o problema' },
      { value: 'relacional', texto: 'Se preocupa em alinhar e engajar todo mundo envolvido' },
      { value: 'analitico', texto: 'Levanta dados e números antes de qualquer decisão' },
    ],
  },
  {
    id: 'q2',
    label: 'Numa reunião de equipe, você costuma...',
    options: [
      { value: 'executor', texto: 'Cobrar prazos e resultados concretos' },
      { value: 'gestor', texto: 'Distribuir tarefas e garantir que tudo ande organizado' },
      { value: 'comercial', texto: 'Defender ideias com entusiasmo e convencer os outros' },
      { value: 'tecnico', texto: 'Entrar em detalhes técnicos que os outros não percebem' },
      { value: 'estrategico', texto: 'Trazer a visão de onde isso tudo deve chegar' },
      { value: 'criativo', texto: 'Propor ideias fora da caixa' },
      { value: 'relacional', texto: 'Garantir que todos sejam ouvidos e se sintam bem' },
      { value: 'analitico', texto: 'Questionar dados e pedir mais informações antes de concluir' },
    ],
  },
  {
    id: 'q3',
    label: 'O que mais te dá satisfação no trabalho?',
    options: [
      { value: 'executor', texto: 'Ver uma tarefa sendo entregue e concluída' },
      { value: 'gestor', texto: 'Ver a equipe funcionando bem, organizada' },
      { value: 'comercial', texto: 'Fechar um negócio ou conquistar alguém pra uma ideia' },
      { value: 'tecnico', texto: 'Dominar completamente um assunto ou ferramenta' },
      { value: 'estrategico', texto: 'Enxergar oportunidades que ninguém tinha visto' },
      { value: 'criativo', texto: 'Criar algo novo do zero' },
      { value: 'relacional', texto: 'Ajudar e desenvolver as pessoas ao redor' },
      { value: 'analitico', texto: 'Encontrar um padrão ou erro que ninguém tinha notado' },
    ],
  },
  {
    id: 'q4',
    label: 'Diante de um problema inesperado, você...',
    options: [
      { value: 'executor', texto: 'Resolve na hora, sem enrolar' },
      { value: 'gestor', texto: 'Reorganiza a equipe e os processos pra dar conta' },
      { value: 'comercial', texto: 'Busca alguém ou algo que ajude a contornar rápido' },
      { value: 'tecnico', texto: 'Investiga a causa raiz com calma e profundidade' },
      { value: 'estrategico', texto: 'Pensa em como evitar que aconteça de novo no futuro' },
      { value: 'criativo', texto: 'Tenta uma solução não óbvia' },
      { value: 'relacional', texto: 'Conversa com os envolvidos pra entender todos os lados' },
      { value: 'analitico', texto: 'Junta dados pra entender exatamente o que aconteceu' },
    ],
  },
  {
    id: 'q5',
    label: 'O que os colegas mais elogiam em você?',
    options: [
      { value: 'executor', texto: 'Minha capacidade de fazer as coisas acontecerem' },
      { value: 'gestor', texto: 'Minha organização e capacidade de liderar' },
      { value: 'comercial', texto: 'Meu jeito de convencer e negociar' },
      { value: 'tecnico', texto: 'Meu conhecimento técnico' },
      { value: 'estrategico', texto: 'Minha visão de futuro' },
      { value: 'criativo', texto: 'Minha criatividade' },
      { value: 'relacional', texto: 'Minha capacidade de me conectar com as pessoas' },
      { value: 'analitico', texto: 'Minha atenção aos detalhes e dados' },
    ],
  },
  {
    id: 'q6',
    label: 'No seu dia ideal de trabalho, você passaria mais tempo...',
    options: [
      { value: 'executor', texto: 'Executando e entregando tarefas' },
      { value: 'gestor', texto: 'Coordenando pessoas e processos' },
      { value: 'comercial', texto: 'Conversando com clientes ou parceiros' },
      { value: 'tecnico', texto: 'Aprofundando conhecimento técnico' },
      { value: 'estrategico', texto: 'Planejando o futuro do negócio' },
      { value: 'criativo', texto: 'Criando e experimentando ideias novas' },
      { value: 'relacional', texto: 'Desenvolvendo e apoiando pessoas' },
      { value: 'analitico', texto: 'Analisando dados e relatórios' },
    ],
  },
]

export function calcularEstiloSugerido(respostas) {
  const contagem = {}
  for (const valor of Object.values(respostas)) {
    contagem[valor] = (contagem[valor] || 0) + 1
  }
  let melhor = null
  let maior = -1
  for (const [valor, qtd] of Object.entries(contagem)) {
    if (qtd > maior) {
      maior = qtd
      melhor = valor
    }
  }
  return melhor
}
