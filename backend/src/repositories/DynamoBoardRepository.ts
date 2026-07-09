import type { Board } from '../models/Board.js'
import type { IBoardRepository } from './IBoardRepository.js'

class DynamoBoardRepository
    implements IBoardRepository {

    async create(board: Board): Promise<void> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

    async findById(
        uuid: string
    ): Promise<Board | null> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

    async update(
        uuid: string,
        board: Board
    ): Promise<void> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

}

export default DynamoBoardRepository