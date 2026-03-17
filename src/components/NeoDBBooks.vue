<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const NEODB_USERNAME = 'homyeeking'
const NEODB_BASE = 'https://neodb.social'

interface Mark {
  id: string
  title: string
  cover: string
  url: string
  shelf: 'wishlist' | 'complete'
}

const marks = ref<Mark[]>([])
const loading = ref(true)
const error = ref('')
const activeTab = ref<'all' | 'wishlist' | 'complete'>('all')

const fetchMarks = async () => {
  try {
    loading.value = true
    const response = await fetch(`${NEODB_BASE}/@${NEODB_USERNAME}`, {
      headers: { 'Accept': 'text/html' }
    })

    if (!response.ok) throw new Error('Failed to fetch')
    
    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    const parsedMarks: Mark[] = []
    
    const headings = doc.querySelectorAll('h5')
    headings.forEach(heading => {
      const text = heading.textContent?.toLowerCase() || ''
      
      // books to read
      if (text.includes('books to read')) {
        const list = heading.nextElementSibling
        if (list) {
          const items = list.querySelectorAll('li')
          items.forEach(item => {
            const link = item.querySelector('a')
            const img = item.querySelector('img')
            
            if (link && img) {
              parsedMarks.push({
                id: link.getAttribute('href') || '',
                title: img.getAttribute('alt') || link.textContent?.trim() || '',
                cover: img.getAttribute('src') || '',
                url: link.getAttribute('href') || '',
                shelf: 'wishlist'
              })
            }
          })
        }
      }
      
      // books completed
      if (text.includes('books completed')) {
        const list = heading.nextElementSibling
        if (list) {
          const items = list.querySelectorAll('li')
          items.forEach(item => {
            const link = item.querySelector('a')
            const img = item.querySelector('img')
            
            if (link && img) {
              parsedMarks.push({
                id: link.getAttribute('href') || '',
                title: img.getAttribute('alt') || link.textContent?.trim() || '',
                cover: img.getAttribute('src') || '',
                url: link.getAttribute('href') || '',
                shelf: 'complete'
              })
            }
          })
        }
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

onMounted(() => {
  fetchMarks()
})
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

    <div v-if="loading" class="py-8 text-center">
      <div class="inline-flex items-center gap-2 text-[var(--color-muted)] font-serif">
        <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>加载中...</span>
      </div>
    </div>

    <div v-else-if="error" class="py-8 text-center text-[var(--color-muted)] font-serif">
      {{ error }}
    </div>

    <div v-else-if="filteredMarks.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <a
        v-for="mark in filteredMarks"
        :key="mark.id"
        :href="`https://neodb.social${mark.url}`"
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
            {{ mark.shelf === 'wishlist' ? '想读' : '已读' }}
          </div>
        </div>
        <h4 class="font-serif text-sm text-[var(--color-primary)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {{ mark.title }}
        </h4>
      </a>
    </div>

    <div v-else class="py-16 text-center">
      <div class="font-serif text-[var(--color-muted)]">
        <p class="text-lg mb-2">暂无书籍</p>
        <p class="text-sm">去 NeoDB 标记一些书籍吧</p>
      </div>
    </div>

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
