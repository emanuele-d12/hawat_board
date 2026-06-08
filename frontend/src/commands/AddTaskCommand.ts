import { Board } from "../domain/Board";
import type { Task } from "../types/task";
import type { Command } from "./Command";


export class AddTaskCommand implements Command {

    private board: Board
    private task : Task

    constructor(
        board: Board,
        task: Task,
    ) {
        this.board = board
        this.task = task
    }

    execute() {
        this.board.addTask(this.task)
    }
}