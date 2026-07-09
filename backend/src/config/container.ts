import JsonBoardRepository from '../repositories/JsonBoardRepository'
import BoardService from '../services/BoardService'

const boardRepository = new JsonBoardRepository()

const boardService = new BoardService(boardRepository)

export {
    boardRepository,
    boardService,
}