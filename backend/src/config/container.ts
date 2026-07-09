import { env } from './env.js'

import type { IBoardRepository } from '../repositories/IBoardRepository.js'

import JsonBoardRepository from '../repositories/JsonBoardRepository.js'
import DynamoBoardRepository from '../repositories/DynamoBoardRepository.js'

import BoardService from '../services/BoardService.js'

const boardRepository: IBoardRepository =
    env.persistence === 'dynamodb'
        ? new DynamoBoardRepository()
        : new JsonBoardRepository()

export const boardService = new BoardService(boardRepository)