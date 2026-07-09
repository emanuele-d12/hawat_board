import { Router } from 'express'
import boardController from '../controllers/BoardController.js'

const router = Router()

router.post('/', boardController.createBoard)
router.get('/:uuid', boardController.getBoard)
router.put('/:uuid', boardController.updateBoard)

export default router