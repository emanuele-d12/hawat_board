import type { RequestHandler } from 'express'

import { env } from '../config/env.js'

export const instanceMiddleware: RequestHandler = (
    _req,
    res,
    next
) => {

    res.setHeader(
        'X-Backend-Instance',
        env.instanceName
    )

    next()

}