<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import Sortable from 'sortablejs'

import type { Task, Category } from '../types/task'
import { defaultPalette } from '../constants/theme';

const props = defineProps<{
    title: string
    tasks: Task[]
    category: Category
}>()

const emit = defineEmits<{
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
    (e: 'update-task', payload: {
        taskId: string
        title: string
    }): void
}>()

const taskContainer = ref<HTMLElement | null>(null)
const editingTaskId = ref<string | null>(null)
const editingTitle = ref('')
const editInput = ref<HTMLInputElement | null>(null)

function setEditInput(el: any) {
    editInput.value = el as HTMLInputElement | null
}

async function startEdit(task: Task) {
    editingTaskId.value = task.id
    editingTitle.value = task.title

    await nextTick()

    editInput.value?.focus()
}

function saveEdit(task: Task) {
    const title = editingTitle.value.trim()

    if (!title || editingTitle.value === task.title.trim()) {
        editingTaskId.value = null
        editingTitle.value = ''
        return
    }


    emit('update-task', {
        taskId: task.id,
        title
    })

    editingTaskId.value = null
    editingTitle.value = ''
}

function exportTasks() {
    const content = props.tasks
        .map(task => {
            return `${task.title}`
        })
        .join('\n')

    const blob = new Blob([content], {
        type: 'text/plain',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${props.category}.txt`
    link.click()
    URL.revokeObjectURL(url)
}

onMounted(() => {
    if (!taskContainer.value) return

    Sortable.create(taskContainer.value, {
        animation: 150,
        group: 'tasks',
        onAdd(event) {
            const taskId =
                event.item.getAttribute('data-task-id')

            if (!taskId) return

            emit('move-task', {
                taskId,
                newCategory: props.category,
                newIndex: event.newIndex ?? 0
            })
        },
        onEnd(event) {
            if (
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
    <div class="rounded-3xl border shadow-sm" :class="defaultPalette.card_background">
        <!-- HEADER -->
        <div class="flex items-center justify-between p-5 border-b rounded-t-3xl" :class="defaultPalette.card_header">
            <h2 class="text-lg font-semibold text-gray-800">
                {{ title }}
            </h2>
            <div class="flex gap-3">

                <span class="text-sm px-3 py-1 rounded-full" :class="defaultPalette.background">
                    {{ tasks.length }}
                </span>

                <button @click="exportTasks"
                    class="text-xs px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-100">
                    export
                </button>
            </div>
        </div>

        <!-- BODY -->

        <div ref="taskContainer" class="p-5 space-y-3 min-h-[400px]">
            <div v-for="(task, index) in tasks" :key="task.id" :data-task-id="task.id"
                class="p-3 rounded-2xl border transition" :class="task.completed
                    ? defaultPalette.completed_task_label
                    : defaultPalette.task_label">
                <div class="flex items-center justify-between gap-3" :data-index="index" @dblclick="startEdit(task)">

                    <span v-if="editingTaskId !== task.id" class="font-medium"
                        :class="task.completed ? 'line-through' : 'text-gray-800'">
                        {{ task.title }}
                    </span>

                    <input v-else :ref="setEditInput" v-model="editingTitle" @keyup.enter="saveEdit(task)"
                        @blur="saveEdit(task)" @keyup.esc="editingTaskId = null"
                        class="w-full rounded-2xl p-4 outline-none transition bg-amber-100" />

                    <div class="flex gap-2">

                        <button @click="startEdit(task)" class="w-8 h-8 rounded-lg transition"
                            :class="defaultPalette.check_button">
                            ✎
                        </button>
                        <button @click="emit('toggle-task', task)" class="w-8 h-8 rounded-lg transition"
                            :class="defaultPalette.check_button">
                            ✓
                        </button>

                        <button @click="emit('delete-task', task)" class="w-8 h-8 rounded-lg transition"
                            :class="defaultPalette.close_button">
                            ×
                        </button>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>