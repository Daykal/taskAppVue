<script setup lang="ts">
import { ref } from 'vue'
import TaskModalWrapper from '@/components/TaskModalWrapper.vue'
import { useTasksStore } from '@/stores/tasks'

interface Task {
  id: string
  title: string
  description: string
  dueDate?: string
  priority: string
  status: string
}

const props = defineProps<{ task: Task }>()
const taskStore = useTasksStore()

const isEditOpen = ref(false)
const taskToEdit = ref({
  title: props.task.title,
  dueDate: props.task.dueDate || '',
  description: props.task.description,
  priority: props.task.priority,
})

interface TaskFormPayload {
  title: string
  description: string
  priority: string
  dueDate: string
  status: string
}

const handleUpdateSubmit = async (updatedData: TaskFormPayload) => {
  await taskStore.updateTask(
    props.task.id,
    updatedData.title,
    updatedData.description,
    updatedData.priority,
    updatedData.dueDate,
    props.task.status,
  )
  taskToEdit.value = { ...updatedData }
  isEditOpen.value = false
}
const handleDeleteTask = async () => {
  try {
    await taskStore.deleteTask(props.task.id)
  } catch (error) {
    console.log(error)
  }
}

const handleCompleteTask = async () => {
  const nextStatus = props.task.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED'
  await taskStore.updateTask(
    props.task.id,
    props.task.title,
    props.task.description,
    props.task.priority,
    props.task.dueDate || '',
    nextStatus,
  )
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
          task.status === 'COMPLETED' ? 'line-through text-green-600' : '',
        ]"
      >
        {{ task.title }}
      </h3>
      <p v-if="task.dueDate" class="text-xs text-gray-600 mt-1">📅 {{ task.dueDate }}</p>
      <p v-if="task.priority" class="text-xs text-gray-600 mt-1">Priority: {{ task.priority }}</p>
    </div>

    <div class="flex justify-end mt-4 gap-2">
      <button
        @click="handleCompleteTask"
        :class="[
          'text-xs px-3 py-1.5 rounded-lg border transition-colors',
          task.status === 'COMPLETED'
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-white border-gray-400 hover:bg-gray-100',
        ]"
      >
        {{ task.status === 'COMPLETED' ? 'Completed' : 'Mark Done' }}
      </button>
      <button
        @click="isEditOpen = true"
        class="text-xs px-2 py-1.5 rounded-lg border border-gray-400 transition-colors hover:bg-gray-100 pi pi-file-edit"
      ></button>
      <button
        @click="handleDeleteTask"
        class="text-xs px-2 py-1.5 rounded-lg border transition-colors text-red-400 hover:bg-red-100 pi pi-trash"
      ></button>
    </div>
  </div>
  <TaskModalWrapper
    v-if="isEditOpen"
    title="Edit Task Details"
    submit-label="Save Changes"
    :initial-values="taskToEdit"
    @submit="handleUpdateSubmit"
    @close="isEditOpen = false"
  />
</template>
