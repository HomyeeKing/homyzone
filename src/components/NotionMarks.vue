<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Notion 配置 - 需要替换
const NOTION_API_KEY = '' // 从 Notion Integration 获取
const NOTION_DATABASE_ID = '' // 你的豆瓣数据库 ID

interface NotionMark {
  id: string
  title: string
  cover?: string
  rating?: number
  date: string
  type: 'movie' | 'tv'
  url?: string
}

const marks = ref<NotionMark[]>([])
const loading = ref(true)
const error = ref('')

// 获取 Notion 数据
const fetchMarks = async () => {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    error.value = 'Notion 配置未设置'
    loading.value = false
    return
  }

  try {
    loading.value = true
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending'
          }
        ],
        page_size: 20
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Notion data')
    }

    const data = await response.json()
    
    // 解析 Notion 数据
    marks.value = data.results.map((page: any) => {
      const properties = page.properties
      return {
        id: page.id,
        title: properties['标题']?.title?.[0]?.text?.content || 'Untitled',
        cover: page.cover?.external?.url || page.cover?.file?.url,
        rating: properties['个人评分']?.number,
        date: page.created_time,
        type: properties['类型']?.select?.name?.toLowerCase()?.includes('tv') ? 'tv' : 'movie',
        url: page.url,
      }
    })
  } catch (err) {
    error.value = '加载失败，请检查 Notion 配置'
    console.error('Notion fetch error:', err)
  } finally {
    loading.value = false
  }
}

// 按类型分组
const groupedMarks = computed(() => {
  const groups: Record<string, NotionMark[]> = {
    movie: [],
    tv: [],
  }

  marks.value.forEach((mark) => {
    if (groups[mark.type]) {
      groups[mark.type].push(mark)
    }
  })

  return groups
})

// 格式化日期
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// 获取评分星星
const getStars = (rating: number) => {
  return '★'.repeat(Math.floor(rating / 2)) + (rating % 2 === 1 ? '½' : '')
}

onMounted(() => {
  fetchMarks()
})
</script>

<template>
  <div class="notion-marks">
    <!-- 配置提示 -->
    <div v-if="!NOTION_API_KEY || !NOTION_DATABASE_ID" class="py-8 text-center">
      <div class="font-serif text-[var(--color-muted)]">
        <p class="text-lg mb-2">Notion 配置未完成</p>
        <p class="text-sm mb-4">需要设置 API Key 和 Database ID</p>
        <a 
          href="https://www.notion.so/my-integrations" 
          target="_blank"
          class="text-[var(--color-accent)] hover:underline"
        >
          创建 Notion Integration →
        </a>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else-if="loading" class="py-8 text-center">
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

    <!-- 电影 -->
    <div v-if="groupedMarks.movie.length > 0" class="mb-8">
      <h3 class="font-serif text-xl text-[var(--color-primary)] mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">🎬</span>
        电影
        <span class="text-sm text-[var(--color-muted)]">({{ groupedMarks.movie.length }})</span>
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <a
          v-for="mark in groupedMarks.movie.slice(0, 10)"
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
            <!-- 评分 -->
            <div v-if="mark.rating" class="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded font-serif">
              {{ getStars(mark.rating) }}
            </div>
          </div>
          <h4 class="font-serif text-sm text-[var(--color-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
            {{ mark.title }}
          </h4>
          <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.date) }}</p>
        </a>
      </div>
    </div>

    <!-- 剧集 -->
    <div v-if="groupedMarks.tv.length > 0" class="mb-8">
      <h3 class="font-serif text-xl text-[var(--color-primary)] mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">📺</span>
        剧集
        <span class="text-sm text-[var(--color-muted)]">({{ groupedMarks.tv.length }})</span>
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <a
          v-for="mark in groupedMarks.tv.slice(0, 10)"
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
            <!-- 评分 -->
            <div v-if="mark.rating" class="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded font-serif">
              {{ getStars(mark.rating) }}
            </div>
          </div>
          <h4 class="font-serif text-sm text-[var(--color-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
            {{ mark.title }}
          </h4>
          <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.date) }}</p>
        </a>
      </div>
    </div>

    <!-- 查看更多链接 -->
    <div v-if="marks.length > 0" class="text-center mt-6">
      <a
        href="https://notion.so"
        target="_blank"
        rel="noopener noreferrer"
        class