<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isDark } from '@/logics'

const route = useRoute()
const activeTab = ref<'giscus' | 'disqus'>('giscus')
const giscusContainer = ref<HTMLElement>()
const disqusContainer = ref<HTMLElement>()

// GitHub 配置
const REPO = 'HomyeeKing/homyzone'
const REPO_ID = 'MDEwOlJlcG9zaXRvcnkzNDA2MTA5MTA='
const CATEGORY = 'Announcements'
const CATEGORY_ID = 'DIC_kwDOFE1PXs4C4hhi'

// Disqus 配置 - 需要到 https://disqus.com 注册
const DISQUS_SHORTNAME = 'homyzone' // 替换为你的 Disqus shortname

const loadGiscus = () => {
  if (!giscusContainer.value) return
  giscusContainer.value.innerHTML = ''

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

  giscusContainer.value.appendChild(script)
}

const loadDisqus = () => {
  if (!disqusContainer.value) return

  // 重置 Disqus
  if (window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = route.path
        this.page.url = window.location.href
      }
    })
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
  loadGiscus()
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
          @click="switchTab('giscus')"
          class="px-6 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === 'giscus'
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          Giscus
        </button>
        <button
          @click="switchTab('disqus')"
          class="px-6 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === 'disqus'
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          Disqus
        </button>
      </div>
    </div>

    <!-- Giscus -->
    <div v-show="activeTab === 'giscus'" ref="giscusContainer" class="giscus-container min-h-[200px]"></div>

    <!-- Disqus -->
    <div v-show="activeTab === 'disqus'" ref="disqusContainer" class="disqus-container min-h-[200px]">
      <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<style scoped>
.giscus-container,
.disqus-container {
  min-height: 200px;
}
</style>
