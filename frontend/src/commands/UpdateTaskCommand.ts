import { Board } from "../domain/Board";
import type { Command } from "./Command";


export class UpdateTaskCommand implements Command {

    private board: Board
    private payload: {
        taskId: string
        title: string
    }

    constructor(
        board: Board,
        payload: {
            taskId: string
            title: string
        }
    ) {
        this.board = board
        this.payload = payload
    }

    execute() {
        this.board.updateTask(this.payload)
    }
}