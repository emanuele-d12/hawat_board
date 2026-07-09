import crypto from 'crypto'

import JsonBoardRepository from '../repositories/JsonBoardRepository'

class BoardService {

    constructor(
        private repository = new JsonBoardRepository()
    ) {}

    async createBoard() {

        const board = {
            uuid: crypto.randomUUID(),
            categories: [],
            tasks: [],
            createdAt: Date.now(),
        }
        await this.repository.create(board)
        return board

    }

    async getBoard(uuid: string) {
        return this.repository.findById(uuid)
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

        await this.repository.update(
            uuid,
            board
        )
    }
}

export default new BoardService()