<script setup lang="ts">

import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import Sortable from 'sortablejs'
import debounce from 'lodash.debounce'

import { defaultPalette } from './constants/theme.ts'
import NewTask from './components/NewTask.vue'
import TaskColumn from './components/TaskColumn.vue'

import { getBoard, saveBoard } from './services/api.ts';
import type { Task, CategoryData } from './types/task'

const route = useRoute()
const isHydrating = ref(false)

const tasks = ref<Task[]>([])
const categories = ref<CategoryData[]>([])

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
  console.log('deleting category: ', categoryToDelete)
  categories.value = categories.value.filter(category => category.value !== categoryToDelete)
  tasks.value = tasks.value.filter(task => task.category !== categoryToDelete)
}

function deleteTask(taskToDelete: Task) {
  console.log('deleting Task: ', taskToDelete)
  tasks.value = tasks.value.filter(task => task !== taskToDelete)
}

function toggleTask(taskToToggle: Task) {
  taskToToggle.completed = !taskToToggle.completed
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

function updateTask(payload: {
  taskId: string
  title: string
}){

  let taskToEdit = tasks.value.find(task => task.id === payload.taskId)

  if(taskToEdit){
    taskToEdit.title = payload.title
  } else {
    return
  }
}

function exportAll() {

  const rows = categories.value.map(category => {
    const filteredTasks = tasks.value
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

onMounted(() => {

  if (!categoriesContainer.value) return

  Sortable.create(categoriesContainer.value, {
    animation: 200,
    delay: 200,
    touchStartThreshold: 5,
    delayOnTouchOnly: true,

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
  () => route.params.boardId,
  async (boardId) => {

    if (!boardId) return

    // blocco save/watch
    isHydrating.value = true

    try {

      const board = await getBoard(boardId as string)

      // hydrate stato
      tasks.value = board.tasks
      categories.value = board.categories

      // aspetta update reactive Vue
      await nextTick()


    } catch (error) {
      console.log(error)
    } finally {
      isHydrating.value = false
    }
  },
  {
    immediate: true,
  }
)


const debouncedSave = debounce(async () => {
  const uuid = route.params.boardId as string
  
  if (!uuid) return
  try {
    await saveBoard(
      uuid,
      tasks.value,
      categories.value
    )

    console.log('board saved')
  } catch (error) {
    console.error(error)
  }
}, 500)

watch(
   [
    () => tasks.value,
    () => categories.value,
  ],
  () => {

    if (isHydrating.value) return

    debouncedSave()
  },
  {
    deep: true,
  }
)
</script>

<template>
  <main class="min-h-screen p-8" :class="defaultPalette.background">

    <NewTask @add-task="handleAddTask" @add-category="handleAddCategory" @delete-category="deleteCategory"
      :categories="categories" />
    <button class="my-4 p-2 font-bold text-white rounded-xl cursor-pointer" :class="defaultPalette.button_primary" @click="exportAll">Export
      All</button>

    <div class="flex gap-5 mt-5 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3" ref="categoriesContainer">
      <TaskColumn class="shrink-0 w-[80vw] md:w-auto" v-for="category in categories" :key="category.value" :title="category.title"
        :category="category.value" :tasks="getTasksByCategory(category.value)" @delete-task="deleteTask"
        @toggle-task="toggleTask" @reorder-task="reorderTask" @move-task="moveTask" @update-task="updateTask" />
    </div>
  </main>
</template>