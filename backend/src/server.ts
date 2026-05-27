import express from 'express'
import cors from 'cors'

import fs from 'fs/promises'
import path from 'path'

const app = express()
const DATA_DIR = path.join(process.cwd(), 'data/json')

app.use(cors())
app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


app.get('/api/health', (_, res) => {
    res.json({
        status: 'ok',
    })
})


app.post('/api/link', async (req, res) => {
    try {
        console.log('receiving uuid', req.body)

        const { uuid } = req.body

        if (!uuid) {
            return res.status(400).json({
                error: 'uuid missing',
            })
        }

        await fs.mkdir(DATA_DIR, {
            recursive: true,
        })

        const filePath = path.join(DATA_DIR, `${uuid}.json`)

        try {
            await fs.access(filePath)
            console.log('file found!')

            const existingFile = await fs.readFile(filePath, 'utf-8')
            return res.json(JSON.parse(existingFile))

        } catch {
            console.log('File not found...creating a new JSON!')

            const newBoard = {
                uuid,
                categories: [],
                tasks: []
            }

            console.log('File path: ', filePath)

            await fs.writeFile(
                filePath,
                JSON.stringify(newBoard, null, 2)
            )

            return res.json(newBoard)

        }

    } catch {
        return res.status(500).json({
            error: '500 Error...something very bad happened....'
        })
    }

})

app.put('/api/boards/:uuid', async (req, res) => {
    
    const { uuid } = req.body
    const filePath = path.join(
        DATA_DIR,
        `${uuid}.json`
    )

    const board = {
        uuid,
        tasks: req.body.tasks,
        categories: req.body.categories,
    }

    await fs.writeFile(
            filePath,
            JSON.stringify(
                board,
                null,
                2
            )
        )


    res.json({
        status: 'ok'
    })

})

app.get('/api/boards/:uuid', async (req, res) => {
    console.log('req.params: ', req.params)

    const { uuid } = req.params

    await fs.mkdir(DATA_DIR, {
        recursive: true
    })

    const filePath = path.join(
        DATA_DIR,
        `${uuid}.json`
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

    } catch {
        const newBoard = {
            uuid,
            tasks: [],
            categories: []
        }

        await fs.writeFile(
            filePath,
            JSON.stringify(
                newBoard,
                null,
                2
            )
        )

        return res.json(newBoard)
    }
})
