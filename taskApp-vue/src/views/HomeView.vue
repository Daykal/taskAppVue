<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import { ref } from 'vue';

const myTaskStats = ref({
  all: 12,
  today: 3,
  scheduled: 1,
  completed: 8
})

</script>
<template>
    <Sidebar :stats="myTaskStats"></Sidebar>
</template>