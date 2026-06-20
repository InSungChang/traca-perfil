import { Router } from 'express'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import { buildMentorPrompt } from '../prompts/mentor.js'

const router = Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

router.post('/', async (req, res) => {
  const { perfil, respostas } = req.body

  if (!perfil || !respostas) {
    return res.status(400).json({ message: 'Campos "perfil" e "respostas" são obrigatórios.' })
  }

  let prompt
  if (perfil === 'mentor') {
    prompt = buildMentorPrompt(respostas)
  } else {
    return res.status(400).json({ message: `Perfil "${perfil}" ainda não suportado.` })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })
    const text = completion.choices[0].message.content

    let resultado
    try {
      resultado = JSON.parse(text)
    } catch {
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Resposta da IA não contém JSON válido.')
      resultado = JSON.parse(match[0])
    }

    // Salvar no Supabase e retornar com ID
    try {
      const { data, error } = await supabase
        .from('diagnosticos')
        .insert({
          nome: respostas.nome || null,
          estilo_dominante: resultado.estilo_dominante,
          resultado,
        })
        .select('id')
        .single()

      if (!error && data) {
        return res.json({ ...resultado, id: data.id })
      }
    } catch {
      // Supabase falhou — retorna resultado sem ID (degradação graciosa)
    }

    res.json(resultado)
  } catch (err) {
    console.error('Erro ao chamar OpenAI API:', err.message)
    res.status(500).json({ message: 'Erro ao gerar diagnóstico. Tente novamente.' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('diagnosticos')
    .select('resultado, nome, created_at')
    .eq('id', id)
    .single()

  if (error || !data) {
    return res.status(404).json({ message: 'Diagnóstico não encontrado.' })
  }

  res.json(data)
})

export default router
