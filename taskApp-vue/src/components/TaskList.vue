<script setup lang="ts">
import TaskCard from './TaskCard.vue'

interface Task {
  id: string
  title: string
  description: string
  dueDate?: string
  priority: string
  isCompleted: boolean
}

defineProps<{ tasks: Task[] }>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>
