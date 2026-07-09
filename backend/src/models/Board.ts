export interface Task {
    id: string
    title: string
    category: string
    completed: boolean
    order: number
}

export interface Category {
    title: string
    value: string
}

export interface Board {
    uuid: string
    tasks: Task[]
    categories: Category[]
    createdAt: number
}