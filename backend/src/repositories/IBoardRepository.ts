export interface BoardData {
    uuid: string
    categories: unknown[]
    tasks: unknown[]
    createdAt?: number
}

export interface IBoardRepository {

    create(board: BoardData): Promise<void>

    findById(uuid: string): Promise<BoardData>

    update(
        uuid: string,
        board: BoardData
    ): Promise<void>

}