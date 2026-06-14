import { Board } from "../domain/Board";
import type { Task } from "../types/task";
import type { Command } from "./Command";


export class ToggleTaskCommand implements Command{

    private task: Task
    private board: Board

    constructor(
        task: Task,
        board: Board
    ) {
        this.board = board
        this.task = task
    }

    execute() {
        this.board.toggleTask(this.task)
    }
}