<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isDark } from '@/logics'

const route = useRoute()
const activeTab = ref<'giscus' | 'disqus'>('disqus') // 默认 Disqus
const giscusContainer = ref<HTMLElement>()
const disqusContainer = ref<HTMLElement>()
const isLoading = ref(true)

// GitHub 配置
const REPO = 'HomyeeKing/homyzone'
const REPO_ID = 'MDEwOlJlcG9zaXRvcnkzNDA2MTA5MTA='
const CATEGORY = 'Announcements'
const CATEGORY_ID = 'DIC_kwDOFE1PXs4C4hhi'

// Disqus 配置
const DISQUS_SHORTNAME = 'homyzone'

const loadGiscus = () => {
  if (!giscusContainer.value) return
  giscusContainer.value.innerHTML = ''
  isLoading.value = true

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', REPO)
  script.setAttribute('data-repo-id', REPO_ID)
  script.setAttribute('data-category', CATEGORY)
  script.setAttribute('data-category-id', CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '1')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '1')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'eager')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = false

  script.onload = () => {
    isLoading.value = false
  }

  giscusContainer.value.appendChild(script)
}

const loadDisqus = () => {
  if (!disqusContainer.value) return
  isLoading.value = true

  // 重置 Disqus
  if (window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = route.path
        this.page.url = window.location.href
      }
    })
    isLoading.value = false
    return
  }

  // 首次加载
  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = route.path
  }

  const script = document.createElement('script')
  script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`
  script.setAttribute('data-timestamp', Date.now().toString())
  script.async = true

  script.onload = () => {
    // Disqus 加载完成需要等待其内部初始化
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }

  disqusContainer.value.appendChild(script)
}

const switchTab = (tab: 'giscus' | 'disqus') => {
  activeTab.value = tab
  if (tab === 'giscus') {
    loadGiscus()
  } else {
    loadDisqus()
  }
}

onMounted(() => {
  // 默认加载 Disqus
  loadDisqus()
})

// 路由变化时重新加载
watch(() => route.path, () => {
  if (activeTab.value === 'giscus') {
    loadGiscus()
  } else {
    loadDisqus()
  }
})

declare global {
  interface Window {
    DISQUS?: any
    disqus_config?: any
  }
}
</script>

<template>
  <div class="mt-12 pt-8 border-t border-[var(--color-secondary)]/10">
    <!-- 标题 -->
    <div class="text-center mb-6">
      <div class="flex items-center justify-center gap-4">
        <div class="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
        <span class="font-serif text-sm text-[var(--color-muted)]">Leave a comment</span>
        <div class="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
      </div>
    </div>

    <!-- 切换标签 -->
    <div class="flex justify-center mb-6">
      <div class="inline-flex rounded-xl bg-[var(--color-warm)]/20 p-1">
        <button
          @click="switchTab('disqus')"
          class="px-6 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === 'disqus'
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          Disqus
        </button>
        <button
          @click="switchTab('giscus')"
          class="px-6 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === 'giscus'
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          Giscus
        </button>
      </div>
    </div>

    <!-- 骨架屏 -->
    <div v-if="isLoading" class="comments-skeleton">
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

    <!-- Giscus -->
    <div v-show="activeTab === 'giscus' && !isLoading" ref="giscusContainer" class="giscus-container min-h-[200px]"></div>

    <!-- Disqus -->
    <div v-show="activeTab === 'disqus' && !isLoading" ref="disqusContainer" class="disqus-container min-h-[200px]">
      <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<style scoped>
.giscus-container,
.disqus-container {
  min-height: 200px;
}

/* 骨架屏样式 */
.comments-skeleton {
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
