import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/jwt.js'

const prisma = new PrismaClient()

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    const token = generateToken(user)
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' })

    const token = generateToken(user)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}
