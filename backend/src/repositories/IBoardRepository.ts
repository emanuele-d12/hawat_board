export interface IBoardRepository {

    create(board: unknown): Promise<void>

    findById(uuid: string): Promise<any>

    update(uuid: string, board: unknown): Promise<void>

}