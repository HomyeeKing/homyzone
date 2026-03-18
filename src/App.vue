<script setup lang="ts">
import { onMounted } from 'vue'
import VintageLamp from './components/VintageLamp.vue'
import ClickConfetti from './components/ClickConfetti.vue'

// 构建时间戳（用于判断部署版本）
const buildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString()

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
  <ClickConfetti :particle-count="60" :colors="['#c9a86c', '#d4b896', '#8b7355', '#a08060', '#e8d5b7', '#f5e6d3', '#d4a574']">
    <div class="fixed bottom-4 left-4 z-40 font-serif text-xs text-[var(--color-muted)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer px-3 py-2 rounded-lg hover:bg-[var(--color-warm)]/20" :title="'Build: ' + buildTime">
      <span id="busuanzi_container_site_uv">
        <span id="busuanzi_value_site_uv">...</span> 人来过
      </span>
      <!-- 构建版本（鼠标悬停查看） -->
      <span class="hidden">{{ buildTime }}</span>
    </div>
  </ClickConfetti>
</template>
