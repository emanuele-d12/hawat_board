import type { Board } from '../models/Board.js'

interface IBoardRepository {
    create(board: Board): Promise<void>
    findById(uuid: string): Promise<Board | null>
    update(
        uuid: string,
        board: Board
    ): Promise<void>
}

export type { IBoardRepository }