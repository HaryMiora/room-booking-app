import express from 'express'
import { getReservations, createReservation, deleteReservation } from '../controllers/reservation.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', protect, getReservations)
router.post('/', protect, createReservation)
router.delete('/:id', protect, deleteReservation)

export default router
