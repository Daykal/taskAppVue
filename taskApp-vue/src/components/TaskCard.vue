<script setup lang="ts">
import { ref } from 'vue'
import TaskEdit from "@/components/TaskEdit.vue"

interface Task {
  id: string
  title: string
  dueDate?: string
  isCompleted: boolean
}

const props = defineProps<{ task: Task }>()

const isEditOpen = ref(false)
const taskToEdit = ref({ ...props.task })

const handleSave = async () => {
  console.log('saved')
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between min-h-30"
  >
    <div>
      <h3
        :class="[
          'font-semibold text-gray-800 text-lg',
          task.isCompleted ? 'line-through text-green-600' : '',
        ]"
      >
        {{ task.title }}
      </h3>
      <p v-if="task.dueDate" class="text-xs text-gray-600 mt-1">📅 {{ task.dueDate }}</p>
    </div>

    <div class="flex justify-end mt-4 gap-2">
      <button
        :class="[
          'text-xs px-3 py-1.5 rounded-lg border transition-colors',
          task.isCompleted
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-white border-gray-400 hover:bg-gray-100',
        ]"
      >
        {{ task.isCompleted ? 'Completed' : 'Mark Done' }}
      </button>
      <button
        @click="isEditOpen=true"
        class="text-xs px-2 py-1.5 rounded-lg border border-gray-400 transition-colors hover:bg-gray-100 pi pi-file-edit"
      ></button>
      <button
        class="text-xs px-2 py-1.5 rounded-lg border transition-colors text-red-400 hover:bg-red-100 pi pi-trash"
      ></button>
      <TaskEdit 
      v-if="isEditOpen" 
      :task="props.task" 
      @close="isEditOpen = false"
    />
    </div>
  </div>
</template>
