<script setup lang="ts">
import { ref } from 'vue';

import type { TaskPayload, Category } from '../types/task'

const taskTitle = ref<string>('')
const selectedCategory = ref<Category>('backlog')


const categories: {
    label: String
    value: Category
}[] = [
        {
            label: 'Quotidiane',
            value: 'daily',
        }, {
            label: 'Questa settimana',
            value: 'weekly',
        }, {
            label: 'Backlog',
            value: 'backlog',
        }
    ]

const emit = defineEmits<{
    (e: 'add-task', payload: TaskPayload): void
}>()

function addTask() {
    if (!taskTitle.value.trim()) return

    emit('add-task', {
        title: taskTitle.value,
        category: selectedCategory.value,
        completed: false
    })

    taskTitle.value = ''
}

</script>

<template>
    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 md:p-6 max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-5 text-gray-800">
            Nuova Task
        </h2>

        <div class="flex flex-col gap-4">
            <input v-model="taskTitle" type="text" placeholder="Inserisci un task..."
                class="w-full rounded-2xl border border-gray-300 mb-5 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">


        </div>


        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button v-for="category in categories" :key="category.value" @click="selectedCategory = category.value"
                class="w-full px-4 py-2 rounded-2xl border transition font-medium text-center" :class="selectedCategory === category.value
                    ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    ">
                {{ category.label }}
            </button>

            
        </div>
        <button @click="addTask"
            class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold mt-6 px-6 py-3 rounded-2xl transition shadow-sm">
            Aggiungi Task
        </button>
    </div>
</template>