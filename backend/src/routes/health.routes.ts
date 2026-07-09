import { Router } from 'express'

import healthController
    from '../controllers/HealthController'

const router = Router()

router.get(
    '/',
    healthController.getHealth
)

export default router