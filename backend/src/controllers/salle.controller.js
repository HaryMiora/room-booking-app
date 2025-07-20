import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getSalles = async (req, res) => {
  const salles = await prisma.salle.findMany()
  res.json(salles)
}

export const createSalle = async (req, res) => {
  const { nom, capacite, type, equipements } = req.body
  const salle = await prisma.salle.create({ data: { nom, capacite, type, equipements } })
  res.status(201).json(salle)
}

export const updateSalle = async (req, res) => {
  const { id } = req.params
  const salle = await prisma.salle.update({ where: { id: Number(id) }, data: req.body })
  res.json(salle)
}

export const deleteSalle = async (req, res) => {
  const { id } = req.params
  await prisma.salle.delete({ where: { id: Number(id) } })
  res.status(204).end()
}
