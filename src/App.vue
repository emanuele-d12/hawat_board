<script setup lang="ts">
import { ref } from 'vue';
import NewTask from './components/NewTask.vue'
import ListTasks from './components/ListTasks.vue'

import type {Task} from './types/task'

const tasks = ref<Task[]>([])

function handleAddTask(task: Task){
  tasks.value.push(task)
}

function deleteTask(taskToDelete: Task){
  tasks.value = tasks.value.filter(task => task !== taskToDelete)
}

function toggleTask(taskToToggle: Task){
  taskToToggle.completed = !taskToToggle.completed
}
</script>

<template>
  <main class="min-h-screen p-8">
    <NewTask @add-task="handleAddTask"/>
    <ListTasks 
      :tasks="tasks"
      @delete-task="deleteTask"
      @toggle-task="toggleTask"
      />
  </main>
</template>