import crypto from 'crypto'

import type { IBoardRepository } from '../repositories/IBoardRepository.js'
import type { Task, Category } from '../models/Board.js'

class BoardService {

    constructor(
        private repository: IBoardRepository
    ) { }

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
        tasks: Task[],
        categories: Category[]
    ): Promise<void> {
        const board = await this.repository.findById(uuid)
        if (!board) {

            throw new Error('Board not found')

        }
        board.tasks = tasks
        board.categories = categories
        await this.repository.update(
            uuid,
            board
        )

    }
}

export default BoardService