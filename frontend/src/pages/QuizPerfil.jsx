import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Compass, CheckCircle2, Loader2 } from 'lucide-react'
import { quizPerguntas, calcularEstiloSugerido } from '../data/quizPerfil.js'
import { estiloAtuacaoOptions } from '../data/mentorSteps.js'

function TelaCentral({ children }) {
  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
        <Compass size={14} className="text-ink-950" />
      </div>
      <span className="font-display font-semibold text-ink-100 text-base">
        Traça<span className="text-brand-400">Perfil</span>
      </span>
    </div>
  )
}

export default function QuizPerfil() {
  const { id } = useParams()
  const [fase, setFase] = useState('carregando') // carregando | nao_encontrado | perguntas | resultado | enviando | obrigado | erro
  const [nomeMentorado, setNomeMentorado] = useState(null)
  const [perguntaIndex, setPerguntaIndex] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [estiloConfirmado, setEstiloConfirmado] = useState(null)
  const [mostrarTodos, setMostrarTodos] = useState(false)

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/${id}`)
        if (!resp.ok) {
          setFase('nao_encontrado')
          return
        }
        const data = await resp.json()
        setNomeMentorado(data.nome_mentorado)
        if (data.status === 'respondido') {
          setFase('ja_respondido')
        } else {
          setFase('perguntas')
        }
      } catch {
        setFase('erro')
      }
    }
    carregar()
  }, [id])

  const handleResponder = (valor) => {
    const pergunta = quizPerguntas[perguntaIndex]
    const novasRespostas = { ...respostas, [pergunta.id]: valor }
    setRespostas(novasRespostas)

    if (perguntaIndex < quizPerguntas.length - 1) {
      setPerguntaIndex((i) => i + 1)
    } else {
      const sugerido = calcularEstiloSugerido(novasRespostas)
      setEstiloConfirmado(sugerido)
      setFase('resultado')
    }
  }

  const handleConfirmar = async () => {
    setFase('enviando')
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/${id}/responder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respostas,
          estilo_sugerido: calcularEstiloSugerido(respostas),
          estilo_confirmado: estiloConfirmado,
        }),
      })
      if (!resp.ok && resp.status !== 409) {
        throw new Error('Erro ao enviar resposta')
      }
      setFase('obrigado')
    } catch {
      setFase('erro')
    }
  }

  if (fase === 'carregando') {
    return (
      <TelaCentral>
        <div className="flex justify-center">
          <Loader2 size={24} className="text-brand-400 animate-spin" />
        </div>
      </TelaCentral>
    )
  }

  if (fase === 'nao_encontrado') {
    return (
      <TelaCentral>
        <Logo />
        <div className="glass rounded-3xl p-8 text-center">
          <h1 className="font-display text-xl font-semibold text-ink-50 mb-2">Link não encontrado</h1>
          <p className="text-ink-400 text-sm">Verifique se o link está correto ou peça um novo ao seu mentor.</p>
        </div>
      </TelaCentral>
    )
  }

  if (fase === 'erro') {
    return (
      <TelaCentral>
        <Logo />
        <div className="glass rounded-3xl p-8 text-center">
          <h1 className="font-display text-xl font-semibold text-ink-50 mb-2">Não foi possível conectar</h1>
          <p className="text-ink-400 text-sm">Verifique sua conexão e tente novamente.</p>
        </div>
      </TelaCentral>
    )
  }

  if (fase === 'ja_respondido') {
    return (
      <TelaCentral>
        <Logo />
        <div className="glass rounded-3xl p-8 text-center">
          <CheckCircle2 size={28} className="text-brand-400 mx-auto mb-3" />
          <h1 className="font-display text-xl font-semibold text-ink-50 mb-2">Você já respondeu esse diagnóstico</h1>
          <p className="text-ink-400 text-sm">Obrigado! Seu mentor já tem acesso ao resultado.</p>
        </div>
      </TelaCentral>
    )
  }

  if (fase === 'obrigado') {
    return (
      <TelaCentral>
        <Logo />
        <div className="glass rounded-3xl p-8 text-center">
          <CheckCircle2 size={28} className="text-brand-400 mx-auto mb-3" />
          <h1 className="font-display text-xl font-semibold text-ink-50 mb-2">Resposta enviada!</h1>
          <p className="text-ink-400 text-sm">Pode fechar esta página — seu mentor já vai receber o resultado.</p>
        </div>
      </TelaCentral>
    )
  }

  if (fase === 'perguntas') {
    const pergunta = quizPerguntas[perguntaIndex]
    const progresso = ((perguntaIndex + 1) / quizPerguntas.length) * 100
    return (
      <TelaCentral>
        <Logo />
        <div className="mb-6">
          <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Pergunta {perguntaIndex + 1} de {quizPerguntas.length}
          </p>
          <div className="h-1 bg-ink-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-400 transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink-50 mb-6 text-center">
          {pergunta.label}
        </h1>
        <div className="flex flex-col gap-3">
          {pergunta.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleResponder(opt.value)}
              className="text-left rounded-2xl border border-white/8 bg-ink-800/60 text-ink-200 hover:border-brand-400/40 hover:bg-ink-800 transition-all px-5 py-3.5 text-sm"
            >
              {opt.texto}
            </button>
          ))}
        </div>
      </TelaCentral>
    )
  }

  // fase === 'resultado' | 'enviando'
  const sugestao = estiloAtuacaoOptions.find((o) => o.value === estiloConfirmado)
  const enviando = fase === 'enviando'

  return (
    <TelaCentral>
      <Logo />
      <div className="text-center mb-8">
        <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Perfil sugerido{nomeMentorado ? ` para ${nomeMentorado}` : ''}
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink-50 mb-2">{sugestao?.label}</h1>
        <p className="text-ink-400 text-sm">{sugestao?.desc}</p>
      </div>

      {!mostrarTodos ? (
        <button
          onClick={() => setMostrarTodos(true)}
          className="text-brand-400 text-sm hover:text-brand-300 transition-colors mx-auto block mb-8"
        >
          Não é bem isso? Veja todas as opções
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-8">
          {estiloAtuacaoOptions.map((opt) => {
            const selected = estiloConfirmado === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setEstiloConfirmado(opt.value)}
                className={`text-left rounded-2xl border p-4 transition-all ${
                  selected
                    ? 'border-brand-400 bg-brand-400/10 text-ink-50'
                    : 'border-white/8 bg-ink-800/60 text-ink-300 hover:border-white/20 hover:bg-ink-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm">{opt.label}</span>
                  {selected && <CheckCircle2 size={14} className="text-brand-400 shrink-0 mt-0.5" />}
                </div>
                <span className="text-xs text-ink-400 leading-snug">{opt.desc}</span>
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={handleConfirmar}
        disabled={enviando}
        className="w-full flex items-center justify-center gap-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-ink-950 font-bold text-sm px-7 py-3.5 rounded-xl transition-all"
      >
        {enviando ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
        {enviando ? 'Enviando...' : 'Confirmar perfil'}
      </button>
    </TelaCentral>
  )
}
