import { useState, useEffect } from 'react'
import {
  ArrowRight, Menu, X, Zap, Users, BookOpen,
  TrendingUp, Award, Compass, ChevronRight,
  CheckCircle2, Star, BarChart3, Target, Lightbulb
} from 'lucide-react'

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/8 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center pulse-glow">
            <Compass size={16} className="text-ink-950" />
          </div>
          <span className="font-display text-lg font-semibold text-ink-50 tracking-tight">
            Traça<span className="text-brand-400">Perfil</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Como funciona', href: '#como-funciona' },
            { label: 'Para quem', href: '#para-quem' },
            { label: 'O diagnóstico', href: '#diagnostico' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-ink-300 hover:text-ink-50 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/diagnostico"
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-ink-950 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Iniciar diagnóstico
            <ArrowRight size={15} />
          </a>
        </div>

        <button
          className="md:hidden text-ink-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/8 mt-3 px-6 py-4 flex flex-col gap-4">
          {[
            { label: 'Como funciona', href: '#como-funciona' },
            { label: 'Para quem', href: '#para-quem' },
            { label: 'O diagnóstico', href: '#diagnostico' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-ink-300"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="/diagnostico"
            className="flex items-center justify-center gap-2 bg-brand-500 text-ink-950 font-semibold text-sm px-5 py-3 rounded-xl"
          >
            Iniciar diagnóstico <ArrowRight size={15} />
          </a>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(228,157,56,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-xs font-medium text-brand-300 uppercase tracking-widest">
          <Zap size={12} className="text-brand-400" />
          Diagnóstico com inteligência artificial
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6">
          <span className="text-ink-50">Descubra quem você</span>
          <br />
          <span className="gradient-text italic">realmente é.</span>
        </h1>

        <p className="text-ink-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Um diagnóstico integrado que revela seus <strong className="text-ink-100">pontos fortes</strong>,
          seu <strong className="text-ink-100">perfil corporativo</strong> e seu{' '}
          <strong className="text-ink-100">estilo de liderança</strong> — tudo em um só lugar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/diagnostico"
            className="flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-base px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 pulse-glow"
          >
            Começar agora — é grátis
            <ArrowRight size={18} />
          </a>
          <a
            href="#como-funciona"
            className="flex items-center gap-2 text-ink-300 hover:text-ink-100 text-sm transition-colors"
          >
            Ver como funciona <ChevronRight size={16} />
          </a>
        </div>

        {/* Preview cards */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {[
            { icon: Star, label: 'Pontos Fortes', color: 'text-brand-400' },
            { icon: BarChart3, label: 'Perfil Corporativo', color: 'text-indigo-400' },
            { icon: Target, label: 'Perfil de Líder', color: 'text-emerald-400' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="glass rounded-2xl p-4 float-anim" style={{ animationDelay: Math.random() * 2 + 's' }}>
              <Icon size={20} className={`${color} mb-2 mx-auto`} />
              <p className="text-xs text-ink-300 text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── O que diagnosticamos ─────────────────────────────────────────────────────

function WhatWeDiagnose() {
  const dimensions = [
    {
      icon: Star,
      color: 'bg-brand-500/15 text-brand-400 border-brand-500/20',
      tag: 'Dimensão 1',
      title: 'Pontos Fortes',
      description:
        'Identifica seus talentos naturais dominantes organizados em quatro domínios: execução, influência, relacionamento e pensamento estratégico.',
      items: ['Talentos dominantes', 'Domínio de atuação natural', 'Potencial de desenvolvimento'],
    },
    {
      icon: BarChart3,
      color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
      tag: 'Dimensão 2',
      title: 'Perfil Corporativo',
      description:
        'Mapeia seu estilo de atuação dentro de organizações entre oito perfis: executor, gestor, comercial, técnico, estratégico, criativo, relacional e analítico.',
      items: ['Estilo corporativo dominante', 'Pontos de atenção', 'Fit com áreas da empresa'],
    },
    {
      icon: Target,
      color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      tag: 'Dimensão 3',
      title: 'Perfil de Líder',
      description:
        'Revela seu estilo natural de liderança — diretivo, coach, democrático, visionário ou afiliativo — com riscos e pontos de evolução.',
      items: ['Estilo de liderança', 'Riscos do perfil', 'Plano de evolução'],
    },
  ]

  return (
    <section id="diagnostico" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            O que o diagnóstico revela
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-4">
            Três dimensões. Uma visão completa.
          </h2>
          <p className="text-ink-400 text-lg max-w-xl mx-auto">
            Enquanto outras ferramentas olham para uma dimensão por vez, o Traça Perfil
            cruza os três diagnósticos para revelar quem você é de verdade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dimensions.map(({ icon: Icon, color, tag, title, description, items }) => (
            <div
              key={title}
              className="glass rounded-3xl p-8 flex flex-col gap-6 hover:glass-light transition-all group"
            >
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-widest mb-4">{tag}</p>
                <div className={`inline-flex p-3 rounded-2xl border mb-4 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink-50 mb-3">{title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{description}</p>
              </div>
              <ul className="flex flex-col gap-2 mt-auto">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink-300">
                    <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Para quem é ─────────────────────────────────────────────────────────────

function ForWhom() {
  const audiences = [
    {
      icon: Users,
      number: '01',
      title: 'Profissionais corporativos',
      subtitle: 'Entenda seu lugar na organização',
      description:
        'Para quem quer sair do piloto automático e entender onde realmente brilha dentro de uma empresa — e onde está deixando pontos fortes na gaveta.',
      benefits: [
        'Clareza sobre seu estilo de trabalho',
        'Identificação de talentos subutilizados',
        'Plano de ação para crescimento interno',
      ],
    },
    {
      icon: BookOpen,
      number: '02',
      title: 'Mentores e coaches',
      subtitle: 'Diagnóstico para seus mentorados',
      description:
        'Para mentores que ainda dependem de intuição e conversas longas para mapear o perfil de quem mentoram. Agora você tem um relatório estruturado em minutos.',
      benefits: [
        'Diagnóstico do mentorado em 15 minutos',
        'Cruzamento perfil × necessidade da empresa',
        'PDI 30/60/90 dias gerado automaticamente',
      ],
    },
    {
      icon: Compass,
      number: '03',
      title: 'Adolescentes no vestibular',
      subtitle: 'Encontre sua área antes de escolher o curso',
      description:
        'Para adolescentes que escolhem faculdade por pressão externa. O diagnóstico revela aptidões naturais, interesses e o perfil de carreira que faz sentido para quem eles são.',
      benefits: [
        'Perfil de aptidões e interesses',
        'Áreas de carreira compatíveis',
        'Autoconhecimento antes da decisão',
      ],
    },
  ]

  return (
    <section id="para-quem" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(228,157,56,0.04) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Para quem é
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-4">
            Cada perfil tem sua jornada.
          </h2>
          <p className="text-ink-400 text-lg max-w-xl mx-auto">
            O diagnóstico se adapta ao público — perguntas, interpretação e output diferentes
            para cada realidade.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {audiences.map(({ icon: Icon, number, title, subtitle, description, benefits }, i) => (
            <div
              key={title}
              className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-5 gap-8 items-start hover:glass-light transition-all"
            >
              <div className="md:col-span-3">
                <div className="flex items-start gap-5 mb-5">
                  <div className="glass-light rounded-2xl p-3.5 shrink-0">
                    <Icon size={22} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-400 uppercase tracking-widest mb-1">{number}</p>
                    <h3 className="font-display text-2xl font-semibold text-ink-50">{title}</h3>
                    <p className="text-brand-400 text-sm font-medium mt-0.5">{subtitle}</p>
                  </div>
                </div>
                <p className="text-ink-400 leading-relaxed">{description}</p>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                    <CheckCircle2 size={15} className="text-brand-400 shrink-0" />
                    <span className="text-sm text-ink-200">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Como funciona ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '1',
      icon: Users,
      title: 'Escolha seu perfil',
      desc: 'Selecione se você é profissional, mentor ou adolescente. O diagnóstico se adapta.',
    },
    {
      n: '2',
      icon: Lightbulb,
      title: 'Responda o questionário',
      desc: 'Perguntas em etapas simples — sem teste longo. Responda com honestidade, sem respostas certas ou erradas.',
    },
    {
      n: '3',
      icon: Zap,
      title: 'A IA processa tudo',
      desc: 'Inteligência artificial analisa suas respostas e cruza as três dimensões do diagnóstico.',
    },
    {
      n: '4',
      icon: TrendingUp,
      title: 'Receba seu resultado',
      desc: 'Tela visual com seu perfil completo e plano de ação 30/60/90 dias personalizado.',
    },
  ]

  return (
    <section id="como-funciona" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Como funciona
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-6 leading-tight">
              Do zero ao diagnóstico em menos de 15 minutos.
            </h2>
            <p className="text-ink-400 leading-relaxed mb-8">
              Não é um teste demorado e genérico. É um fluxo estruturado que coleta o que importa
              e entrega um resultado acionável — não um PDF esquecido na pasta de downloads.
            </p>
            <a
              href="/diagnostico"
              className="inline-flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Fazer meu diagnóstico <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map(({ n, icon: Icon, title, desc }, i) => (
              <div key={n} className="flex gap-5 items-start relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-5 top-10 w-px h-full"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(228,157,56,0.3), transparent)',
                    }}
                  />
                )}
                <div className="w-10 h-10 rounded-xl glass-light flex items-center justify-center shrink-0 text-brand-400 font-bold text-sm z-10">
                  {n}
                </div>
                <div className="pb-6">
                  <h4 className="font-semibold text-ink-100 mb-1">{title}</h4>
                  <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Output preview ───────────────────────────────────────────────────────────

function OutputPreview() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            O resultado
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-4">
            Não é só um relatório.
            <br />
            <span className="gradient-text italic">É um plano.</span>
          </h2>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
          {/* Left: Profile summary mock */}
          <div className="flex flex-col gap-5">
            <div className="glass-light rounded-2xl p-6">
              <p className="text-xs text-ink-400 uppercase tracking-wider mb-3">Perfil geral</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <Star size={18} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-ink-100 font-semibold">Executor Estratégico</p>
                  <p className="text-ink-400 text-xs">Perfil corporativo dominante</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Achiever', 'Strategic', 'Responsibility', 'Focus'].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-light rounded-2xl p-5">
                <p className="text-xs text-ink-400 mb-2">Pontos fortes</p>
                {['Execução com foco', 'Visão sistêmica', 'Alta entrega'].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs text-ink-200 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {p}
                  </div>
                ))}
              </div>
              <div className="glass-light rounded-2xl p-5">
                <p className="text-xs text-ink-400 mb-2">Atenção</p>
                {['Delegar tarefas', 'Escuta ativa', 'Pausas estratégicas'].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs text-ink-300 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Action plan mock */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-ink-400 uppercase tracking-wider">Plano de ação</p>
            {[
              {
                period: '30 dias',
                color: 'border-brand-500/30 bg-brand-500/5',
                label: 'text-brand-400',
                actions: ['Mapear projetos onde seu perfil executor agrega', 'Conversar com liderança sobre expectativas'],
              },
              {
                period: '60 dias',
                color: 'border-indigo-500/30 bg-indigo-500/5',
                label: 'text-indigo-400',
                actions: ['Assumir um projeto de liderança lateral', 'Desenvolver escuta ativa com o time'],
              },
              {
                period: '90 dias',
                color: 'border-emerald-500/30 bg-emerald-500/5',
                label: 'text-emerald-400',
                actions: ['Revisão de resultados e calibração do PDI', 'Apresentar aprendizados para o mentor'],
              },
            ].map(({ period, color, label, actions }) => (
              <div key={period} className={`rounded-2xl border p-5 ${color}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${label}`}>
                  {period}
                </p>
                {actions.map((a) => (
                  <div key={a} className="flex items-start gap-2 text-sm text-ink-300 mb-2">
                    <ChevronRight size={14} className="text-ink-500 mt-0.5 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Final ────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="glass rounded-3xl px-10 py-16 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(228,157,56,0.08) 0%, rgba(10,13,20,0.8) 50%, rgba(99,102,241,0.06) 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(228,157,56,0.12) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <Award size={40} className="text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-5 leading-tight">
              Você já sabe que{' '}
              <span className="gradient-text italic">algo está faltando.</span>
            </h2>
            <p className="text-ink-400 text-lg leading-relaxed mb-10">
              A maioria das pessoas trabalha anos sem entender por que algumas coisas fluem e
              outras drenam. O diagnóstico existe para mudar isso — em 15 minutos.
            </p>
            <a
              href="/diagnostico"
              className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-base px-10 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 pulse-glow"
            >
              Fazer meu diagnóstico agora
              <ArrowRight size={18} />
            </a>
            <p className="text-ink-500 text-sm mt-5">
              Sem cadastro. Sem cartão. Resultado em menos de 15 minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/6 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center">
            <Compass size={12} className="text-ink-950" />
          </div>
          <span className="font-display text-sm font-semibold text-ink-300">
            Traça<span className="text-brand-400">Perfil</span>
          </span>
        </div>
        <p className="text-ink-500 text-xs">
          © {new Date().getFullYear()} TraçaPerfil. Diagnóstico com inteligência artificial.
        </p>
        <div className="flex items-center gap-5 text-xs text-ink-500">
          <a href="#" className="hover:text-ink-300 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-ink-300 transition-colors">Termos</a>
          <a href="#" className="hover:text-ink-300 transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero />
        <WhatWeDiagnose />
        <ForWhom />
        <HowItWorks />
        <OutputPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
