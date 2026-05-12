<script setup lang="ts">
import { ref, computed } from 'vue';
import NewTask from './components/NewTask.vue'
import TaskColumn from './components/TaskColumn.vue'

import { categories } from "./types/categories"

import type { Task } from './types/task'

const tasks = ref<Task[]>([])

function handleAddTask(task: Task) {
  tasks.value.push(task)
}

function deleteTask(taskToDelete: Task) {
  tasks.value = tasks.value.filter(task => task !== taskToDelete)
}

function toggleTask(taskToToggle: Task) {
  taskToToggle.completed = !taskToToggle.completed
}

const tasksByCategory = computed(() => {
  return categories.map(category => ({
    ...category,
    tasks: tasks.value.filter(
      task => task.category === category.value
    ),
  }))
})
</script>

<template>
  <main class="min-h-screen p-8">
    <NewTask @add-task="handleAddTask" />
    <div class="flex gap-3 mt-5">
      <TaskColumn 
      v-for="category in tasksByCategory" 
        :key="category.value" 
        :title="category.title"
        :category="category.value" 
        :tasks="category.tasks" 
        @delete-task="deleteTask" 
        @toggle-task="toggleTask" />
    </div>
    </main>
</template>