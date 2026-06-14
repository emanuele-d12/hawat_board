import { Board } from "../domain/Board";
import type { Command } from "./Command";


export class MoveTaskCommand implements Command {

    private board: Board
    private payload: {
        taskId: string
        newIndex: number
        newCategory: string
    }

    constructor(
        board: Board,
        payload: {
            taskId: string
            newIndex: number
            newCategory: string
        }
    ) {
        this.board = board
        this.payload = payload
    }

    execute() {
        this.board.moveTask(this.payload)
    }
}