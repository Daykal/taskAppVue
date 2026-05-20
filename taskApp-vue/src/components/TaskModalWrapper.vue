<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

const props = defineProps<{
  title: string // e.g., "Create Task" or "Edit Task"
  initialValues?: { title: string; dueDate?: string; description: string; priority: string }
  submitLabel: string // e.g., "Save" or "Create"
}>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div @click="emit('close')" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <div
      class="relative bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-full md:w-1/2 max-w-2xl min-w-75"
    >
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
      >
        ✕
      </button>
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <TaskForm
        :initial-values="initialValues"
        :submit-label="submitLabel"
        @submit="(formData) => emit('submit', formData)"
        @close="emit('close')"
      />
      
    </div>
  </div>
</template>
