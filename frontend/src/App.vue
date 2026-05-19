<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import NewTask from './components/NewTask.vue'
import TaskColumn from './components/TaskColumn.vue'
import Sortable from 'sortablejs'

import type { Task, CategoryData } from './types/task'

const tasks = ref<Task[]>(
  JSON.parse(
    localStorage.getItem('tasks') || '[]'
  )
)

const categories = ref<CategoryData[]>(
  JSON.parse(
    localStorage.getItem('categories') || 'null'
  ) || [
    {
      title: 'Quotidiane',
      value: 'daily',
    },
    {
      title: 'Questa settimana',
      value: 'weekly',
    },
    {
      title: 'Backlog',
      value: 'backlog',
    },
  ])

const categoriesContainer = ref<HTMLElement | null>(null)

function handleAddTask(task: Task) {
  console.log('adding task: ', task)
  tasks.value.push(task)
}

function handleAddCategory(title: string) {
  console.log('lista task', tasks.value)
  categories.value.push({
    title,
    value: title
      .toLowerCase()
      .replace(/\s+/g, '-'),
  })
}

function deleteCategory(categoryToDelete: string) {
  console.log('deleting: ', categoryToDelete)
  categories.value = categories.value.filter(category => category.value !== categoryToDelete)
  tasks.value = tasks.value.filter(task => task.category !== categoryToDelete)
}

function deleteTask(taskToDelete: Task) {
  console.log('deleting: ', taskToDelete)
  tasks.value = tasks.value.filter(task => task !== taskToDelete)
}

function toggleTask(taskToToggle: Task) {
  taskToToggle.completed = !taskToToggle.completed
}

const editingTaskTitle = ref<string>('')

function editTask(task: Task){
  editingTaskTitle.value = task.title

  deleteTask(task)
}

function getTasksByCategory(categoryValue: string) {
  return tasks.value
    .filter(task => task.category === categoryValue)
    .sort((a, b) => a.order - b.order)
}

function reorderTask(payload: {
  oldIndex: number
  newIndex: number
  category: string
}) {
  console.log('reordering category', payload.category)

  const categoryTasks = getTasksByCategory(
    payload.category
  )

  if (!categoryTasks.length) return

  const movedTask =
    categoryTasks.splice(payload.oldIndex, 1)[0]

  categoryTasks.splice(
    payload.newIndex,
    0,
    movedTask
  )

  categoryTasks.forEach((task, index) => {
    task.order = index
  })
}

function moveTask(payload: {
  taskId: string
  newIndex: number
  newCategory: string
}) {

  const movedTask = tasks.value.find(task => task.id === payload.taskId)

  if (!movedTask) return

  console.log('moving task: ', movedTask.title)
  console.log('oldCategory', movedTask.category)
  console.log('newCategory', payload.newCategory)

  const oldCategory = movedTask.category
  movedTask.category = payload.newCategory

  const newCategoryTasks = getTasksByCategory(payload.newCategory).filter(task => task.id !== movedTask.id)

  newCategoryTasks.splice(
    payload.newIndex,
    0,
    movedTask
  )

  newCategoryTasks.forEach((task, index) => {
    task.order = index
  })

  const oldCategoryTasks = getTasksByCategory(
    oldCategory
  )

  oldCategoryTasks.forEach((task, index) => {
    task.order = index
  })

}

function exportAll() {

  const rows = categories.value.map(category => {
    const filteredTasks = tasks.value
    .filter(t => t.category === category.value)
    .sort(function(a,b) {return a.order - b.order})
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

onMounted(() => {

  if (!categoriesContainer.value) return

  Sortable.create(categoriesContainer.value, {
    animation: 200,

    onEnd(event) {
      if (
        event.oldIndex == null ||
        event.newIndex == null
      ) {
        return
      }

      const updatedCategories = [...categories.value]

      const movedCategory =
        updatedCategories.splice(event.oldIndex, 1)[0]

      updatedCategories.splice(
        event.newIndex,
        0,
        movedCategory
      )

      categories.value = updatedCategories
    },
  })
})

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    )
  },
  { deep: true }
)

watch(
  categories,
  (newCategories) => {
    localStorage.setItem(
      'categories',
      JSON.stringify(newCategories)
    )
  },
  { deep: true }
)
</script>

<template>
  <main class="min-h-screen p-8">

    <NewTask @add-task="handleAddTask" @add-category="handleAddCategory" @delete-category="deleteCategory"
      :categories="categories" :editing-task-title="editingTaskTitle"/>
      <button class="my-4 p-2 bg-emerald-500 font-bold text-white rounded-xl cursor-pointer" @click="exportAll">Export All</button>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5" ref="categoriesContainer">
      <TaskColumn v-for="category in categories" :key="category.value" :title="category.title"
        :category="category.value" :tasks="getTasksByCategory(category.value)" @delete-task="deleteTask"
        @toggle-task="toggleTask" @reorder-task="reorderTask" @move-task="moveTask" @edit-task="editTask"/>
      </div>
  </main>
</template>