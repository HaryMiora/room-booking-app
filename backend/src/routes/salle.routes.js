import express from 'express'
import { getSalles, createSalle, updateSalle, deleteSalle } from '../controllers/salle.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getSalles)
router.post('/', protect, createSalle)
router.put('/:id', protect, updateSalle)
router.delete('/:id', protect, deleteSalle)

export default router
