import fs from 'fs/promises'
import path from 'path'

import type { Board } from '../models/Board.js'
import type { IBoardRepository } from './IBoardRepository.js'

const DATA_DIR = path.resolve(
    process.env.DATA_DIR || './data/'
)

class JsonBoardRepository
    implements IBoardRepository {

    async create(board: Board): Promise<void> {

        await fs.mkdir(
            path.join(DATA_DIR, 'json'),
            {
                recursive: true,
            }
        )

        await fs.writeFile(
            path.join(
                DATA_DIR,
                'json',
                `${board.uuid}.json`
            ),
            JSON.stringify(board, null, 2)
        )

    }

    async findById(
        uuid: string
    ): Promise<Board | null> {

        try {

            const filePath = path.join(
                DATA_DIR,
                'json',
                `${uuid}.json`
            )

            const content =
                await fs.readFile(filePath, 'utf8')

            return JSON.parse(content) as Board

        } catch {

            return null

        }

    }

    async update(
        uuid: string,
        board: Board
    ): Promise<void> {

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

export default JsonBoardRepository