import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res) => {
    res.json({
        status: 'ok',
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port $(PORT)`)
})