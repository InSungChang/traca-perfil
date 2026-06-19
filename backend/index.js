import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import diagnosticoRouter from './routes/diagnostico.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))
app.use(express.json())

app.get('/health', (_, res) => res.json({ status: 'ok' }))
app.use('/api/diagnostico', diagnosticoRouter)

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`)
})
