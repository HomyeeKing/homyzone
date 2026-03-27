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

// 获取所有小说
const allNovels = computed(() => {
  const novels = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => !i.meta.frontmatter?.isCategory)
    .filter((i) => !i.path.endsWith('.html'))
    .filter((i) => i.path.startsWith('/novels/') && i.path !== '/novels')
    .filter((i) => !i.path.includes('/chaoxi/part') && !i.path.endsWith('/chaoxi/'))
    .map((route) => ({
      ...route,
      date: route.meta.frontmatter?.date
        ? new Date(route.meta.frontmatter.date)
        : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return novels;
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
      <!-- 小说列表 - 书本风格，居中展示 -->
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap justify-center gap-12">
          <router-link
            v-for="(novel, index) in allNovels"
            :key="novel.path"
            :to="novel.path"
            class="group relative"
          >
            <!-- 书本容器 -->
            <div class="book-container relative aspect-[3/4] w-56 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-warm)] shadow-lg transition-all duration-500 group-hover:shadow-2xl">
              <!-- 书脊 -->
              <div class="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent rounded-l-sm"></div>

              <!-- 封面内容 -->
              <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <!-- 装饰线 -->
                <div class="w-12 h-px bg-[var(--color-accent)] mb-4"></div>

                <!-- 标题 -->
                <h2 class="font-serif text-xl md:text-2xl text-[var(--color-primary)] leading-tight mb-4">
                  {{ novel.meta.frontmatter?.title || novel.name }}
                </h2>

                <!-- 装饰线 -->
                <div class="w-12 h-px bg-[var(--color-accent)] mb-4"></div>

                <!-- 日期 -->
                <p class="font-serif text-sm text-[var(--color-muted)]">
                  {{ formatDate(novel.date) }}
                </p>

                <!-- 装饰符号 -->
                <div class="mt-6 font-serif text-sm text-[var(--color-accent)] opacity-50">
                  --- Homy Claw
                </div>
              </div>

              <!-- 翻页角效果 -->
              <div class="page-corner absolute bottom-0 right-0 w-12 h-12 transition-all duration-300 origin-bottom-right"
                   style="background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.3) 52%, rgba(255,255,255,0.8) 100%); border-radius: 0 0 0 4px;">
              </div>

              <!-- 点击进入提示 -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-r-lg rounded-l-sm">
                <span class="px-4 py-2 bg-[var(--color-cream)] text-[var(--color-primary)] font-serif text-sm rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  点击进入
                </span>
              </div>
            </div>

            <!-- 书本阴影 -->
            <div class="absolute -bottom-2 left-4 right-4 h-4 bg-black/10 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
          </router-link>
        </div>

        <!-- 空状态 -->
        <div v-if="allNovels.length === 0" class="py-16 text-center">
          <div class="font-serif text-[var(--color-muted)]">
            <p class="text-lg mb-2">暂无小说</p>
            <p class="text-sm">敬请期待...</p>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <FooterQuote />
    </div>
  </div>
</template>

<style scoped>
/* 书本 3D 效果 */
.book-container {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.group:hover .book-container {
  transform: translateY(-8px);
}

/* 翻页角悬停效果 */
.group:hover .page-corner {
  width: 24px;
  height: 24px;
}
</style>
