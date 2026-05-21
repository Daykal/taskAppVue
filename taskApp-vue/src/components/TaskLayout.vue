<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TaskList from '@/components/TaskList.vue'
import TaskModalWrapper from '@/components/TaskModalWrapper.vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()

const myTaskStats = computed(() => ({
  all: tasksStore.totalTasksCount,
  today: tasksStore.tasks.filter((t) => t.dueDate === 'Today').length,
  scheduled: tasksStore.tasks.filter((t) => t.dueDate && t.dueDate !== 'Today').length,
  completed: tasksStore.completedTasks.length,
}))

const isFormOpen = ref(false)
const handleSubmitForm = async (formData: {
  title: string
  description: string
  priority: string
  dueDate: string
}) => {
  try {
    await tasksStore.addTask(
      formData.title || '',
      formData.description || '',
      formData.priority || 'Medium',
      formData.dueDate || '',
    )
    console.log('Form submitted and store updated!')
    isFormOpen.value = false
  } catch (err) {
    console.error('Failed to submit form:', err)
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="md:hidden flex justify-center mt-4">
      <button
        @click="isFormOpen = true"
        class="w-fit sm:w-auto hover:scale-105 transition-transform bg-green-300 rounded-xl px-2 py-2"
      >
        Create Task
      </button>
    </div>

    <Sidebar class="hidden md:block" :stats="myTaskStats"></Sidebar>
    <main class="w-full bg-gray-200 border-rose-300 rounded-xl">
      <TaskList :tasks="tasksStore.tasks"></TaskList>
    </main>
    <div class="hidden md:block fixed bottom-16 right-16 z-40">
      <button
        @click="isFormOpen = true"
        class="shadow-lg hover:scale-105 transition-transform pi pi-file-plus text-4xl p-8 rounded-full bg-green-300"
      ></button>
    </div>
  </div>
  <TaskModalWrapper
    v-if="isFormOpen"
    title="Create New Task"
    submit-label="Save"
    @submit="handleSubmitForm"
    @close="isFormOpen = false"
  />
</template>
