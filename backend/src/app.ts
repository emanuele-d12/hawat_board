import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'

const app = express()

const DATA_DIR = path.resolve(
    process.env.DATA_DIR || './data/'
)

console.log('Current data directory:', DATA_DIR)

app.use(cors())
app.use(express.json())

const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

app.post('/api/boards', async (_req, res) => {
    console.log('POST /api/boards')

    try {
        const uuid = crypto.randomUUID()

        await fs.mkdir(DATA_DIR, {
            recursive: true,
        })

        const newBoard = {
            uuid,
            categories: [],
            tasks: [],
            createdAt: Date.now(),
        }

        await fs.writeFile(
            path.join(DATA_DIR, 'json', `${uuid}.json`),
            JSON.stringify(newBoard, null, 2)
        )

        return res.json(newBoard)

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: 'Internal Server Error',
        })
    }
})

app.put('/api/boards/:uuid', async (req, res) => {
    console.log('PUT /api/boards/:uuid')

    const { uuid } = req.params

    if (!uuidRegex.test(uuid)) {
        console.log('Invalid UUID')

        return res.status(400).json({
            error: 'Invalid UUID',
        })
    }

    const filePath = path.join(
        DATA_DIR,
        'json',
        `${uuid}.json`
    )

    const board = {
        uuid,
        tasks: req.body.tasks,
        categories: req.body.categories,
    }

    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(board, null, 2)
        )

        return res.json({
            status: 'ok',
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: 'Save failed',
        })
    }
})

app.get('/api/boards/:uuid', async (req, res) => {
    console.log('GET /api/boards/:uuid')

    const { uuid } = req.params

    if (!uuidRegex.test(uuid)) {
        console.log('Invalid UUID')

        return res.status(400).json({
            error: 'Invalid UUID',
        })
    }

    await fs.mkdir(DATA_DIR, {
        recursive: true,
    })

    const filePath = path.join(
        DATA_DIR,
        'json',
        `${uuid}.json`
    )

    try {
        await fs.access(filePath)

        const content = await fs.readFile(
            filePath,
            'utf8'
        )

        return res.json(JSON.parse(content))

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: 'Board not found',
        })
    }
})

export default app