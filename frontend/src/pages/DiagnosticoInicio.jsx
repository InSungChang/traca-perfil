import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Users, Compass, Lock } from 'lucide-react'

const perfis = [
  {
    id: 'mentor',
    icon: BookOpen,
    label: 'Sou mentor',
    titulo: 'Diagnóstico do mentorado',
    descricao: 'Mapeie o perfil completo do seu mentorado e gere um PDI 30/60/90 dias personalizado.',
    beneficios: ['Perfil comportamental', 'Estilo corporativo e de liderança', 'Cruzamento perfil × empresa', 'Plano de ação 30/60/90 dias'],
    ativo: true,
    rota: '/diagnostico/mentor',
    cor: 'brand',
  },
  {
    id: 'corporativo',
    icon: Users,
    label: 'Sou profissional',
    titulo: 'Diagnóstico corporativo',
    descricao: 'Entenda onde você se encaixa melhor, seus talentos dominantes e como crescer dentro da empresa.',
    beneficios: ['Pontos fortes e talentos', 'Perfil de atuação corporativa', 'Estilo de liderança', 'Plano de desenvolvimento'],
    ativo: false,
    rota: null,
    cor: 'indigo',
  },
  {
    id: 'adolescente',
    icon: Compass,
    label: 'Sou adolescente',
    titulo: 'Orientação de carreira',
    descricao: 'Descubra suas aptidões naturais e as áreas de carreira mais compatíveis com quem você é.',
    beneficios: ['Perfil de aptidões', 'Áreas de carreira compatíveis', 'Interesses e talentos', 'Próximos passos'],
    ativo: false,
    rota: null,
    cor: 'emerald',
  },
]

export default function DiagnosticoInicio() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-ink-400 hover:text-ink-200 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <Compass size={14} className="text-ink-950" />
          </div>
          <span className="font-display font-semibold text-ink-100 text-base">
            Traça<span className="text-brand-400">Perfil</span>
          </span>
        </div>
        <div className="w-20" />
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Passo 1 de 1
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-4">
              Qual é o seu perfil?
            </h1>
            <p className="text-ink-400 text-lg max-w-xl mx-auto">
              O diagnóstico se adapta ao seu contexto — perguntas, interpretação
              e resultado diferentes para cada realidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {perfis.map(({ id, icon: Icon, label, titulo, descricao, beneficios, ativo, rota, cor }) => (
              <div
                key={id}
                className={`
                  relative rounded-3xl border p-7 flex flex-col gap-5 transition-all
                  ${ativo
                    ? 'glass-light border-white/12 cursor-pointer hover:border-brand-400/40 hover:scale-[1.02]'
                    : 'glass border-white/6 opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={() => ativo && rota && navigate(rota)}
              >
                {!ativo && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-ink-700 rounded-full px-2.5 py-1">
                    <Lock size={10} className="text-ink-400" />
                    <span className="text-xs text-ink-400">Em breve</span>
                  </div>
                )}

                <div>
                  <p className="text-xs text-ink-500 uppercase tracking-wider mb-4">{label}</p>
                  <div className={`
                    inline-flex p-3 rounded-2xl border mb-4
                    ${cor === 'brand' ? 'bg-brand-500/15 text-brand-400 border-brand-500/20' : ''}
                    ${cor === 'indigo' ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' : ''}
                    ${cor === 'emerald' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : ''}
                  `}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink-50 mb-2">{titulo}</h3>
                  <p className="text-sm text-ink-400 leading-relaxed">{descricao}</p>
                </div>

                <ul className="flex flex-col gap-2 mt-auto">
                  {beneficios.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-ink-300">
                      <div className={`
                        w-1.5 h-1.5 rounded-full shrink-0
                        ${cor === 'brand' ? 'bg-brand-400' : ''}
                        ${cor === 'indigo' ? 'bg-indigo-400' : ''}
                        ${cor === 'emerald' ? 'bg-emerald-400' : ''}
                      `} />
                      {b}
                    </li>
                  ))}
                </ul>

                {ativo && (
                  <div className="flex items-center gap-2 text-brand-400 text-sm font-medium mt-1">
                    Iniciar diagnóstico
                    <ArrowRight size={15} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
