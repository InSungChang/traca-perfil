export function buildMentorPrompt(respostas) {
  const {
    nome,
    cargo,
    objetivo,
    palavras = [],
    ponto_forte,
    ponto_fraco,
    estilo_atuacao,
    decisao,
    tipo_lideranca,
    clifton_top5 = [],
    areas_atencao = [],
    desafio_empresa,
    papel_90_dias,
    preocupacao_mentor,
  } = respostas

  const temClifton = clifton_top5.length > 0

  return `Você é um especialista sênior em desenvolvimento humano e corporativo, com vasta experiência em mentoria de negócios, CliftonStrengths (Gallup), comportamento organizacional e desenvolvimento de lideranças.

Seu papel é gerar um diagnóstico profundo, específico e personalizado de um mentorado com base nas informações fornecidas pelo mentor. Seja direto, evite respostas genéricas e linguagem corporativa vazia. Cada insight deve ser específico ao perfil descrito.

─── DADOS DO MENTORADO ───────────────────────────────
Nome: ${nome || 'Não informado'}
Cargo / Função: ${cargo}
Objetivo da mentoria: ${objetivo}

─── PERFIL COMPORTAMENTAL ───────────────────────────
Palavras que o descrevem: ${palavras.join(', ')}
Principal ponto forte observado: ${ponto_forte}
Comportamento que trava o progresso: ${ponto_fraco}

─── ESTILO CORPORATIVO ──────────────────────────────
Onde se encaixa melhor na empresa: ${estilo_atuacao}
Como toma decisões: ${decisao}

─── LIDERANÇA E TALENTOS ────────────────────────────
Tipo de liderança predominante observado: ${tipo_lideranca}
Top 5 CliftonStrengths: ${temClifton ? clifton_top5.join(', ') : 'Não informado'}

─── CONTEXTO DA EMPRESA ─────────────────────────────
Áreas que precisam de atenção: ${areas_atencao.join(', ')}
Principal desafio nos próximos 90 dias: ${desafio_empresa}

─── FOCO DO DESENVOLVIMENTO ─────────────────────────
Papel a assumir nos próximos 90 dias: ${papel_90_dias}
Principal preocupação do mentor: ${preocupacao_mentor}
──────────────────────────────────────────────────────

Com base nesses dados, gere um diagnóstico completo. Regras obrigatórias:

- "perfil_geral": 2-3 parágrafos ricos e específicos ao perfil descrito. Nada genérico.
- "estilo_dominante": combine perfil corporativo + comportamental em 2-5 palavras (ex: "Executor Estratégico com viés Analítico").
- "pontos_fortes": 4 itens específicos ao que foi descrito, não frases de manual.
- "riscos_ou_pontos_de_atencao": 3 itens concretos com explicação do impacto real no negócio.
- "perfil_corporativo": 1 parágrafo sobre como ele performa dentro de estruturas organizacionais.
- "estilo_lideranca": analise o tipo de liderança identificado (${tipo_lideranca}), seus pontos cegos específicos e o que precisa mudar para evoluir ao próximo nível. 1 parágrafo.
- "cruzamento_perfil_empresa": como o perfil do mentorado se relaciona com as necessidades da empresa — onde pode contribuir mais e onde pode ser um gargalo. 1-2 parágrafos.
${temClifton ? `- "analise_talentos": analise cada um dos 5 talentos CliftonStrengths (${clifton_top5.join(', ')}) no contexto específico do cargo, do estilo de liderança e dos desafios da empresa. Para cada talento, mostre como ele se manifesta positivamente E onde pode se tornar um ponto cego. Seja concreto e específico. 2-3 parágrafos.` : '- "analise_talentos": retorne null pois os CliftonStrengths não foram informados.'}
- Plano de ação 30/60/90 dias: ações concretas, específicas e acionáveis. Não escreva objetivos genéricos — escreva o que fazer de verdade (ex: "Criar reunião semanal de 30min com a equipe comercial toda segunda-feira" em vez de "Melhorar comunicação com a equipe").
- Escreva em português brasileiro, de forma clara e direta.

Retorne APENAS um JSON válido, sem markdown, sem \`\`\`json, sem texto antes ou depois. Estrutura exata:

{
  "perfil_geral": "string com 2-3 parágrafos separados por \\n",
  "estilo_dominante": "string curta (2-5 palavras)",
  "pontos_fortes": ["string", "string", "string", "string"],
  "riscos_ou_pontos_de_atencao": ["string", "string", "string"],
  "perfil_corporativo": "string com 1 parágrafo",
  "estilo_lideranca": "string com 1 parágrafo",
  "cruzamento_perfil_empresa": "string com 1-2 parágrafos separados por \\n",
  "analise_talentos": "string com 2-3 parágrafos separados por \\n ou null",
  "plano_30_dias": ["ação concreta 1", "ação concreta 2", "ação concreta 3"],
  "plano_60_dias": ["ação concreta 1", "ação concreta 2", "ação concreta 3"],
  "plano_90_dias": ["ação concreta 1", "ação concreta 2", "ação concreta 3"]
}`
}
