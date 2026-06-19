# Contexto do Projeto — App de Diagnóstico Personalizado

## Visão Geral

Estou desenvolvendo um produto SaaS de diagnóstico individual com IA, que transforma uma metodologia de consultoria/mentoria manual em uma experiência de produto escalável. O usuário responde um questionário estruturado, a IA (Claude via API Anthropic) processa as respostas e gera um diagnóstico personalizado com plano de ação 30/60/90 dias.

O produto atende **3 perfis de usuário diferentes**, cada um com seu próprio questionário e modelo de output:

1. **Corporativo Geral** — profissionais querendo entender seu perfil de atuação, pontos fortes e áreas de desenvolvimento dentro da empresa.
2. **Mentores** — mentores de negócios que aplicam o diagnóstico em seus mentorados, recebendo um relatório que cruza perfil comportamental do mentorado + diagnóstico da empresa dele + plano de desenvolvimento.
3. **Adolescentes (Vestibular)** — adolescentes em fase de escolha de carreira, recebendo indicação de área de atuação baseada em perfil, interesses e aptidões.

## Fase atual do projeto

Estamos construindo o **MVP**: validar a experiência completa de diagnóstico com qualidade, antes de adicionar login, histórico, dashboard, etc.

## Arquitetura

```
Frontend (React + Tailwind)
        ↓
Backend (Node.js + Express)
        ↓
API do Claude (Anthropic) — gera o diagnóstico
        ↓
Resposta estruturada em JSON → exibida na tela de resultado
```

**Stack definida:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- IA: Claude via API Anthropic (modelo `claude-sonnet-4-6`)
- Banco de dados: Supabase (fase 2, não MVP)
- Hospedagem: Vercel (frontend) + Railway (backend)

**Regra crítica de segurança:** a API key da Anthropic nunca pode ser exposta no frontend. Toda chamada à API do Claude passa pelo backend.

## Fluxo do produto (MVP)

1. Usuário escolhe seu perfil (Corporativo / Mentor / Adolescente)
2. Responde questionário em etapas (telas sequenciais, não tudo de uma vez)
3. Tela de carregamento enquanto a IA processa (5-15 segundos)
4. Tela de resultado visual: perfil, pontos fortes, riscos, plano 30/60/90 dias

## Estrutura de cada diagnóstico gerado pela IA

O Claude deve retornar um JSON estruturado contendo:
- `perfil_geral` (resumo em texto)
- `pontos_fortes` (lista)
- `riscos_ou_pontos_de_atencao` (lista)
- `area_ou_estilo_dominante` (texto — varia por perfil: estilo de liderança, área de atuação, perfil corporativo)
- `plano_30_dias` (lista de ações)
- `plano_60_dias` (lista de ações)
- `plano_90_dias` (lista de ações)

Cada perfil (Corporativo, Mentor, Adolescente) tem seu próprio prompt-base com instruções específicas de como interpretar as respostas daquele público, mas todos seguem essa mesma estrutura de output para reaproveitar o componente visual de resultado no frontend.

## Metodologia de referência (para o perfil Mentor)

O perfil de Mentor é baseado em uma metodologia já validada manualmente, com as seguintes etapas:
1. Formulário de objetivos e desafios do mentorado
2. Diagnóstico de perfil comportamental (forças, riscos)
3. Diagnóstico de perfil corporativo (executor, gestor, comercial, técnico, estratégico, criativo, relacional, analítico)
4. Diagnóstico de estilo de liderança
5. Diagnóstico da empresa por áreas (gestão, comercial, marketing, atendimento, financeiro, processos, equipe)
6. Cruzamento entre perfil do mentorado e necessidade da empresa
7. Plano de desenvolvimento individual (PDI) 30/60/90 dias

Esse é o perfil com metodologia mais madura e deve servir de referência de profundidade para os outros dois.

## Prioridade de desenvolvimento

Começar pelo perfil **Mentor**, por ter metodologia mais validada e mercado mais próximo de compra imediata. Os perfis Corporativo e Adolescente devem reutilizar a mesma arquitetura técnica, trocando apenas: perguntas do questionário, prompt de interpretação enviado ao Claude, e rótulos da tela de resultado.

## O que preciso de você (Claude Code) nesta sessão

[Descreva aqui a tarefa específica desta sessão — ex: "Criar a estrutura inicial do projeto com as 4 telas do fluxo para o perfil Mentor" ou "Implementar a rota /diagnostico no backend que chama a API do Claude" ou "Criar o componente de tela de resultado reutilizável para os 3 perfis"]