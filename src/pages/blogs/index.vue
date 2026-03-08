<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const allRoutes = router
  .getRoutes()
  .filter((i) => !i.meta.frontmatter?.hidden)
  .filter((i) => i.meta.frontmatter?.isCategory)
  .filter((i) => !i.path.endsWith('.html'));
</script>

<template>
  <div class="min-h-screen w-full relative overflow-hidden bg-[var(--c-bg)]">
    <!-- 艺术风格背景 - 与首页一致 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 水彩晕染效果 -->
      <div class="absolute top-0 left-0 w-full h-full opacity-30">
        <div class="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-stone-300/30 via-amber-100/20 to-transparent rounded-full blur-[80px]"></div>
        <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
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

      <!-- 博客分类卡片 -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link 
          v-for="r in allRoutes" 
          :key="r.name" 
          :to="r.path"
          class="group relative overflow-hidden rounded-2xl border border-[var(--color-secondary)]/20 bg-gradient-to-br from-[var(--c-bg)] to-[var(--color-secondary)]/5 p-6 transition-all duration-500 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 hover:-translate-y-1"
        >
          <!-- 悬停光效 -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[var(--color-accent)]/5 via-transparent to-[var(--color-secondary)]/5"></div>
          
          <div class="relative flex items-center gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center border border-[var(--color-accent)]/10 group-hover:border-[var(--color-accent)]/30 transition-colors duration-300">
              <img :src="r.meta.frontmatter?.icon" class="w-7 h-7 dark:contrast-70 brightness-120" />
            </div>
            <span class="font-serif text-xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300"> 
              {{ r.meta.frontmatter?.title }}
            </span>
          </div>
          
          <!-- 装饰线 -->
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] group-hover:w-full transition-all duration-500"></div>
        </router-link>
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
