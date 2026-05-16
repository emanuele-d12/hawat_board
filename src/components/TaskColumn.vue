<script setup lang="ts">
import {ref, onMounted } from 'vue'
import Sortable from 'sortablejs' 

import type { Task, Category } from '../types/task'

const props = defineProps<{
    title: string
    tasks: Task[]
    category: Category
}>()

const emit = defineEmits<{
    (e: 'edit-task',   task: Task): void
    (e: 'delete-task', task: Task): void
    (e: 'toggle-task', task: Task): void
    (e: 'reorder-task', payload: {
            oldIndex: number
            newIndex: number
            category: string
    }): void
    (e: 'move-task', payload: {
            taskId: string
            newIndex: number
            newCategory: string
    }): void
}>()

const taskContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    if(!taskContainer.value) return

    Sortable.create(taskContainer.value, {
        animation:150,
        group:'tasks',
        onAdd(event){
            const taskId = 
                event.item.getAttribute('data-task-id')

            if (!taskId) return

            emit('move-task', {
                taskId,
                newCategory: props.category,
                newIndex: event.newIndex ?? 0
            })
        },
        onEnd(event){
            if(
                event.oldIndex == null ||
                event.newIndex == null 
            ) {
                return
            }
            emit('reorder-task', {
                oldIndex: event.oldIndex,
                newIndex: event.newIndex,
                category: props.category
            })
        }
    }
    )
})
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-200 shadow-sm">
        <!-- HEADER -->
        <div class="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-800">
                {{ title }}
            </h2>

            <span class="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {{ tasks.length }}
            </span>
        </div>

        <!-- BODY -->

        <div ref="taskContainer" class="p-5 space-y-3 min-h-[400px]">
            <div v-for="(task, index) in tasks" :key="task.id" :data-task-id="task.id"
                class="p-3 rounded-2xl border bg-gray-50 hover:bg-white transition" :class="task.completed 
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200'"
                    @dblclick="emit('edit-task', task)">
                <div class="flex items-center justify-between gap-3">

                    <span class="font-medium" :class="task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'">
                        {{ task.title }}
                    </span>

                    <div class="flex gap-2">

                        <button @click="emit('toggle-task', task)"
                            class="w-8 h-8 rounded-lg bg-green-500 text-white hover:scale-105 transition">
                            ✓
                        </button>

                        <button @click="emit('delete-task', task)"
                            class="w-8 h-8 rounded-lg bg-red-500 text-white hover:scale-105 transition">
                            ×
                        </button>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>