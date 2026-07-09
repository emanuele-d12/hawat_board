import { env } from '../config/env.js'

export function instanceMiddleware(
    req,
    res,
    next
) {

    res.setHeader(
        'X-Backend-Instance',
        env.instanceName
    )

    next()

}