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
    (e: 'add-task', payload: TaskPayload) : void
}>()

function addTask() {
    if(!taskTitle.value.trim()) return

    emit('add-task', {
        title: taskTitle.value,
        category: selectedCategory.value,
        completed: false
    })

    taskTitle.value = ''
}

</script>

<template>
    <div class="p-4 border rounded-xl shadow">
        <h2 class="text-xl font-semibold">
            Nuova Task
        </h2>
        <input 
            v-model="taskTitle"
            type="text"
            placeholder="Inserisci un task..."
            class="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
        >

        <div class="flex gap-3">
            <button
                v-for="category in categories"
                :key="category.value"
                @click="selectedCategory = category.value"
                class="px-4 py-2  rounded-xl border transition"
                :class="
                    selectedCategory === category.value
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white hover:bg-gray-100'
                "
            >
            {{ category.label }}
            </button>

            <button
                @click="addTask"
                class="w-full bg-green-500 text-white py-2 rounded-xl"
            >
                Aggiungi
            </button>

        </div>
    </div>
</template>