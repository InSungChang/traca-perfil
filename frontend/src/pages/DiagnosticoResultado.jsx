import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft, Star, AlertTriangle, BarChart3, Target,
  ChevronRight, RefreshCw, Compass, Building2, Users, Sparkles
} from 'lucide-react'

function PlanCard({ period, actions, color }) {
  const styles = {
    '30': { border: 'border-brand-500/30', bg: 'bg-brand-500/5', label: 'text-brand-400', dot: 'bg-brand-400' },
    '60': { border: 'border-indigo-500/30', bg: 'bg-indigo-500/5', label: 'text-indigo-400', dot: 'bg-indigo-400' },
    '90': { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', label: 'text-emerald-400', dot: 'bg-emerald-400' },
  }
  const s = styles[period]
  return (
    <div className={`rounded-2xl border p-6 ${s.border} ${s.bg}`}>
      <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${s.label}`}>
        {period} dias
      </p>
      <ul className="flex flex-col gap-3">
        {(actions || []).map((action, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-ink-300 leading-relaxed">
            <div className={`w-1.5 h-1.5 rounded-full ${s.dot} mt-1.5 shrink-0`} />
            {action}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DiagnosticoResultado() {
  const navigate = useNavigate()
  const location = useLocation()

  const { resultado, nome } = location.state || {}

  useEffect(() => {
    if (!resultado) {
      navigate('/diagnostico', { replace: true })
    }
  }, [resultado, navigate])

  if (!resultado) return null

  const {
    perfil_geral,
    estilo_dominante,
    pontos_fortes = [],
    riscos_ou_pontos_de_atencao = [],
    perfil_corporativo,
    estilo_lideranca,
    cruzamento_perfil_empresa,
    analise_talentos,
    plano_30_dias = [],
    plano_60_dias = [],
    plano_90_dias = [],
  } = resultado

  const nomeExibido = nome ? nome : 'do Mentorado'

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Header */}
      {/* Cabeçalho de impressão — visível só no PDF */}
      <div className="print-only hidden px-8 pt-8 pb-4 border-b border-gray-200 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Compass size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-ink-900">
              Traça<span className="text-brand-400">Perfil</span>
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-500 uppercase tracking-wide">Diagnóstico de Mentor</p>
            <p className="text-xs text-ink-400">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      <header className="print-hidden sticky top-0 z-40 bg-ink-950/95 backdrop-blur border-b border-white/6">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/diagnostico')}
            className="flex items-center gap-2 text-ink-400 hover:text-ink-200 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Novo diagnóstico
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center">
              <Compass size={12} className="text-ink-950" />
            </div>
            <span className="font-display font-semibold text-ink-200 text-sm">
              Traça<span className="text-brand-400">Perfil</span>
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-ink-400 hover:text-ink-200 transition-colors text-sm border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
          >
            <Sparkles size={13} />
            Baixar PDF
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        {/* Hero do resultado */}
        <div
          className="result-hero rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(228,157,56,0.12) 0%, rgba(26,31,46,0.95) 60%)',
            border: '1px solid rgba(228,157,56,0.15)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(228,157,56,0.1) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Diagnóstico de Mentor — Perfil {nomeExibido}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-50 mb-6 leading-tight">
              {estilo_dominante}
            </h1>
            <div className="prose prose-invert max-w-none">
              {(perfil_geral || '').split('\n').map((p, i) => (
                <p key={i} className="text-ink-300 leading-relaxed text-base mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Pontos fortes + Riscos */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-brand-500/15 border border-brand-500/20">
                <Star size={16} className="text-brand-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Pontos Fortes</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {pontos_fortes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-300 leading-relaxed">
                  <ChevronRight size={14} className="text-brand-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-orange-500/15 border border-orange-500/20">
                <AlertTriangle size={16} className="text-orange-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Pontos de Atenção</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {riscos_ou_pontos_de_atencao.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-300 leading-relaxed">
                  <ChevronRight size={14} className="text-orange-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Perfil corporativo + Liderança */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                <BarChart3 size={16} className="text-indigo-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Perfil Corporativo</h2>
            </div>
            <p className="text-sm text-ink-300 leading-relaxed">{perfil_corporativo}</p>
          </div>

          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                <Target size={16} className="text-emerald-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Estilo de Liderança</h2>
            </div>
            <p className="text-sm text-ink-300 leading-relaxed">{estilo_lideranca}</p>
          </div>
        </div>

        {/* Cruzamento perfil × empresa */}
        {cruzamento_perfil_empresa && (
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/20">
                <Building2 size={16} className="text-purple-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Perfil × Empresa</h2>
            </div>
            {cruzamento_perfil_empresa.split('\n').map((p, i) => (
              <p key={i} className="text-sm text-ink-300 leading-relaxed mb-2 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Talentos CliftonStrengths */}
        {analise_talentos && (
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20">
                <Sparkles size={16} className="text-amber-400" />
              </div>
              <h2 className="font-semibold text-ink-100">Talentos CliftonStrengths</h2>
            </div>
            {analise_talentos.split('\n').map((p, i) => (
              <p key={i} className="text-sm text-ink-300 leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Plano de ação 30/60/90 */}
        <div className="print-page-break">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 rounded-xl bg-brand-500/15 border border-brand-500/20">
              <Users size={16} className="text-brand-400" />
            </div>
            <h2 className="font-semibold text-ink-100 text-lg">Plano de Ação</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <PlanCard period="30" actions={plano_30_dias} />
            <PlanCard period="60" actions={plano_60_dias} />
            <PlanCard period="90" actions={plano_90_dias} />
          </div>
        </div>

        {/* CTA */}
        <div className="print-hidden glass rounded-3xl p-8 text-center">
          <p className="text-ink-400 text-sm mb-4">
            Quer fazer o diagnóstico de outro mentorado?
          </p>
          <button
            onClick={() => navigate('/diagnostico/mentor')}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw size={15} />
            Novo diagnóstico
          </button>
        </div>
      </main>
    </div>
  )
}
