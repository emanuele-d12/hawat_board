import type {
    ErrorRequestHandler,
} from 'express'

const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {

    console.error(err)

    return res.status(500).json({
        error: 'Internal Server Error',
    })
}

export default errorHandler