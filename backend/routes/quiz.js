import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

router.post('/', async (req, res) => {
  const { nome_mentorado } = req.body

  const { data, error } = await supabase
    .from('quiz_perfil')
    .insert({ nome_mentorado: nome_mentorado || null })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Erro ao criar quiz:', error?.message)
    return res.status(500).json({ message: 'Erro ao criar quiz.' })
  }

  res.json({ id: data.id })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('quiz_perfil')
    .select('status, estilo_confirmado, nome_mentorado')
    .eq('id', id)
    .single()

  if (error || !data) {
    return res.status(404).json({ message: 'Quiz não encontrado.' })
  }

  res.json(data)
})

router.post('/:id/responder', async (req, res) => {
  const { id } = req.params
  const { respostas, estilo_sugerido, estilo_confirmado } = req.body

  if (!estilo_confirmado) {
    return res.status(400).json({ message: 'Campo "estilo_confirmado" é obrigatório.' })
  }

  const { data: existing, error: fetchError } = await supabase
    .from('quiz_perfil')
    .select('status')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return res.status(404).json({ message: 'Quiz não encontrado.' })
  }

  if (existing.status === 'respondido') {
    return res.status(409).json({ message: 'Este quiz já foi respondido.' })
  }

  const { error } = await supabase
    .from('quiz_perfil')
    .update({
      respostas,
      estilo_sugerido,
      estilo_confirmado,
      status: 'respondido',
      respondido_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao salvar resposta do quiz:', error.message)
    return res.status(500).json({ message: 'Erro ao salvar resposta.' })
  }

  res.json({ ok: true })
})

export default router
