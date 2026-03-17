<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const NEODB_USERNAME = 'homyeeking'

interface Mark {
  id: string
  title: string
  cover: string
  url: string
  rating?: number
  date: string
  shelf: 'wishlist' | 'complete'
}

const marks = ref<Mark[]>([])
const loading = ref(true)
const error = ref('')
const activeTab = ref<'all' | 'wishlist' | 'complete'>('all')

// 解析 RSS feed
const fetchMarks = async () => {
  try {
    loading.value = true
    // 使用 RSS feed
    const response = await fetch(`https://neodb.social/@${NEODB_USERNAME}@neodb.social/rss/`)
    
    if (!response.ok) throw new Error('Failed to fetch RSS')
    
    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    const items = xmlDoc.querySelectorAll('item')
    const parsedMarks: Mark[] = []
    
    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || ''
      const link = item.querySelector('link')?.textContent || ''
      const description = item.querySelector('description')?.textContent || ''
      const pubDate = item.querySelector('pubDate')?.textContent || ''
      
      // 从 description 中提取封面图片
      const imgMatch = description.match(/<img[^>]+src="([^"]+)"/)
      const cover = imgMatch ? imgMatch[1] : ''
      
      // 只添加电影相关的条目
      if (link.includes('/movie/')) {
        parsedMarks.push({
          id: link,
          title: title.replace(/^[^:]+:\s*/, ''), // 移除前缀
          cover,
          url: link,
          date: pubDate,
          shelf: 'complete'
        })
      }
    })
    
    marks.value = parsedMarks
  } catch (err) {
    error.value = '加载失败'
    console.error('NeoDB fetch error:', err)
  } finally {
    loading.value = false
  }
}

const filteredMarks = computed(() => {
  if (activeTab.value === 'all') return marks.value
  return marks.value.filter(mark => mark.shelf === activeTab.value)
})

const stats = computed(() => ({
  all: marks.value.length,
  wishlist: marks.value.filter(m => m.shelf === 'wishlist').length,
  complete: marks.value.filter(m => m.shelf === 'complete').length
}))

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  fetchMarks()
})
</script>

<template>
  <div class="neodb-movies">
    <!-- 状态筛选 -->
    <div class="flex justify-center mb-8">
      <div class="inline-flex rounded-xl bg-[var(--color-warm)]/20 p-1">
        <button
          v-for="tab in [
            { key: 'all', label: `全部 (${stats.all})` },
            { key: 'wishlist', label: `想看 (${stats.wishlist})` },
            { key: 'complete', label: `已看 (${stats.complete})` }
          ]"
          :key="tab.key"
          @click="activeTab = tab.key as 'all' | 'wishlist' | 'complete'"
          class="px-4 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === tab.key
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="py-8 text-center">
      <div class="inline-flex items-center gap-2 text-[var(--color-muted)] font-serif">
        <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>加载中...</span>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="py-8 text-center text-[var(--color-muted)] font-serif">
      {{ error }}
    </div>

    <!-- 电影列表 -->
    <div v-else-if="filteredMarks.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <a
        v-for="mark in filteredMarks"
        :key="mark.id"
        :href="mark.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group block"
      >
        <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[var(--color-warm)]">
          <img
            v-if="mark.cover"
            :src="mark.cover"
            :alt="mark.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-[var(--color-muted)]">
            <span class="font-serif text-sm">暂无封面</span>
          </div>
          <div class="absolute top-2 left-2 text-xs px-2 py-1 rounded font-serif"
            :class="mark.shelf === 'wishlist' ? 'bg-blue-500/80 text-white' : 'bg-green-500/80 text-white'"
          >
            {{ mark.shelf === 'wishlist' ? '想看' : '已看' }}
          </div>
        </div>
        <h4 class="font-serif text-sm text-[var(--color-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {{ mark.title }}
        </h4>
        <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.date) }}</p>
      </a>
    </div>

    <!-- 空状态 -->
    <div v-else class="py-16 text-center">
      <div class="font-serif text-[var(--color-muted)]">
        <p class="text-lg mb-2">暂无电影</p>
        <p class="text-sm">去 NeoDB 标记一些电影吧</p>
      </div>
    </div>

    <!-- 查看更多 -->
    <div class="text-center mt-6">
      <a
        :href="`https://neodb.social/@${NEODB_USERNAME}`"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 font-serif text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
      >
        在 NeoDB 查看更多
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
