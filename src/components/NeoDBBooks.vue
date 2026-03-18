<script setup lang="ts">
import { ref, computed } from 'vue'
import booksData from '../../public/data/books_all.json'

interface Mark {
  id: string
  title: string
  cover: string
  url: string
  rating?: number
  date: string
  shelf: 'wishlist' | 'complete'
  comment?: string
}

const activeTab = ref<'all' | 'wishlist' | 'complete'>('all')
const currentPage = ref(1)
const itemsPerPage = 20

const marks = computed<Mark[]>(() => {
  return (booksData as any[]).map((item: any) => {
    const doubanUrl = item.douban_url;
    const neodbUrl = `https://neodb.social${item.item?.url || item.url || ''}`;
    
    const coverUrl = item.item?.cover_image_url || item.cover_image_url || '';
    const proxiedCover = coverUrl.replace('https://neodb.social', 'https://img.homyeeking.top');
    
    return {
      id: item.item?.uuid || item.uuid || Math.random().toString(),
      title: item.item?.display_title || item.item?.title || item.title || 'Unknown',
      cover: proxiedCover,
      url: doubanUrl || neodbUrl,
      rating: item.rating_grade || item.rating,
      date: item.created_time || item.date || new Date().toISOString(),
      shelf: item.shelf_type === 'wishlist' ? 'wishlist' : 'complete',
      comment: item.comment_text
    };
  })
})

const filteredMarks = computed(() => {
  if (activeTab.value === 'all') return marks.value
  return marks.value.filter(mark => mark.shelf === activeTab.value)
})

const totalPages = computed(() => Math.ceil(filteredMarks.value.length / itemsPerPage))

const paginatedMarks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMarks.value.slice(start, end)
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

const getStars = (rating: number) => {
  return '★'.repeat(Math.floor(rating / 2)) + (rating % 2 === 1 ? '½' : '')
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const switchTab = (tab: 'all' | 'wishlist' | 'complete') => {
  activeTab.value = tab
  currentPage.value = 1
}
</script>

<template>
  <div class="neodb-books">
    <div class="flex justify-center mb-8">
      <div class="inline-flex rounded-xl bg-[var(--color-warm)]/20 p-1">
        <button
          v-for="tab in [
            { key: 'all', label: `全部 (${stats.all})` },
            { key: 'wishlist', label: `想读 (${stats.wishlist})` },
            { key: 'complete', label: `已读 (${stats.complete})` }
          ]"
          :key="tab.key"
          @click="switchTab(tab.key as 'all' | 'wishlist' | 'complete')"
          class="px-4 py-2 rounded-lg font-serif text-sm transition-all duration-300"
          :class="activeTab === tab.key
            ? 'bg-[var(--color-accent)] text-white shadow-md'
            : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="paginatedMarks.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <a
        v-for="mark in paginatedMarks"
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
          <div v-if="mark.rating" class="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded font-serif">
            {{ getStars(mark.rating) }}
          </div>
          <div class="absolute top-2 left-2 text-xs px-2 py-1 rounded font-serif"
            :class="mark.shelf === 'wishlist' ? 'bg-blue-500/80 text-white' : 'bg-green-500/80 text-white'"
          >
            {{ mark.shelf === 'wishlist' ? '想读' : '已读' }}
          </div>
        </div>
        <h4 class="font-serif text-sm text-[var(--color-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {{ mark.title }}
        </h4>
        <p class="text-xs text-[var(--color-muted)] mt-1">{{ formatDate(mark.date) }}</p>
        <p v-if="mark.comment" class="text-xs text-[var(--color-muted)] mt-2 line-clamp-2 italic">
          "{{ mark.comment }}"
        </p>
      </a>
    </div>

    <div v-else class="py-16 text-center">
      <div class="font-serif text-[var(--color-muted)]">
        <p class="text-lg mb-2">暂无书籍</p>
        <p class="text-sm">去 NeoDB 标记一些书籍吧</p>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 rounded-lg font-serif text-sm transition-all duration-300"
        :class="currentPage === 1 
          ? 'text-[var(--color-muted)] cursor-not-allowed' 
          : 'text-[var(--color-primary)] hover:bg-[var(--color-warm)]'"
      >
        上一页
      </button>
      
      <div class="flex gap-1">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="w-8 h-8 rounded-lg font-serif text-sm transition-all duration-300"
          :class="currentPage === page
            ? 'bg-[var(--color-accent)] text-white'
            : 'text-[var(--color-muted)] hover:bg-[var(--color-warm)] hover:text-[var(--color-primary)]'"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 rounded-lg font-serif text-sm transition-all duration-300"
        :class="currentPage === totalPages 
          ? 'text-[var(--color-muted)] cursor-not-allowed' 
          : 'text-[var(--color-primary)] hover:bg-[var(--color-warm)]'"
      >
        下一页
      </button>
    </div>
    
    <div class="text-center mt-4 text-sm text-[var(--color-muted)] font-serif">
      第 {{ currentPage }} / {{ totalPages }} 页，共 {{ filteredMarks.length }} 本
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
