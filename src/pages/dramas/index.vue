<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NeoDBDramas from '@/components/NeoDBDramas.vue';

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
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
          <span class="italic">Dramas</span>
        </h1>
        <p class="font-serif text-[var(--color-muted)] tracking-widest">
          剧集时光
        </p>
      </div>

      <!-- NeoDB 剧集列表 -->
      <div class="max-w-6xl mx-auto">
        <NeoDBDramas />
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
