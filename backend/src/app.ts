import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { instanceMiddleware }
    from './middleware/instance.js'
import errorHandler from './middleware/errorHandler.js'

import healthRoutes
    from './routes/health.routes.js'

import boardRoutes from './routes/board.routes.js'
import infoRoutes from './routes/info.routes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(instanceMiddleware)
app.use('/health', healthRoutes)
app.use('/api/boards', boardRoutes)
app.use('/info', infoRoutes)

//sempre per ultimo
app.use(errorHandler)

export default app