<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TaskList from '@/components/TaskList.vue';

const myTaskStats = ref({
  all: 13,
  today: 3,
  scheduled: 1,
  completed: 8,
})
const taskList = ref([
  {
    id: "task-1",
    title: "Finish Vue Dashboard Layout",
    dueDate: "Today",
    isCompleted: false
  },
  {
    id: "task-2",
    title: "Review Pull Requests",
    dueDate: "Tomorrow",
    isCompleted: true
  },
  {
    id: "task-3",
    title: "Gym Session (Leg Day)",
    dueDate: "May 22, 2026",
    isCompleted: false
  },
  {
    id: "task-4",
    title: "Buy Groceries & Meal Prep",
    dueDate: "May 24, 2026",
    isCompleted: false
  }
])
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8">

    <div class="block md:hidden mb-4 flex justify-center border">
      <Button class="w-fit sm:w-auto hover:scale-105 transition-transform">Create Task</Button>
    </div>

    <Sidebar class="hidden md:block" :stats="myTaskStats"></Sidebar>
    <main class="w-full bg-amber-200 border-rose-300 rounded-xl">
        <TaskList :tasks="taskList"></TaskList>
    </main>
<div class="hidden md:block fixed bottom-16 right-16 z-40">
      <Button class="shadow-lg hover:scale-105 transition-transform pi pi-file-plus text-4xl p-8 rounded-full"></Button>
    </div> </div>
</template>
