import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre (e.g. Mailtrap, Sendinblue)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
