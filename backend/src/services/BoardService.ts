import crypto from 'crypto'

import type { IBoardRepository } from '../repositories/IBoardRepository.js'

class BoardService {

    constructor(
        private repository: IBoardRepository
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

        await this.repository.update(uuid, board)
    }
}

export default BoardService