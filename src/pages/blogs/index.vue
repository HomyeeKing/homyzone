<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

const router = useRouter();
const isVisible = ref(false);

// 每页加载数量
const PAGE_SIZE = 10;
const currentPage = ref(1);
const loading = ref(false);
const hasMore = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
  setupInfiniteScroll();
});

// 获取所有文章（非分类页面，排除 novels）
const allPosts = computed(() => {
  const posts = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => !i.meta.frontmatter?.isCategory)
    .filter((i) => !i.path.endsWith('.html'))
    .filter((i) => i.path.startsWith('/blogs/') && i.path !== '/blogs')
    .filter((i) => !i.path.includes('/novels'))
    .map((route) => ({
      ...route,
      date: route.meta.frontmatter?.date
        ? new Date(route.meta.frontmatter.date)
        : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
});

// 当前显示的文章
const displayedPosts = computed(() => {
  return allPosts.value.slice(0, currentPage.value * PAGE_SIZE);
});

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 无限滚动
const setupInfiniteScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading.value && hasMore.value) {
        loadMore();
      }
    },
    { threshold: 0.1 }
  );

  const sentinel = document.querySelector('#scroll-sentinel');
  if (sentinel) {
    observer.observe(sentinel);
  }
};

const loadMore = () => {
  loading.value = true;
  setTimeout(() => {
    currentPage.value++;
    if (displayedPosts.value.length >= allPosts.value.length) {
      hasMore.value = false;
    }
    loading.value = false;
  }, 300);
};
</script>

<template>
  <div class="min-h-screen w-full relative overflow-hidden bg-[var(--c-bg)]">
    <!-- 艺术风格背景 - 与首页一致 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 水彩晕染效果 -->
      <div class="absolute top-0 left-0 w-full h-full opacity-30">
        <div class="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-tl from-stone-300/30 via-amber-100/20 to-transparent rounded-full blur-[80px]"></div>
        <div class="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-gradient-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <!-- 装饰性线条 -->
      <svg class="absolute top-20 right-20 w-32 h-32 opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="0.5" class="text-[var(--color-secondary)]"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="0.5" class="text-[var(--color-accent)]"/>
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-[var(--color-secondary)]"/>
      </svg>

      <svg class="absolute bottom-32 left-16 w-24 h-24 opacity-15" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="0.5" transform="rotate(45 50 50)" class="text-[var(--color-accent)]"/>
      </svg>
    </div>

    <!-- 主内容 -->
    <div
      class="relative z-10 px-4 sm:px-8 lg:px-12 py-12 transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent"></div>
          <div class="w-2 h-2 rotate-45 bg-[var(--color-accent)]"></div>
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent"></div>
        </div>
        <h1 class="font-serif text-4xl md:text-5xl text-[var(--color-primary)] mb-4">
          <span class="italic">Blogs</span>
        </h1>
        <p class="font-serif text-[var(--color-muted)] tracking-widest">
          记录学习与思考
        </p>
      </div>

      <!-- 文章列表 -->
      <div class="max-w-4xl mx-auto">
        <div
          v-for="(post, index) in displayedPosts"
          :key="post.path"
          class="group"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <router-link
            :to="post.path"
            class="block py-6 border-b border-[var(--color-secondary)]/10 transition-all duration-300 hover:pl-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h2 class="font-serif text-xl md:text-2xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-2 truncate">
                  {{ post.meta.frontmatter?.title || post.name }}
                </h2>
                <p
                  v-if="post.meta.frontmatter?.description"
                  class="font-serif text-sm text-[var(--color-muted)] line-clamp-2 mb-3"
                >
                  {{ post.meta.frontmatter.description }}
                </p>
                <div class="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                  <span class="font-serif">{{ formatDate(post.date) }}</span>
                  <span v-if="post.meta.frontmatter?.duration" class="flex items-center gap-1">
                    <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
                    {{ post.meta.frontmatter.duration }}
                  </span>
                </div>
              </div>
              <div class="flex-shrink-0 mt-1">
                <svg
                  class="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- 加载更多触发器 -->
        <div id="scroll-sentinel" class="h-4"></div>

        <!-- 加载状态 -->
        <div v-if="loading" class="py-8 text-center">
          <div class="inline-flex items-center gap-2 text-[var(--color-muted)] font-serif">
            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1. frontmatter.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>加载中...</span>
          </div>
        </div>

        <!-- 没有更多 -->
        <div v-if="!hasMore && allPosts.length > 0" class="py-8 text-center">
          <div class="flex items-center justify-center gap-4">
            <div class="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
            <span class="font-serif text-sm text-[var(--color-muted)]">已加载全部文章</span>
            <div class="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="allPosts.length === 0" class="py-16 text-center">
          <div class="font-serif text-[var(--color-muted)]">
            <p class="text-lg mb-2">暂无文章</p>
            <p class="text-sm">敬请期待...</p>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-16 flex items-center justify-center gap-6">
        <div class="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
        <div class="font-serif text-3xl text-[var(--color-accent)] italic">§</div>
        <div class="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
      </div>
    </div>
  </div>
</template>