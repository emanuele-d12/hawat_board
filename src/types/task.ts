import { categories } from "./categories"

export type Task = {
  title: string
  category: Category
    completed: Boolean

}

export type Category = typeof categories[number]['value']

export type TaskPayload = {
    title: string
    category: Category
    completed: Boolean
}