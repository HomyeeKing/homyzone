<script setup lang="ts">
import { onMounted } from 'vue'
import VintageLamp from './components/VintageLamp.vue'

// 不蒜子统计
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  script.async = true
  document.body.appendChild(script)
})
</script>

<template>
  <Nav />
  <main class="text-gray-700 dark:text-gray-200">
    <router-view />
  </main>
  <!-- 复古台灯 - 全局显示 -->
  <VintageLamp />
  
  <!-- 站点统计 - 不蒜子 -->
  <div class="fixed bottom-4 left-4 z-40 font-serif text-xs text-[var(--color-muted)] opacity-60 hover:opacity-100 transition-opacity">
    <span id="busuanzi_container_site_uv">
      <span id="busuanzi_value_site_uv">...</span> 人来过
    </span>
  </div>
</template>
