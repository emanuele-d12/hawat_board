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

console.log('current datadir: ', DATA_DIR)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i


app.post('/api/boards', async (req, res) => {
    console.log('calling POST /api/boards')
    try {

        const uuid = crypto.randomUUID()

        await fs.mkdir(DATA_DIR, {
            recursive: true,
        })


        console.log('creating a new board with id: ', uuid)

        const newBoard = {
            uuid,
            categories: [],
            tasks: [],
            createdAt: Date.now()
        }

        await fs.writeFile(
            path.join(DATA_DIR, `/json/${uuid}.json`),
            JSON.stringify(newBoard, null, 2)
        )

        return res.json(newBoard)


    } catch {
        return res.status(500).json({
            error: '500 Error...something very bad happened....'
        })
    }

})

app.put('/api/boards/:uuid', async (req, res) => {
    console.log('calling PUT /api/boards/:uuid')
    const { uuid } = req.params

    if (!uuidRegex.test(uuid)) {
        console.log('not a valid uuid')
        res.status(401).json({
            error: 'Not valid uuid :('
        })
    }
    const filePath = path.join(
        DATA_DIR,
        `/json/${uuid}.json`
    )

    const board = {
        uuid,
        tasks: req.body.tasks,
        categories: req.body.categories,
    }

    // console.log('board to overwrite: ', filePath)
    // console.log('new data: ', board)

    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(
                board,
                null,
                2
            )
        )

        res.json({ status: 'ok' })
    } catch (error) {
        res.status(500).json({
            error: 'Save Failed :('
        })
    }



})

app.get('/api/boards/:uuid', async (req, res) => {
    console.log('calling GET /api/boards/:uuid')

    const { uuid } = req.params

    if (!uuidRegex.test(uuid)) {
        console.log('not a valid uuid')
        res.status(401).json({
            error: 'Not valid uuid :('
        })
    }

    await fs.mkdir(DATA_DIR, {
        recursive: true
    })

    const filePath = path.join(
        DATA_DIR,
        `/json/${uuid}.json`
    )

    try {
        await fs.access(filePath)
        const content = await fs.readFile(
            filePath,
            'utf-8'
        )

        return res.json(
            JSON.parse(content)
        )

    } catch (error) {
        res.status(500).json({
            error: 'Board not found :('
        })

    }
})

