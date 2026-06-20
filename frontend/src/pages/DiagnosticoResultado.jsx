import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Compass, Sparkles, Link, Check } from 'lucide-react'
import ResultadoDisplay from '../components/ResultadoDisplay.jsx'

export default function DiagnosticoResultado() {
  const navigate = useNavigate()
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  const { resultado, nome, id } = location.state || {}

  useEffect(() => {
    if (!resultado) navigate('/diagnostico', { replace: true })
  }, [resultado, navigate])

  if (!resultado) return null

  const shareUrl = id ? `${window.location.origin}/resultado/${id}` : null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-ink-950">

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
            <p className="text-xs text-ink-400">
              {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Header de tela */}
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

          <div className="flex items-center gap-2">
            {shareUrl && (
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
                  copied
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                    : 'border-white/10 text-ink-400 hover:text-ink-200 hover:border-white/20'
                }`}
              >
                {copied ? <Check size={13} /> : <Link size={13} />}
                {copied ? 'Copiado!' : 'Copiar link'}
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-ink-400 hover:text-ink-200 transition-colors text-sm border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
            >
              <Sparkles size={13} />
              PDF
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ResultadoDisplay resultado={resultado} nome={nome} />

        {/* CTA */}
        <div className="print-hidden glass rounded-3xl p-8 text-center mt-8">
          {shareUrl && (
            <div className="mb-6 p-4 rounded-2xl bg-ink-800/60 border border-white/8">
              <p className="text-xs text-ink-500 mb-2 uppercase tracking-wider">Link compartilhável</p>
              <p className="text-sm text-ink-300 font-mono break-all">{shareUrl}</p>
              <button
                onClick={handleCopyLink}
                className={`mt-3 text-xs px-4 py-2 rounded-lg border transition-all ${
                  copied
                    ? 'border-emerald-500/40 text-emerald-400'
                    : 'border-white/10 text-ink-400 hover:text-ink-200'
                }`}
              >
                {copied ? '✓ Link copiado!' : 'Copiar link'}
              </button>
            </div>
          )}
          <p className="text-ink-400 text-sm mb-4">Quer fazer o diagnóstico de outro mentorado?</p>
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
