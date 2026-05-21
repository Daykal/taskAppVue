<script setup lang="ts">
import TaskLayout from '@/components/TaskLayout.vue'
import { useTasksStore } from '@/stores/tasks'
import { onMounted } from 'vue'
const tasksStore = useTasksStore()
onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
<template>
  <TaskLayout
  
  ></TaskLayout>
</template>
