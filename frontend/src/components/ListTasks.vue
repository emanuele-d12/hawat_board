<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '../types/task'

const props = defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits<{
    (e: 'delete-task', task: Task): void
    (e: 'toggle-task', task: Task): void
}>()

const dailyTasks = computed(() => {
    return props.tasks.filter(task => task.category === 'daily')
})

const weeklyTasks = computed(() => {
    return props.tasks.filter(task => task.category === 'weekly')
})

const backlogTasks = computed(() => {
    return props.tasks.filter(task => task.category === 'backlog')
})


</script>


<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <!-- DAILY -->
        <div class="gb-white rounded-2xl p-4 shadow">
            <h2 class="text-xl font-bold mb-4">Quotidiane</h2>

            <div class="space-y-3">
                <div 
                    v-for="(task, index) in dailyTasks" 
                    :key="index" class="p-3 rounded-2xl border bg-gray-50 hover:bg-white transition cursor-pointer"
                    :class="task.completed"
                    >

                    <div class="flex items-center justify-between gap-3">
                        <span :class="task.completed ? 'line-through' : ''">
                            {{ task.title }}
                        </span>
                        <div class="flex gap-2">
                            <button @click="emit('toggle-task', task)"
                                class="px-2 py-1 rounded bg-emerald-500 text-white text-sm">
                                ✔
                            </button>
                            <button @click="emit('delete-task', task)"
                                class="px-2 py-1 rounded bg-red-500 text-white text-sm">
                                ✕
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- WEEKLY -->
        <div class="gb-white rounded-2xl p-4 shadow">
            <h2 class="text-xl font-bold mb-4">Questa settimana</h2>

            <div class="space-y-3">
                <div 
                    v-for="(task, index) in weeklyTasks" 
                    :key="index" 
                    class="p-3 rounded-2xl border bg-gray-50 hover:bg-white transition cursor-pointer" 
                    :class="task.completed">
                    <div class="flex items-center justify-between gap-3">
                        <span :class="task.completed ? 'line-through' : ''">
                            {{ task.title }}
                        </span>
                        <div class="flex gap-2">
                            <button @click="emit('toggle-task', task)"
                                class="px-2 py-1 rounded bg-emerald-500 text-white text-sm">
                                ✔
                            </button>
                            <button @click="emit('delete-task', task)"
                                class="px-2 py-1 rounded bg-red-500 text-white text-sm">
                                ✕
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BACKLOG -->
        <div class="gb-white rounded-2xl p-4 shadow">
            <h2 class="text-xl font-bold mb-4">BackLog</h2>

            <div class="space-y-3">
                <div 
                    v-for="(task, index) in backlogTasks" 
                    :key="index" 
                    class="p-3 rounded-2xl border bg-gray-50 hover:bg-white transition cursor-pointer" 
                    :class="task.completed">
                    <div class="flex items-center justify-between gap-3">
                        <span :class="task.completed ? 'line-through' : ''">
                            {{ task.title }}
                        </span>
                        <div class="flex gap-2">
                            <button @click="emit('toggle-task', task)"
                                class="px-2 py-1 rounded bg-emerald-500 text-white text-sm">
                                ✔
                            </button>
                            <button @click="emit('delete-task', task)"
                                class="px-2 py-1 rounded bg-red-500 text-white text-sm">
                                ✕
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>