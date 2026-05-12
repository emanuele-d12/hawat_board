<script setup lang="ts">
import { ref, computed } from 'vue';
import NewTask from './components/NewTask.vue'
import TaskColumn from './components/TaskColumn.vue'

import type { Task, CategoryData } from './types/task'

const tasks = ref<Task[]>([])

const categories = ref<CategoryData[]>([
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
</script>

<template>
  <main class="min-h-screen p-8">

    <NewTask 
      @add-task="handleAddTask" 
      @add-category="handleAddCategory"
      @delete-category="deleteCategory"

      :categories="categories" 
    />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
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