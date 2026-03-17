<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// NeoDB 配置 - 需要替换为你的用户名
const NEODB_USERNAME = 'homyee' // 替换为你的 NeoDB 用户名
const NEODB_API_BASE = 'https://neodb.social/api'

interface Mark {
  id: string
  item: {
    id: string
    title: string
    cover: string
    url: string
    type: 'movie' | 'tv' | 'book' | 'music'
  }
  rating: number
  created_time: string
  comment?: string
}

const marks = ref<Mark[]>([])
const loading = ref(true)
const error = ref('')

// 获取标记数据
const fetchMarks = async () => {
  try {
    loading.value = true
    // 获取用户的所有标记（包括想看和已看）
    const response = await fetch(`${NEODB_API_BASE}/user/${NEODB_USERNAME}/marks?category=movie,tv,book&page=1`, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch marks')
    }

    const data = await response.json()
    marks.value = data.results || []
  } catch (err) {
    error.value = '加载失败，请稍后重试'
    console.error('NeoDB fetch error:', err)
  } finally {
    loading.value = false
  }
}

// 按类型分组
const groupedMarks = computed(() => {
  const groups: Record<string, Mark[]> = {
    movie: [],
    tv: [],
  }

  marks.value.forEach((mark) => {
    if (groups[mark.item.type]) {
      groups[mark.item.type].push(mark)
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
  <div class="neodb-marks">
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
          :href="mark.item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block"
        >
          <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[var(--color-warm)]">
            <img
              v-if="mark.item.cover"
              :src="mark.item.cover"
              :alt="mark.item.title"
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
            {{ mark.item.title }}
          </h4>
          <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.created_time) }}</p>
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
          :href="mark.item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block"
        >
          <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[var(--color-warm)]">
            <img
              v-if="mark.item.cover"
              :src="mark.item.cover"
              :alt="mark.item.title"
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
            {{ mark.item.title }}
          </h4>
          <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.created_time) }}</p>
        </a>
      </div>
    </div>

    <!-- 查看更多链接 -->
    <div class="text-center mt-6">
      <a
        :href="`https://neodb.social/user/${NEODB_USERNAME}`"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 font-serif text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
      >
        查看更多
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
