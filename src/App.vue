<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
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
  tasks.value.push(task)
}

function handleAddCategory(title: string) {
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
  tasks.value = tasks.value.filter(task => task !== taskToDelete)
}

function toggleTask(taskToToggle: Task) {
  taskToToggle.completed = !taskToToggle.completed
}


const tasksByCategory = computed(() => {
  return categories.value.map(category => ({
    ...category,
    tasks: tasks.value.filter(
      task => task.category === category.value
    ),
  }))
})

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
  {deep: true}
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

    <NewTask 
      @add-task="handleAddTask" 
      @add-category="handleAddCategory"
      @delete-category="deleteCategory"

      :categories="categories" 
    />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5" ref="categoriesContainer">
      <TaskColumn 
        v-for="category in tasksByCategory" 
        :key="category.value" 
        :title="category.title"
        :category="category.value" 
        :tasks="category.tasks" 
        @delete-task="deleteTask" 
        @toggle-task="toggleTask" 
      />
    </div>
  </main>
</template>