<script setup lang="ts">
import { ref, watch } from 'vue';

import type { TaskPayload, Category, CategoryData } from '../types/task'
import { defaultPalette } from '../constants/theme';

const taskTitle = ref<string>('')
const selectedCategory = ref<Category>('backlog')
const taskInput = ref<HTMLInputElement | null>(null)

const props = defineProps<{
    categories: CategoryData[]
    editingTaskTitle:string
}>()

const emit = defineEmits<{
    (e: 'add-task', payload: TaskPayload): void
    (e: 'add-category', title: string): void
    (e: 'delete-category', value: string): void
}>()

const isCategoryModalOpen = ref(false)
const newCategoryTitle = ref('')

function addCategory() {
    if (!newCategoryTitle.value.trim()) return

    emit('add-category', newCategoryTitle.value)

    newCategoryTitle.value = ''
    isCategoryModalOpen.value = false
}


function addTask() {
    if (!taskTitle.value.trim()) return

    emit('add-task', {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title: taskTitle.value,
        category: selectedCategory.value,
        completed: false,
        order: Date.now()
    })

    taskTitle.value = ''

    taskInput.value?.focus()
}

watch(
  () => props.editingTaskTitle,
  (newValue) => {
    taskTitle.value = newValue

    taskInput.value?.focus()
  }
)

</script>

<template>
    <div class="rounded-3xl shadow-sm border p-5 md:p-6 max-w-4xl mx-auto" :class="defaultPalette.card_background">
        <h2 class="text-2xl font-bold mb-5 text-gray-800">
            Nuova Task
        </h2>

        <div class="flex flex-col gap-4">
            <input ref="taskInput" v-model="taskTitle" type="text" placeholder="Inserisci un task..." @keydown.enter="addTask" 
                class="w-full rounded-2xl border mb-5 px-4 py-3 outline-none transition" :class="defaultPalette.text_input">


        </div>


        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div 
                v-for="category in categories" 
                :key="category.value" 
                class="flex w-full overflow-hidden rounded-2xl border transition" 
                :class="selectedCategory === category.value
                    ? defaultPalette.label
                    : defaultPalette.button_inactive
                "
            >
              <!-- SELECT CATEGORY -->
                <button
                    @click="selectedCategory = category.value"
                    class="flex-1 px-4 py-2 font-medium transition"
                    :class="
                        selectedCategory === category.value
                        ? defaultPalette.button_secondary
                        : defaultPalette.button_inactive
                    "
                    
                >
                    {{ category.title }}
                </button>
                 <!-- DELETE CATEGORY -->
                  <button
                    @click="emit('delete-category', category.value)"
                    class="px-2 font-bold transition"
                    :class="defaultPalette.close_button"
                  >
                    X
                  </button>
            
            </div>

            <button @click="isCategoryModalOpen = true"
                class="w-full px-4 py-2 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-100 transition">
                +
            </button>
        </div>
        <button @click="addTask"
            class="w-full text-white font-semibold mt-6 px-6 py-3 rounded-2xl transition shadow-sm" :class="defaultPalette.button_primary">
            Aggiungi Task
        </button>
    </div>

    <div v-if="isCategoryModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div class="rounded-3xl p-6 w-full max-w-md" :class="defaultPalette.card_background">

            <h2 class="text-2xl font-bold mb-4">
                Nuova Categoria
            </h2>

            <input v-model="newCategoryTitle" type="text" placeholder="Nome categoria..."
                class="w-full border rounded-2xl px-4 py-3 mb-4 focus:ring-blue-500 outline-none" :class="defaultPalette.text_input">

            <div class="flex gap-3">

                <button @click="isCategoryModalOpen = false" class="flex-1 py-3 rounded-2xl border" :class="defaultPalette.button_inactive">
                    Annulla
                </button>

                <button @click="addCategory" class="flex-1 py-3 rounded-2xl" :class="defaultPalette.button_primary">
                    Aggiungi
                </button>

            </div>
        </div>
    </div>
</template>