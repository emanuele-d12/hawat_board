import { Router } from 'express'

import InfoController
    from '../controllers/StatusController.js'

    
const router = Router()

router.get('/', InfoController.getStatus)

export default router