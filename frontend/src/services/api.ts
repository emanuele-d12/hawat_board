import { categories } from "../types/categories"
import type { Category, Task } from "../types/task"

const API_URL = import.meta.env.VITE_API_URL

export async function createBoard(uuid: string) {
    return fetch(`${API_URL}/api/link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uuid,
        }),
    })
}

export async function getBoard(uuid: string) {
    const response = await fetch(
        `${API_URL}/api/boards/${uuid}`
    )

    return response.json()
}


export async function saveBoard(uuid: string, tasks: Task[], categories: CategoryData[]) {
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

    if (!response.ok) {
        throw new Error(
            `saveBoard failed: ${response.status}`
        )
    }

    return response.json()
}