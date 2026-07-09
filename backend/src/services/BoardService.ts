import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.resolve(
    process.env.DATA_DIR || './data/'
)

class BoardService {

    async createBoard() {
        const uuid = crypto.randomUUID()

        await fs.mkdir(DATA_DIR, {
            recursive: true,
        })

        const board = {
            uuid,
            categories: [],
            tasks: [],
            createdAt: Date.now(),
        }

        await fs.writeFile(
            path.join(DATA_DIR, 'json', `${uuid}.json`),
            JSON.stringify(board, null, 2)
        )

        return board
    }

    async getBoard(uuid: string) {
        const filePath = path.join(
            DATA_DIR,
            'json',
            `${uuid}.json`
        )

        const content = await fs.readFile(
            filePath,
            'utf8'
        )

        return JSON.parse(content)
    }

    async updateBoard(
        uuid: string,
        tasks: unknown[],
        categories: unknown[]
    ) {

        const board = {
            uuid,
            tasks,
            categories,
        }

        const filePath = path.join(
            DATA_DIR,
            'json',
            `${uuid}.json`
        )

        await fs.writeFile(
            filePath,
            JSON.stringify(board, null, 2)
        )
    }
}

export default new BoardService()