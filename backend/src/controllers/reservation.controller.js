import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getReservations = async (req, res) => {
  const reservations = await prisma.reservation.findMany({
    include: { salle: true, user: true }
  })
  res.json(reservations)
}

export const createReservation = async (req, res) => {
  const { date, heure, duree, salleId } = req.body
  const userId = req.user.id

  const reservation = await prisma.reservation.create({
    data: { date: new Date(date), heure, duree, salleId: Number(salleId), userId }
  })
  res.status(201).json(reservation)
}

export const deleteReservation = async (req, res) => {
  const { id } = req.params
  await prisma.reservation.delete({ where: { id: Number(id) } })
  res.status(204).end()
}
