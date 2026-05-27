import type { CategoryData, Task } from "../types/task"

const API_URL = import.meta.env.VITE_API_URL

export interface Board {
    uuid: string
    tasks: Task[]
    categories: CategoryData[]
}

async function handleResponse(
    response: Response
) {

    if (!response.ok) {

        const error =
            await response.json()

        throw new Error(
            error.error ||
            'api error'
        )
    }

    return response.json()
}

export async function createBoard() {
    const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return handleResponse(response)
}

export async function getBoard(uuid: string): Promise<Board> {
    const response = await fetch(
        `${API_URL}/api/boards/${uuid}`
    )

    return handleResponse(response)
}


export async function saveBoard(uuid: string, tasks: Task[], categories: CategoryData[]) {
  console.log('api function saveBoard triggered')
    const response = await fetch(`${API_URL}/api/boards/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tasks,
            categories
        })
    })

    return handleResponse(response)
}