import fs from 'fs/promises'
import path from 'path'

import type {
    IBoardRepository,
    BoardData,
} from './IBoardRepository.js'

const DATA_DIR = path.resolve(
    process.env.DATA_DIR || './data/'
)

class JsonBoardRepository implements IBoardRepository {

    async create(board: BoardData): Promise<void> {

        await fs.mkdir(DATA_DIR, {
            recursive: true,
        })

        await fs.writeFile(
            path.join(
                DATA_DIR,
                'json',
                `${board.uuid}.json`
            ),
            JSON.stringify(board, null, 2)
        )
    }

    async findById(uuid: string): Promise<BoardData> {

        const filePath = path.join(
            DATA_DIR,
            'json',
            `${uuid}.json`
        )

        const content =
            await fs.readFile(filePath, 'utf8')

        return JSON.parse(content) as BoardData

    }

    async update(
        uuid: string,
        board: BoardData
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