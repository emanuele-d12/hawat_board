export type Task = {
  title: string
  category: Category
    completed: Boolean

}

export type Category = string

export type CategoryData = {
  title: string
  value: Category
}

export type TaskPayload = {
    title: string
    category: Category
    completed: Boolean
}