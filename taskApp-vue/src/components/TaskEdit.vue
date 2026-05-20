<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'

const emit = defineEmits<{
  (e: 'close'): void
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
        class="absolute top-4 right-4 text-red-300 hover:text-red-600 transition-colors"
      >
        ✕
      </button>
      <h3 class="text-lg font-semibold mb-4">Edit Task</h3>

      <TaskForm
        @cancel="emit('close')"
      />
    </div>
  </div>
</template>
