import type {
    Request,
    Response,
} from 'express'

import { env } from '../config/env.js'

class InfoController {

    getInfo(
        _req: Request,
        res: Response
    ): void {
        res.json({
            instance: env.instanceName,
            version: env.version,
            persistence: env.persistence,
            node: process.version,
            uptime: Number(
                process.uptime().toFixed(2)
            ),
            timestamp: new Date().toISOString(),
        })
    }
}

export default new InfoController()