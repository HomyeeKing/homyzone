<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router'
import { isClient, useEventListener } from '@vueuse/core'
import { fromDateString } from '@/logics'
import Comments from './Comments.vue'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const { frontmatter } = defineProps<{ frontmatter: any }>()

const navigate = () => {
  if (location.hash)
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
}

if (isClient) {
  useEventListener(window, 'hashchange', navigate)
}

// 获取当前路径的父路径
const parentPath = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  if (parts.length <= 1) return '/'
  return '/' + parts.slice(0, -1).join('/')
})

// 获取同目录下的前后文章
const adjacentPosts = computed(() => {
  const currentPath = route.path
  const parentDir = parentPath.value
  
  // 获取同目录下的所有文章
  const siblingPosts = router
    .getRoutes()
    .filter((r) => !r.meta.frontmatter?.hidden)
    .filter((r) => !r.meta.frontmatter?.isCategory)
    .filter((r) => !r.path.endsWith('.html'))
    .filter((r) => r.path.startsWith(parentDir + '/') && r.path !== parentDir)
    .filter((r) => !r.path.slice(parentDir.length + 1).includes('/')) // 只取直接子级
    .map((r) => ({
      path: r.path,
      title: r.meta.frontmatter?.title || r.path,
      date: r.meta.frontmatter?.date ? new Date(r.meta.frontmatter.date) : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const currentIndex = siblingPosts.findIndex((p) => p.path === currentPath)
  
  return {
    prev: currentIndex > 0 ? siblingPosts[currentIndex - 1] : null,
    next: currentIndex < siblingPosts.length - 1 ? siblingPosts[currentIndex + 1] : null,
  }
})
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
    <div v-if="frontmatter.display || frontmatter.title" class="prose mb-8 max-w-none">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl">
        {{ frontmatter.title }}
      </h1>
      <p v-if="frontmatter.date" class="text-gray-300 text-sm sm:text-base">
        {{ `${fromDateString(frontmatter.date)} · ${frontmatter.duration} ` }}
      </p>
    </div>
    <img v-if="frontmatter.hero_image" :src="frontmatter.hero_image" alt="hero_image" 
      class="w-full h-auto max-h-64 sm:max-h-80 lg:max-h-96 object-cover mb-5 rounded-lg">

    <slot />

    <!-- 前后文章导航 -->
    <div v-if="route.path !== '/'" class="my-8 flex justify-between items-center border-t border-[var(--color-warm)]/30 pt-6">
      <router-link 
        v-if="adjacentPosts.prev" 
        :to="adjacentPosts.prev.path"
        class="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        <span class="text-lg">←</span>
        <span class="line-clamp-1 max-w-[150px]">{{ adjacentPosts.prev.title }}</span>
      </router-link>
      <span v-else class="invisible">占位</span>
      
      <router-link 
        v-if="adjacentPosts.next" 
        :to="adjacentPosts.next.path"
        class="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        <span class="line-clamp-1 max-w-[150px]">{{ adjacentPosts.next.title }}</span>
        <span class="text-lg">→</span>
      </router-link>
      <span v-else class="invisible">占位</span>
    </div>

    <!-- 评论系统 -->
    <Comments v-if="route.path !== '/'" />
  </div>
</template>
