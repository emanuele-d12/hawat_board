<script setup lang="ts">

import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import Sortable from 'sortablejs'
import debounce from 'lodash.debounce'

import { defaultPalette } from './constants/theme.ts'
import NewTask from './components/NewTask.vue'
import TaskColumn from './components/TaskColumn.vue'

import { getBoard, saveBoard } from './services/api.ts';
import type { Task } from './types/task'
import { Board } from './domain/Board.ts';

import { CommandBus } from './commands/CommandBus.ts';
import { AddTaskCommand } from './commands/AddTaskCommand.ts';

const commandBus = new CommandBus();

const route = useRoute()
const isHydrating = ref(false)

const board = ref(new Board([], []))

const categoriesContainer = ref<HTMLElement | null>(null)


function handleAddTask(task: Task) {
  commandBus.execute(
    new AddTaskCommand(
      board.value,
      task
    )
  )
}

function deleteTask(taskToDelete: Task) {
  board.value.deleteTask(taskToDelete)
}

function handleAddCategory(title: string) {
  board.value.addCategory(title)
}

function deleteCategory(categoryToDelete: string) {
  board.value.deleteCategory(categoryToDelete)
}


function toggleTask(taskToToggle: Task) {
  board.value.toggleTask(taskToToggle)
}


function reorderTask(payload: {
  oldIndex: number
  newIndex: number
  category: string
}) {
  board.value.reorderTask(payload)
}

function moveTask(payload: {
  taskId: string
  newIndex: number
  newCategory: string
}) {
  board.value.moveTask(payload)
}

function updateTask(payload: {
  taskId: string
  title: string
}) {
  board.value.updateTask(payload)
}

function exportAll() {
  board.value.exportAll()
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

      const updatedCategories = [...board.value.categories]

      const movedCategory =
        updatedCategories.splice(event.oldIndex, 1)[0]

      updatedCategories.splice(
        event.newIndex,
        0,
        movedCategory
      )

      board.value.categories = updatedCategories
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
      board.tasks = board.tasks
      board.categories = board.categories

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
      board.value.tasks,
      board.value.categories
    )

    console.log('board saved')
  } catch (error) {
    console.error(error)
  }
}, 500)

watch(
  [
    () => board.value.tasks,
    () => board.value.categories,
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
      :categories="board.categories" />
    <button class="my-4 p-2 font-bold text-white rounded-xl cursor-pointer" :class="defaultPalette.button_primary"
      @click="exportAll">Export
      All</button>

    <div class="flex gap-5 mt-5 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3" ref="categoriesContainer">
      <TaskColumn class="shrink-0 w-[80vw] md:w-auto" v-for="category in board.categories" :key="category.value"
        :title="category.title" :category="category.value" :tasks="board.getTasksByCategory(category.value)"
        @delete-task="deleteTask" @toggle-task="toggleTask" @reorder-task="reorderTask" @move-task="moveTask"
        @update-task="updateTask" />
    </div>
  </main>
</template>