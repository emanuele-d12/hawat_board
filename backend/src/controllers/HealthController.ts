import type { Request, Response } from 'express'

import { env } from '../config/env.js'

class HealthController {

    getHealth(
        _req: Request,
        res: Response
    ) {

        return res.json({

            status: 'UP',

            instance: env.instanceName,

            version: env.version,

        })

    }

}

export default new HealthController()