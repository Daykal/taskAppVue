import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

export interface Task {
  id: string
  title: string
  description: string
  dueDate?: string
  priority: string
  status: string
}

export const useTasksStore = defineStore('tasks', () => {
  // - STATE -
  const tasks = ref<Task[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // - GETTERS -
  const completedTasks = computed(() => tasks.value.filter((task) => task.status === 'COMPLETED'))
  const totalTasksCount = computed(() => tasks.value.length)

  // - ACTIONS -
  async function fetchTasks() {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get<Task[]>('')
      tasks.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tasks'
      console.error('Failed to fetch tasks:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(title: string, description: string, priority: string, dueDate: string) {
    try {
      isLoading.value = true

      const response = await apiClient.post<Task>('', {
        title,
        description,
        priority,
        dueDate,
        isCompleted: false,
      })

      tasks.value.push(response.data)
    } catch (err) {
      console.error('Failed to add task:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updateTask(
    id: string,
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    status: string,
  ) {
    try {
      isLoading.value = true

      const response = await apiClient.put<Task>(`${id}`, {
        title,
        description,
        priority,
        dueDate,
        status,
      })
      const index = tasks.value.findIndex((task) => task.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
    } catch (err) {
      console.log('Failed to update a task', err)
    } finally {
      isLoading.value = false
    }
  }

  async function deleteTask(id: string) {
    try {
      isLoading.value = true

      await apiClient.delete(`/${id}`)

      tasks.value = tasks.value.filter((task) => task.id !== id)
    } catch (err) {
      console.error('Failed to delete a task:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    tasks,
    isLoading,
    error,
    completedTasks,
    totalTasksCount,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  }
})
