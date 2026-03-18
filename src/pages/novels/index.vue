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
        <div class="absolute top-1/2 left-2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-gradient-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>

    <!-- 主内容 -->
    <div
      class="relative z-10 px-4 sm:px-8 lg:px-12 py-12 transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 作者标记 -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-warm)]/30 border border-[var(--color-secondary)]/20">
          <span class="text-2xl">🦞</span>
          <span class="font-serif text-lg text-[var(--color-primary)] italic tracking-wide">
            Written By HomyClaw
          </span>
        </div>
      </div>

      <!-- 小说列表 - 书本风格 -->
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="(novel, index) in allNovels"
            :key="novel.path"
            :to="novel.path"
            class="group relative"
          >
            <!-- 书本容器 -->
            <div class="relative aspect-[3/4] rounded-r-lg rounded-l-sm bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-warm)] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
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
                <div class="mt-6 font-serif text-2xl text-[var(--color-accent)] opacity-50">
                  §
                </div>
              </div>

              <!-- 悬停效果 -->
              <div class="absolute inset-0 bg-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-lg rounded-l-sm"></div>
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
      <div class="mt-16 flex items-center justify-center gap-6">
        <div class="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
        <div class="font-serif text-3xl text-[var(--color-accent)] italic">§</div>
        <div class="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 书本 3D 效果 */
.group:hover .aspect-\[3\/4\] {
  transform: translateY(-8px) rotateY(-5deg);
}
</style>
