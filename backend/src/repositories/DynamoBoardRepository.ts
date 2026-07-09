import type { IBoardRepository } from './IBoardRepository.js'

class DynamoBoardRepository
    implements IBoardRepository {

    async create(board: unknown): Promise<void> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

    async findById(uuid: string): Promise<any> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

    async update(
        uuid: string,
        board: unknown
    ): Promise<void> {

        throw new Error(
            'DynamoDB repository not implemented'
        )

    }

}

export default DynamoBoardRepository