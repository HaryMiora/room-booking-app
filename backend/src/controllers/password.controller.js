import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { transporter } from '../utils/mailer.js'

const prisma = new PrismaClient()

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 3600000) // 1h

    await prisma.user.update({
      where: { email },
      data: { resetToken: token, resetTokenExpiry: expiry },
    })

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de mot de passe',
      html: `<p>Cliquez sur le lien pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
    })

    res.json({ message: 'E-mail de réinitialisation envoyé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    })

    if (!user) return res.status(400).json({ message: 'Lien invalide ou expiré' })

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    res.json({ message: 'Mot de passe réinitialisé avec succès' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}
