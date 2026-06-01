<script setup lang="ts">
import { ref } from 'vue';
import { defaultPalette } from '../constants/theme';

const props = defineProps<{
    modalTitle: string,
    openModal: boolean,
}>()

const emit = defineEmits<{
    (e: "confirm-action", payload: string):void
    (e: "modal-open", payload: string):void
}>()

const isModalOpen = ref<boolean>(props.openModal)

</script>

<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div class="rounded-3xl p-6 w-full max-w-md" :class="defaultPalette.card_background">

            <h2 class="text-2xl font-bold mb-4">
                {{ props.modalTitle }}
            </h2>

            <!-- <input ref="categoryInput" v-model="newCategoryTitle" type="text" placeholder="Nome categoria..." @keydown.enter="addCategory"
                class="w-full border rounded-2xl px-4 py-3 mb-4 focus:ring-blue-500 outline-none" :class="defaultPalette.text_input">

            <div class="flex gap-3">

                <button @click="isCategoryModalOpen = false" class="flex-1 py-3 rounded-2xl border" :class="defaultPalette.button_inactive">
                    Annulla
                </button>

                <button @click="addCategory" class="flex-1 py-3 rounded-2xl" :class="defaultPalette.button_primary">
                    Action
                </button> -->

            </div>
        </div>
    </div>
</template>