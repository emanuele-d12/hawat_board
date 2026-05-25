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