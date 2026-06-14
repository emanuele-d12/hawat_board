import { Board } from "../domain/Board";
import type { Command } from "./Command";


export class DeleteCategoryCommand implements Command {

    private board: Board
    private categoryTitle: string

    constructor(
        board: Board,
        categoryTitle: string
    ){
        this.board = board
        this.categoryTitle = categoryTitle
    }

    execute() {
        this.board.deleteCategory(this.categoryTitle)
    }
}