import type { CategoryData, Task } from "../types/task"

export class Board {

    public tasks: Task[]
    public categories: CategoryData[]

    constructor(
        tasks: Task[] = [],
        categories: CategoryData[] = []
    ) {
        this.tasks = tasks
        this.categories = categories
    }

    addTask(task: Task) {
        console.log('adding task: ', task)
        this.tasks.push(task)
    }

    deleteTask(taskToDelete: Task) {
        console.log('deleting Task: ', taskToDelete)
        this.tasks = this.tasks.filter(task => task !== taskToDelete)
    }

    toggleTask(taskToToggle: Task) {
        taskToToggle.completed = !taskToToggle.completed
    }

    addCategory(title: string) {
        console.log('lista task', this.tasks)
        this.categories.push({
            title,
            value: title
                .toLowerCase()
                .replace(/\s+/g, '-'),
        })
    }

    deleteCategory(categoryToDelete: string) {
        console.log('deleting category: ', categoryToDelete)
        this.categories = this.categories.filter(category => category.value !== categoryToDelete)
        this.tasks = this.tasks.filter(task => task.category !== categoryToDelete)
    }

    getTasksByCategory(categoryValue: string) {
        return this.tasks
            .filter(task => task.category === categoryValue)
            .sort((a, b) => a.order - b.order)
    }

    reorderTask(payload: {
        oldIndex: number
        newIndex: number
        category: string
    }) {
        console.log('reordering category', payload.category)

        const categoryTasks = this.getTasksByCategory(
            payload.category
        )


        if (!categoryTasks.length) return

        console.log('categoryTasks', categoryTasks)
        console.log('payload.oldIndex', payload.oldIndex)

        const movedTask =
            categoryTasks.splice(payload.oldIndex - 1, 1)[0]

        console.log('moved task', movedTask)
        categoryTasks.splice(
            payload.newIndex,
            0,
            movedTask
        )

        categoryTasks.forEach((task, index) => {
            task.order = index
        })
    }

    moveTask(payload: {
        taskId: string
        newIndex: number
        newCategory: string
    }) {

        const movedTask = this.tasks.find(task => task.id === payload.taskId)

        if (!movedTask) return

        console.log('moving task: ', movedTask.title)
        console.log('oldCategory', movedTask.category)
        console.log('newCategory', payload.newCategory)

        const oldCategory = movedTask.category
        movedTask.category = payload.newCategory

        const newCategoryTasks = this.getTasksByCategory(payload.newCategory).filter(task => task.id !== movedTask.id)

        newCategoryTasks.splice(
            payload.newIndex,
            0,
            movedTask
        )

        newCategoryTasks.forEach((task, index) => {
            task.order = index
        })

        const oldCategoryTasks = this.getTasksByCategory(
            oldCategory
        )

        oldCategoryTasks.forEach((task, index) => {
            task.order = index
        })

    }

    updateTask(payload: {
        taskId: string
        title: string
    }) {
        let taskToEdit = this.tasks.find(task => task.id === payload.taskId)

        if (taskToEdit) {
            taskToEdit.title = payload.title
        } else {
            return
        }
    }

    exportAll() {

        const rows = this.categories.map(category => {
            const filteredTasks = this.tasks
                .filter(t => t.category === category.value)
                .sort(function (a, b) { return a.order - b.order })
                .map(t => t.title)

            return category.value + '\n\n' + filteredTasks.join('\n') + '\n\n'
        })

        let content = rows.join('\n')

        const blob = new Blob([content], {
            type: 'text/plain',
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `MyBoard.txt`
        link.click()
        URL.revokeObjectURL(url)
    }


    snapshot() {
        return structuredClone({
            tasks: this.tasks,
            categories: this.categories
        })
    }
}