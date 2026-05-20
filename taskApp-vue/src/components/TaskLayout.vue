<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import TaskList from './TaskList.vue';

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
    <Sidebar :stats="myTaskStats"></Sidebar>
    <main class="w-full bg-amber-200 border-rose-300 rounded-xl">
        <TaskList :tasks="taskList"></TaskList>
    </main>
  </div>
</template>
