<script setup lang="ts">
import VintageLamp from './components/VintageLamp.vue'
</script>

<template>
  <Nav />
  <main class="text-gray-700 dark:text-gray-200">
    <router-view />
  </main>
  <!-- 复古台灯 - 全局显示 -->
  <VintageLamp />
</template>
