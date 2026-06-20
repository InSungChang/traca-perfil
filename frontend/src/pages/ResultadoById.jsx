import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Compass, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import ResultadoDisplay from '../components/ResultadoDisplay.jsx'

export default function ResultadoById() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resultado, setResultado] = useState(null)
  const [nome, setNome] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/diagnostico/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not_found')
        return res.json()
      })
      .then((data) => {
        setResultado(data.resultado)
        setNome(data.nome)
      })
      .catch((err) => {
        setError(err.message === 'not_found' ? 'Diagnóstico não encontrado.' : 'Erro ao carregar. Tente novamente.')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="text-brand-400 animate-spin mx-auto mb-4" />
          <p className="text-ink-400 text-sm">Carregando diagnóstico...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 inline-flex mb-6">
            <AlertCircle size={28} className="text-red-400" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink-50 mb-3">{error}</h1>
          <p className="text-ink-400 text-sm mb-6">
            O link pode estar incorreto ou o diagnóstico foi removido.
          </p>
          <button
            onClick={() => navigate('/diagnostico')}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-sm px-6 py-3 rounded-xl transition-all"
          >
            <RefreshCw size={15} />
            Criar novo diagnóstico
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <header className="sticky top-0 z-40 bg-ink-950/95 backdrop-blur border-b border-white/6">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/diagnostico')}
            className="flex items-center gap-2 text-ink-400 hover:text-ink-200 transition-colors text-sm"
          >
            Criar novo
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
            className="text-ink-400 hover:text-ink-200 transition-colors text-sm border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
          >
            PDF
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <ResultadoDisplay resultado={resultado} nome={nome} />
      </main>
    </div>
  )
}
