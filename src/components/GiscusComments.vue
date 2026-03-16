<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isDark } from '@/logics'

const route = useRoute()
const giscusContainer = ref<HTMLElement>()
const isLoading = ref(true)

// 你的 GitHub 配置
const REPO = 'HomyeeKing/homyzone'
const REPO_ID = 'MDEwOlJlcG9zaXRvcnkzNDA2MTA5MTA='
const CATEGORY = 'Announcements'
const CATEGORY_ID = 'DIC_kwDOFE1PXs4C4hhi'

const loadGiscus = () => {
  if (!giscusContainer.value) return

  // 清除已有内容
  giscusContainer.value.innerHTML = ''
  isLoading.value = true

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', REPO)
  script.setAttribute('data-repo-id', REPO_ID)
  script.setAttribute('data-category', CATEGORY)
  script.setAttribute('data-category-id', CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '1')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'eager') // 改为 eager 预加载
  script.setAttribute('crossorigin', 'anonymous')
  script.async = false // 同步加载，确保直出

  // 监听加载完成
  script.onload = () => {
    isLoading.value = false
  }

  giscusContainer.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

// 路由变化时重新加载
watch(() => route.path, () => {
  loadGiscus()
})
</script>

<template>
  <div class="mt-12 pt-8 border-t border-[var(--color-secondary)]/10">
    <div class="text-center mb-6">
      <div class="flex items-center justify-center gap-4">
        <div class="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
        <span class="font-serif text-sm text-[var(--color-muted)]">评论</span>
        <div class="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
      </div>
    </div>

    <!-- 骨架屏，直出占位 -->
    <div v-if="isLoading" class="giscus-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-line" style="width: 120px;"></div>
      </div>
      <div class="skeleton-line" style="width: 100%;"></div>
      <div class="skeleton-line" style="width: 80%;"></div>
      <div class="skeleton-line" style="width: 60%;"></div>
      <div class="skeleton-actions">
        <div class="skeleton-btn"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>

    <div ref="giscusContainer" class="giscus-container" :class="{ 'is-loading': isLoading }"></div>
  </div>
</template>

<style scoped>
.giscus-container {
  min-height: 200px;
}

.giscus-container.is-loading {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* 骨架屏样式 */
.giscus-skeleton {
  padding: 16px;
  border: 1px solid var(--color-warm);
  border-radius: 12px;
  background: var(--c-bg);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-secondary);
  opacity: 0.2;
}

.skeleton-line {
  height: 16px;
  border-radius: 4px;
  background: var(--color-secondary);
  opacity: 0.15;
  margin-bottom: 12px;
}

.skeleton-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-warm);
}

.skeleton-btn {
  width: 80px;
  height: 32px;
  border-radius: 6px;
  background: var(--color-secondary);
  opacity: 0.2;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
