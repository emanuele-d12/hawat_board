import { Board } from "../domain/Board";
import type { Command } from "./Command";


export class ReorderTaskCommand implements Command {

    private board: Board
    private payload: {
        oldIndex: number
        newIndex: number
        category: string
    }

    constructor(
        board: Board,
        payload: {
            oldIndex: number
            newIndex: number
            category: string
        }
    ) {
        this.board = board
        this.payload = payload
    }

    execute() {
        this.board.reorderTask(this.payload)
    }
}