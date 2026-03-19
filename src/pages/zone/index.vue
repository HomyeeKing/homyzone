<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import posts from './posts.json'
import Comments from '@/components/Comments.vue';

const isVisible = ref(false);
const viewMode = ref<'sticky' | 'card'>('sticky');
const timeFilter = ref<'all' | 'year' | 'month' | 'week'>('all');

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// 根据时间筛选过滤文章
const filteredPosts = computed(() => {
  const now = new Date();
  const filtered = posts.filter((post) => {
    const postDate = new Date(post.date);
    
    switch (timeFilter.value) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return postDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return postDate >= monthAgo;
      case 'year':
        // 只显示当前年份的文章
        return postDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });
  
  // 按时间倒序排列（最新的在前面）
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// 按年份分组，每个年份内的文章保持时间倒序
const groupedPosts = computed(() => {
  const groups: Record<string, typeof posts> = {};
  
  // 遍历已按时间倒序排列的文章
  filteredPosts.value.forEach((post) => {
    const year = post.date.split('-')[0];
    if (!groups[year]) {
      groups[year] = [];
    }
    // 保持原有顺序（已经是倒序）
    groups[year].push(post);
  });
  
  // 年份倒序，但每个年份内的文章保持时间倒序
  return Object.keys(groups)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .reduce((acc, year) => {
      acc[year] = groups[year];
      return acc;
    }, {} as Record<string, typeof posts>);
});

// 获取年份列表（倒序）
const years = computed(() => {
  return Object.keys(groupedPosts.value).sort((a, b) => parseInt(b) - parseInt(a));
});

// 便签颜色
const stickyColors = [
  { bg: '#fef9e7', border: '#f4e4bc', shadow: '#f4e4bc' },
  { bg: '#fdf2e9', border: '#e8d5c4', shadow: '#e8d5c4' },
  { bg: '#f5f0e8', border: '#d4c4a8', shadow: '#d4c4a8' },
  { bg: '#f0e8e0', border: '#c9b8a8', shadow: '#c9b8a8' },
  { bg: '#e8f4f0', border: '#b8d4c8', shadow: '#b8d4c8' },
  { bg: '#f4e8e8', border: '#d4b8b8', shadow: '#d4b8b8' },
  { bg: '#fff8e1', border: '#ffe0b2', shadow: '#ffe0b2' },
  { bg: '#e3f2fd', border: '#bbdefb', shadow: '#bbdefb' },
];

const getStickyColor = (index: number) => stickyColors[index % stickyColors.length];

// 随机旋转角度和偏移 - 模拟随意贴放的效果
const getRandomStyle = (index: number) => {
  // 基于索引生成伪随机但一致的角度和偏移
  const rotations = [-3, -2, -1, 0, 1, 2, 3, -2.5, 2.5, 1.5];
  const xOffsets = [-4, -2, 0, 2, 4, -3, 3, -1, 1, 0];
  const yOffsets = [-2, 0, 2, -1, 1, -3, 3, 0, 2, -2];
  
  const rotIndex = (index * 3) % rotations.length;
  const xIndex = (index * 7) % xOffsets.length;
  const yIndex = (index * 5) % yOffsets.length;
  
  return {
    rotation: rotations[rotIndex],
    xOffset: xOffsets[xIndex],
    yOffset: yOffsets[yIndex],
  };
};

const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const formatFullDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};
</script>

<template>
  <div class="min-h-screen w-full relative overflow-hidden bg-[var(--c-bg)]">
    <!-- 背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full opacity-20">
        <div class="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-amber-200/30 via-orange-100/15 to-transparent rounded-full blur-[100px]"></div>
      </div>
    </div>

    <div class="relative px-4 sm:px-8 lg:px-12 py-8 transition-all duration-1000 ease-out"
         :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">

      <!-- 控制栏 -->
      <div class="max-w-6xl mx-auto mb-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- 时间筛选 -->
          <div class="flex items-center gap-1 bg-[var(--color-warm)]/30 rounded-full p-1">
            <button v-for="f in ['all','year','month','week']" :key="f"
              @click="timeFilter = f as typeof timeFilter.value"
              class="px-4 py-1.5 rounded-full text-sm font-serif transition-all"
              :class="timeFilter === f ? 'bg-[var(--color-accent)] text-[var(--color-primary)]' : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'">
              {{ f === 'all' ? '全部' : f === 'year' ? '今年' : f === 'month' ? '本月' : '本周' }}
            </button>
          </div>

          <!-- 视图切换 -->
          <div class="flex items-center gap-2">
            <button @click="viewMode = 'sticky'"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
              :class="viewMode === 'sticky' ? 'bg-[var(--color-accent)]/20 text-[var(--color-primary)]' : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
                <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
              </svg>
              <span class="font-serif">便签</span>
            </button>
            <button @click="viewMode = 'card'"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
              :class="viewMode === 'card' ? 'bg-[var(--color-accent)]/20 text-[var(--color-primary)]' : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/>
              </svg>
              <span class="font-serif">列表</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 便签墙视图 -->
      <div v-if="viewMode === 'sticky'" class="max-w-6xl mx-auto">
        <div v-for="year in years" :key="year" class="mb-16">
          <div class="flex items-baseline gap-2 mb-6">
            <h2 class="font-serif text-2xl text-[var(--color-primary)]">{{ year }}</h2>
            <span class="font-serif text-xs text-[var(--color-muted)]">{{ groupedPosts[year].length }}</span>
          </div>

          <!-- 随意便签墙 - 使用 flex wrap 实现错落布局 -->
          <div class="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 p-4">
            <div v-for="(post, index) in groupedPosts[year]" :key="index"
              class="group relative w-[160px] sm:w-[180px] p-4 cursor-pointer transition-all duration-300 hover:z-10"
              :style="{
                backgroundColor: getStickyColor(index).bg,
                transform: `rotate(${getRandomStyle(index).rotation}deg) translate(${getRandomStyle(index).xOffset}px, ${getRandomStyle(index).yOffset}px)`,
                boxShadow: `3px 3px 8px ${getStickyColor(index).shadow}60, -1px -1px 3px rgba(255,255,255,0.5)`,
              }"
              :class="[
                'hover:rotate-0 hover:scale-105 hover:-translate-y-2',
                index % 3 === 0 ? 'mt-0' : index % 3 === 1 ? 'mt-6' : 'mt-3',
              ]"
            >
              <!-- 胶带效果 -->
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 rotate-1 shadow-sm"></div>
              
              <!-- 便签内容 -->
              <div class="pt-2">
                <!-- 日期 -->
                <div class="text-[10px] text-[var(--color-muted)] font-serif mb-2 opacity-70">
                  {{ formatShortDate(post.date) }}
                </div>
                <!-- 标题 -->
                <h3 class="font-serif text-sm font-medium text-gray-800 dark:text-gray-800 mb-2 leading-tight">
                  {{ post.title }}
                </h3>
                <!-- 内容预览 -->
                <p class="text-xs text-gray-600 dark:text-gray-600 leading-relaxed">
                  {{ post.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 卡片列表视图 -->
      <div v-else class="max-w-4xl mx-auto">
        <div v-for="year in years" :key="year" class="mb-10">
          <div class="flex items-baseline gap-2 mb-4">
            <h2 class="font-serif text-2xl text-[var(--color-primary)]">{{ year }}</h2>
            <span class="font-serif text-xs text-[var(--color-muted)]">{{ groupedPosts[year].length }}</span>
          </div>

          <div class="space-y-3">
            <div v-for="(post, index) in groupedPosts[year]" :key="index"
              class="group flex items-start gap-4 p-4 rounded-xl bg-[var(--color-warm)]/30 hover:bg-[var(--color-warm)]/50 transition-all cursor-pointer">
              <!-- 日期 -->
              <div class="flex-shrink-0 w-16 text-center">
                <div class="text-xs text-[var(--color-muted)]">{{ formatFullDate(post.date) }}</div>
              </div>
              <!-- 内容 -->
              <div class="flex-1 min-w-0">
                <h3 class="font-serif text-base font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{{ post.title }}</h3>
                <p class="text-sm text-[var(--color-muted)] line-clamp-2 mt-1">{{ post.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPosts.length === 0" class="py-16 text-center">
        <div class="font-serif text-[var(--color-muted)]">
          <p class="text-lg mb-2">暂无内容</p>
          <p class="text-sm">敬请期待...</p>
        </div>
      </div>

      <!-- 评论系统 -->
      <div class="max-w-4xl mx-auto mt-12">
        <Comments />
      </div>

      <FooterQuote />
    </div>
  </div>
</template>