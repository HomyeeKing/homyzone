<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isDark } from '@/logics'

const route = useRoute()
const giscusContainer = ref<HTMLElement>()

// 你的 GitHub 配置 - 需要到 https://giscus.app 生成
const REPO = 'HomyeeKing/homyzone'
const REPO_ID = 'R_kgDOGXxQqQ' // 从 giscus.app 获取
const CATEGORY = 'Announcements'
const CATEGORY_ID = 'DIC_kwDOGXxQqc4CcxY-' // 从 giscus.app 获取

const loadGiscus = () => {
  if (!giscusContainer.value) return

  // 清除已有内容
  giscusContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', REPO)
  script.setAttribute('data-repo-id', REPO_ID)
  script.setAttribute('data-category', CATEGORY)
  script.setAttribute('data-category-id', CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  giscusContainer.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

// 路由变化时重新加载
watch(() => route.path, () => {
  loadGiscus()
})

// 主题变化时更新
defineExpose({ loadGiscus })
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
    <div ref="giscusContainer" class="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-container {
  min-height: 200px;
}
</style>
