import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('Room Booking API 🚀')
})

// Routes principales (à venir)
import authRoutes from './routes/auth.routes.js'
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
