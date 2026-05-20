<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TaskList from '@/components/TaskList.vue'
import TaskModalWrapper from '@/components/TaskModalWrapper.vue'

const myTaskStats = ref({
  all: 13,
  today: 3,
  scheduled: 1,
  completed: 8,
})
const taskList = ref([
  {
    id: 'task-1',
    title: 'Finish Vue Dashboard Layout',
    dueDate: 'Today',
    isCompleted: false,
  },
  {
    id: 'task-2',
    title: 'Review Pull Requests',
    dueDate: 'Tomorrow',
    isCompleted: true,
  },
  {
    id: 'task-3',
    title: 'Gym Session (Leg Day)',
    dueDate: 'May 22, 2026',
    priority: 'Medium',
    isCompleted: false,
  },
  {
    id: 'task-4',
    title: 'Buy Groceries & Meal Prep',
    dueDate: 'May 24, 2026',
    isCompleted: false,
  },
])

const isFormOpen = ref(false)
const handleSubmitForm = async () => {
  console.log('form submitted')
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
      <TaskList :tasks="taskList"></TaskList>
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
