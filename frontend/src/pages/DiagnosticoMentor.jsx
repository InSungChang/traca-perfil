import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Compass, CheckCircle2, Loader2, Link, Check, RefreshCw } from 'lucide-react'
import { mentorSteps } from '../data/mentorSteps.js'

// ─── Question renderers ───────────────────────────────────────────────────────

function TextInput({ question, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-ink-200 font-medium text-sm">{question.label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        className={`w-full bg-ink-800 border rounded-xl px-4 py-3.5 text-ink-100 placeholder-ink-600 focus:outline-none focus:border-brand-400 transition-colors text-sm ${
          error ? 'border-red-500/60' : 'border-white/10'
        }`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function TextareaInput({ question, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-ink-200 font-medium text-sm">{question.label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        rows={4}
        className={`w-full bg-ink-800 border rounded-xl px-4 py-3.5 text-ink-100 placeholder-ink-600 focus:outline-none focus:border-brand-400 transition-colors text-sm resize-none ${
          error ? 'border-red-500/60' : 'border-white/10'
        }`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function SingleSelect({ question, value, onChange, error }) {
  const cols = question.options.length > 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'
  return (
    <div className="flex flex-col gap-3">
      <label className="text-ink-200 font-medium text-sm">{question.label}</label>
      <div className={`grid ${cols} gap-3`}>
        {question.options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(question.id, opt.value)}
              className={`
                text-left rounded-2xl border p-4 transition-all
                ${selected
                  ? 'border-brand-400 bg-brand-400/10 text-ink-50'
                  : 'border-white/8 bg-ink-800/60 text-ink-300 hover:border-white/20 hover:bg-ink-800'
                }
              `}
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
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function MultiSelect({ question, value = [], onChange, error }) {
  const toggle = (opt) => {
    const current = value || []
    if (current.includes(opt)) {
      onChange(question.id, current.filter((v) => v !== opt))
    } else if (!question.max || current.length < question.max) {
      onChange(question.id, [...current, opt])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-ink-200 font-medium text-sm">{question.label}</label>
      <div className="flex flex-wrap gap-2">
        {question.options.map((opt) => {
          const selected = (value || []).includes(opt)
          const maxReached = question.max && (value || []).length >= question.max && !selected
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              disabled={maxReached}
              className={`
                px-4 py-2 rounded-full border text-sm transition-all
                ${selected
                  ? 'border-brand-400 bg-brand-400/15 text-brand-300 font-medium'
                  : maxReached
                  ? 'border-white/5 text-ink-600 cursor-not-allowed'
                  : 'border-white/10 bg-ink-800/60 text-ink-400 hover:border-white/20 hover:text-ink-200'
                }
              `}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {question.max && (
        <p className="text-xs text-ink-500">
          {(value || []).length}/{question.max} selecionados
        </p>
      )}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function GroupedMultiSelect({ question, value = [], onChange, error }) {
  const toggle = (opt) => {
    const current = value || []
    if (current.includes(opt)) {
      onChange(question.id, current.filter((v) => v !== opt))
    } else if (!question.max || current.length < question.max) {
      onChange(question.id, [...current, opt])
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-ink-200 font-medium text-sm">{question.label}</label>
        {question.max && (
          <p className="text-xs text-ink-500 mt-1">
            {(value || []).length}/{question.max} selecionados
          </p>
        )}
      </div>
      {question.groups.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2.5">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const selected = (value || []).includes(opt)
              const maxReached = question.max && (value || []).length >= question.max && !selected
              return (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  disabled={maxReached}
                  className={`
                    px-3.5 py-1.5 rounded-full border text-sm transition-all
                    ${selected
                      ? 'border-brand-400 bg-brand-400/15 text-brand-300 font-medium'
                      : maxReached
                      ? 'border-white/5 text-ink-600 cursor-not-allowed'
                      : 'border-white/10 bg-ink-800/60 text-ink-400 hover:border-white/20 hover:text-ink-200'
                    }
                  `}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function QuestionRenderer({ question, answers, onChange, errors }) {
  const value = answers[question.id]
  const error = errors[question.id]

  switch (question.type) {
    case 'text':
      return <TextInput question={question} value={value} onChange={onChange} error={error} />
    case 'textarea':
      return <TextareaInput question={question} value={value} onChange={onChange} error={error} />
    case 'single-select':
      return <SingleSelect question={question} value={value} onChange={onChange} error={error} />
    case 'multi-select':
      return <MultiSelect question={question} value={value} onChange={onChange} error={error} />
    case 'grouped-multi-select':
      return <GroupedMultiSelect question={question} value={value} onChange={onChange} error={error} />
    default:
      return null
  }
}

// ─── Loading screen ───────────────────────────────────────────────────────────

const loadingMessages = [
  'Analisando perfil comportamental...',
  'Identificando talentos dominantes...',
  'Cruzando perfil com o contexto da empresa...',
  'Elaborando plano de ação personalizado...',
  'Finalizando diagnóstico...',
]

function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0)

  useState(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length)
    }, 2800)
    return () => clearInterval(interval)
  })

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative w-16 h-16 mx-auto mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Compass size={28} className="text-brand-400" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-brand-400/30 animate-ping" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink-50 mb-3">
          Gerando diagnóstico
        </h2>
        <p className="text-ink-400 text-sm mb-8 h-5 transition-all">
          {loadingMessages[msgIndex]}
        </p>
        <div className="flex gap-1.5 justify-center">
          {loadingMessages.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === msgIndex ? 'w-6 bg-brand-400' : 'w-1.5 bg-ink-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DiagnosticoMentor() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  const [quizId, setQuizId] = useState(null)
  const [quizLink, setQuizLink] = useState(null)
  const [quizStatus, setQuizStatus] = useState(null) // null | 'pendente' | 'respondido'
  const [quizGenerating, setQuizGenerating] = useState(false)
  const [quizChecking, setQuizChecking] = useState(false)
  const [quizCopied, setQuizCopied] = useState(false)

  const step = mentorSteps[currentStep]
  const totalSteps = mentorSteps.length
  const isLast = currentStep === totalSteps - 1
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    for (const q of step.questions) {
      if (!q.required) continue
      const val = answers[q.id]
      if (!val || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
        newErrors[q.id] = 'Este campo é obrigatório'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validate()) return

    if (isLast) {
      await submitDiagnostico()
    } else {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/diagnostico')
    } else {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const gerarQuizLink = async () => {
    setQuizGenerating(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_mentorado: answers.nome }),
      })
      const data = await response.json()
      setQuizId(data.id)
      setQuizLink(`${window.location.origin}/quiz/${data.id}`)
      setQuizStatus('pendente')
    } catch {
      // Falha ao gerar link — mentor pode tentar novamente ou seguir manualmente
    } finally {
      setQuizGenerating(false)
    }
  }

  const handleCopyQuizLink = () => {
    navigator.clipboard.writeText(quizLink)
    setQuizCopied(true)
    setTimeout(() => setQuizCopied(false), 2500)
  }

  const verificarQuiz = async () => {
    if (!quizId) return
    setQuizChecking(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/${quizId}`)
      const data = await response.json()
      setQuizStatus(data.status)
      if (data.status === 'respondido' && data.estilo_confirmado) {
        setAnswers((prev) => ({ ...prev, estilo_atuacao: prev.estilo_atuacao || data.estilo_confirmado }))
      }
    } catch {
      // Falha ao verificar — mentor pode tentar de novo
    } finally {
      setQuizChecking(false)
    }
  }

  useEffect(() => {
    if (step.id === 'corporativo' && quizId && quizStatus === 'pendente') {
      verificarQuiz()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  const submitDiagnostico = async () => {
    setLoading(true)
    setApiError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnostico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfil: 'mentor', respostas: answers }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || 'Erro ao gerar diagnóstico')
      }

      const data = await response.json()
      navigate('/diagnostico/resultado', { state: { resultado: data, nome: answers.nome } })
    } catch (err) {
      setApiError(err.message || 'Não foi possível conectar ao servidor. Tente novamente.')
      setLoading(false)
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-ink-950/95 backdrop-blur border-b border-white/6">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-ink-400 hover:text-ink-200 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {currentStep === 0 ? 'Voltar' : 'Anterior'}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center">
              <Compass size={12} className="text-ink-950" />
            </div>
            <span className="font-display font-semibold text-ink-200 text-sm">
              Traça<span className="text-brand-400">Perfil</span>
            </span>
          </div>
          <span className="text-ink-500 text-xs">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-ink-800">
          <div
            className="h-full bg-brand-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center pt-28 pb-32 px-6">
        <div className="w-full max-w-2xl">
          {/* Step header */}
          <div className="mb-10">
            <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Etapa {currentStep + 1} — {{
                identificacao: 'Identificação',
                comportamento: 'Comportamento',
                corporativo: 'Corporativo',
                lideranca: 'Liderança e Talentos',
                empresa: 'Empresa',
                foco: 'Foco',
              }[step.id] || step.id}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-50 mb-2">
              {step.title}
            </h1>
            <p className="text-ink-400">{step.subtitle}</p>
          </div>

          {/* Quiz de autoidentificação — oferecido no primeiro passo */}
          {step.id === 'identificacao' && (
            <div className="mb-8 p-5 rounded-2xl border border-white/8 bg-ink-800/40">
              {!quizLink ? (
                <>
                  <p className="text-ink-200 font-medium text-sm mb-1">Não sabe o estilo de atuação do mentorado?</p>
                  <p className="text-ink-400 text-xs mb-4">
                    Envie um quiz rápido para ele responder — o resultado preenche automaticamente a pergunta de estilo corporativo mais adiante.
                  </p>
                  <button
                    onClick={gerarQuizLink}
                    disabled={quizGenerating}
                    className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-brand-400/40 text-brand-400 hover:bg-brand-400/10 transition-all disabled:opacity-60"
                  >
                    {quizGenerating ? <Loader2 size={14} className="animate-spin" /> : <Link size={14} />}
                    {quizGenerating ? 'Gerando link...' : 'Enviar quiz de perfil para o mentorado'}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-ink-200 font-medium text-sm mb-2">Link do quiz gerado</p>
                  <p className="text-ink-400 text-xs font-mono break-all mb-3">{quizLink}</p>
                  <button
                    onClick={handleCopyQuizLink}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      quizCopied
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        : 'border-white/10 text-ink-400 hover:text-ink-200 hover:border-white/20'
                    }`}
                  >
                    {quizCopied ? <Check size={12} /> : <Link size={12} />}
                    {quizCopied ? 'Copiado!' : 'Copiar link'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Status do quiz — visível na etapa de estilo corporativo */}
          {step.id === 'corporativo' && quizId && (
            <div className="mb-8 p-4 rounded-2xl border border-white/8 bg-ink-800/40 flex items-center justify-between gap-3">
              {quizStatus === 'respondido' ? (
                <p className="text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Preenchido pelo mentorado — você ainda pode ajustar manualmente.
                </p>
              ) : (
                <>
                  <p className="text-ink-400 text-xs">Aguardando resposta do mentorado ao quiz...</p>
                  <button
                    onClick={verificarQuiz}
                    disabled={quizChecking}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-ink-400 hover:text-ink-200 hover:border-white/20 transition-all shrink-0 disabled:opacity-60"
                  >
                    {quizChecking ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                    Verificar novamente
                  </button>
                </>
              )}
            </div>
          )}

          {/* Questions */}
          <div className="flex flex-col gap-8">
            {step.questions.map((q) => (
              <QuestionRenderer
                key={q.id}
                question={q}
                answers={answers}
                onChange={handleChange}
                errors={errors}
              />
            ))}
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-400">
              {apiError}
            </div>
          )}
        </div>
      </main>

      {/* Footer buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-ink-950/95 backdrop-blur border-t border-white/6 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-ink-400 hover:text-ink-200 transition-colors text-sm px-4 py-3"
          >
            <ArrowLeft size={15} />
            {currentStep === 0 ? 'Escolher perfil' : 'Etapa anterior'}
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-ink-950 font-bold text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            {isLast ? 'Gerar diagnóstico' : 'Continuar'}
            {isLast ? <Loader2 size={15} className="hidden" /> : <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  )
}
