import { boardService } from '../config/container'

const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

class BoardController {

    async createBoard(_req, res) {

        try {

            const board =
                await boardService.createBoard()

            return res.json(board)

        } catch (error) {

            console.error(error)

            return res.status(500).json({
                error: 'Internal Server Error'
            })

        }

    }

    async getBoard(req, res) {

        const { uuid } = req.params

        if (!uuidRegex.test(uuid)) {

            return res.status(400).json({
                error: 'Invalid UUID'
            })

        }

        try {

            const board =
                await boardService.getBoard(uuid)

            return res.json(board)

        } catch (error) {

            console.error(error)

            return res.status(500).json({
                error: 'Board not found'
            })

        }

    }

    async updateBoard(req, res) {

        const { uuid } = req.params

        if (!uuidRegex.test(uuid)) {

            return res.status(400).json({
                error: 'Invalid UUID'
            })

        }

        try {

            await boardService.updateBoard(
                uuid,
                req.body.tasks,
                req.body.categories
            )

            return res.json({
                status: 'ok'
            })

        } catch (error) {

            console.error(error)

            return res.status(500).json({
                error: 'Save failed'
            })

        }

    }

}

export default new BoardController()