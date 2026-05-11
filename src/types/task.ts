export type Task = {
    title: string
    category: Category
    completed: Boolean

}

export type Category = 'daily' | 'weekly' | 'backlog'

export type TaskPayload = {
    title: string
    category: Category
}