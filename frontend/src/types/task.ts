export type Task = {
  id: string
  title: string
  category: Category
  completed: Boolean
  order: number
}

export type Category = string

export type CategoryData = {
  title: string
  value: Category
}

export type TaskPayload = {
    id: string
    title: string
    category: Category
    completed: Boolean
    order: number
}