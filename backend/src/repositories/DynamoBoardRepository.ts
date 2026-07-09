import {
    PutCommand,
    GetCommand,
} from '@aws-sdk/lib-dynamodb'

import { dynamo } from '../config/dynamo.js'
import { env } from '../config/env.js'

import type { Board } from '../models/Board.js'
import type { IBoardRepository } from './IBoardRepository.js'

class DynamoBoardRepository
    implements IBoardRepository {

    async create(board: Board): Promise<void> {

        await dynamo.send(
            new PutCommand({
                TableName: env.dynamoTable,
                Item: {
                    uuid: board.uuid,
                    board,
                },
            })
        )
    }

    async update(
        uuid: string,
        board: Board
    ): Promise<void> {

        await this.create(board)

    }

    async findById(
        uuid: string
    ): Promise<Board | null> {

        const result = await dynamo.send(
            new GetCommand({
                TableName: env.dynamoTable,
                Key: {
                    uuid,
                },
            })

        )

        if (!result.Item) {
            return null
        }
        
        return result.Item.board as Board
    }

}

export default DynamoBoardRepository