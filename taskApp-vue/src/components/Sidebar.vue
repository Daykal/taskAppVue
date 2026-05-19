<script setup lang="ts">
interface TaskStats {
  all: number
  today: number
  scheduled: number
  completed: number
}

defineProps<{
  stats: TaskStats
}>()

interface SidebarItem {
  key: keyof TaskStats
  label: string
  textColor: string
}

const sidebarItems: SidebarItem[] = [
  { key: 'all', label: 'All Tasks', textColor: 'text-blue-700' },
  { key: 'scheduled', label: 'Scheduled', textColor: 'text-red-600' },
  { key: 'today', label: 'Today', textColor: 'text-yellow-600' },
  { key: 'completed', label: 'Completed', textColor: 'text-green-600' },
]
</script>

<template>
  <aside class="w-full md:w-64 shrink-0 h-screen sticky md:h-[calc(100vh-80px)]">
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-2 h-full flex flex-col justify-between"
    >
      <nav class="space-y-1">
        <div
          v-for="item in sidebarItems"
          :key="item.key"
          :class="[
            'w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium',
            item.textColor,
          ]"
        >
          <span class="capitalize">{{ item.label }}</span>

          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100">
            {{ stats[item.key] }}
          </span>
        </div>
      </nav>
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-2"
      >
        Log Out
      </button>
    </div>
  </aside>
</template>
