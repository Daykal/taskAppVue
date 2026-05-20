<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialValues?: { title: string; dueDate?: string; description: string; priority: string }
  submitLabel: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: { title: string; dueDate?: string }): void,
  (e: 'cancel'): void
}>()

const formData = ref({
  title: props.initialValues?.title || '',
  dueDate: props.initialValues?.dueDate || '',
  description: props.initialValues?.description || '',
  priority: props.initialValues?.priority || 'medium',
})

const todayStr = new Date().toISOString().split('T')[0];
</script>

<template>
  <form @submit.prevent="emit('submit', formData)">
    <div class="space-y-4">
      <div>
        <label class="block text-xs mb-1">Task Title</label>
        <input
          v-model="formData.title"
          type="text"
          class="w-full border p-2 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label class="block text-xs  mb-1">Task Description</label>
        <textarea
          v-model="formData.description"
          type="text"
          rows="4"
          class="w-full border rounded-lg text-sm"
          required
        />
      </div>

      <div>
        <label class="block text-xs mb-1">Due Date</label>
        <input
          v-model="formData.dueDate"
          type="date"
          :min="todayStr"
          class="w-full border p-2 rounded-lg text-sm"
        />
      </div>
      <div>
        <label class="block text-xs font-medium mb-1">Priority</label>
        <select
          v-model="formData.priority"
          class="w-full border p-2.5 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="emit('cancel')"
          class="text-xs px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="text-xs px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
