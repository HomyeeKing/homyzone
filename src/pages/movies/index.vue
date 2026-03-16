<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

const router = useRouter();
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// 获取所有电影文章
const allMovies = computed(() => {
  const movies = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => !i.meta.frontmatter?.isCategory)
    .filter((i) => !i.path.endsWith('.html'))
    .filter((i) => i.path.startsWith('/movies/') && i.path !== '/movies')
    .map((route) => ({
      ...route,
      date: route.meta.frontmatter?.date
        ? new Date(route.meta.frontmatter.date)
        : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return movies;
});

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
</script>

<template>
  <div class="min-h-screen w-full relative overflow-hidden bg-[var(--c-bg)]">
    <!-- 艺术风格背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full opacity-30">
        <div class="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-tl from-stone-300/30 via-amber-100/20 to-transparent rounded-full blur-[80px]"></div>
        <div class="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-gradient-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
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
          <span class="italic">Movies</span>
        </h1>
        <p class="font-serif text-[var(--color-muted)] tracking-widest">
          光影之间
        </p>
      </div>

      <!-- 电影列表 -->
      <div class="max-w-4xl mx-auto">
        <div
          v-for="(movie, index) in allMovies"
          :key="movie.path"
          class="group"
        >
          <router-link
            :to="movie.path"
            class="block py-6 border-b border-[var(--color-secondary)]/10 transition-all duration-300 hover:pl-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h2 class="font-serif text-xl md:text-2xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-2">
                  {{ movie.meta.frontmatter?.title || movie.name }}
                </h2>
                <p
                  v-if="movie.meta.frontmatter?.description"
                  class="font-serif text-sm text-[var(--color-muted)] line-clamp-2 mb-3"
                >
                  {{ movie.meta.frontmatter.description }}
                </p>
                <div class="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                  <span class="font-serif">{{ formatDate(movie.date) }}</span>
                  <span v-if="movie.meta.frontmatter?.duration" class="flex items-center gap-1">
                    <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
                    {{ movie.meta.frontmatter.duration }}
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

        <!-- 空状态 -->
        <div v-if="allMovies.length === 0" class="py-16 text-center">
          <div class="font-serif text-[var(--color-muted)]">
            <p class="text-lg mb-2">暂无内容</p>
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
