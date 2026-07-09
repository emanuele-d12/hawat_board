import { Router } from 'express'

import InfoController
    from '../controllers/InfoController.js'

    
const router = Router()

router.get('/', InfoController.getInfo)

export default router