import type {
    Request,
    Response,
} from 'express'

import { env } from '../config/env.js'

class StatusController {

    getStatus(
        _req: Request,
        res: Response
    ): void {

        const memory =
            process.memoryUsage()

        res.json({
            status: 'UP',
            instance:
                env.instanceName,
            version:
                env.version,
            persistence:
                env.persistence,
            uptime: Number(
                process.uptime().toFixed(2)
            ),
            memory: {
                rss: memory.rss,
                heapUsed:
                    memory.heapUsed,

                heapTotal:
                    memory.heapTotal,
            },
            timestamp:
                new Date().toISOString(),
        })
    }
}

export default new StatusController()