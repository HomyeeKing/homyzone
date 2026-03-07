<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[var(--c-bg)]">
    <!-- 艺术风格背景 -->
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
      class="relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 装饰性顶部元素 -->
      <div class="mb-8 flex items-center justify-center gap-4">
        <div class="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent"></div>
        <div class="w-2 h-2 rotate-45 bg-[var(--color-accent)]"></div>
        <div class="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent"></div>
      </div>

      <!-- GitHub 头像 -->
      <div class="relative inline-block mb-10">
        <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full blur-2xl opacity-20"></div>
        <a 
          href="https://github.com/HomyeeKing" 
          target="_blank" 
          rel="noreferrer"
          class="relative block p-1 rounded-full bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-secondary)] to-[var(--color-accent)] hover:scale-105 transition-transform duration-300"
        >
          <img
            src="https://avatars.githubusercontent.com/u/49113249?v=4"
            width="140"
            height="140"
            alt="GitHub Avatar"
            class="rounded-full border-4 border-[var(--c-bg)]"
          >
        </a>
        <!-- GitHub 图标 -->
        <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-[var(--c-bg)]">
          <svg class="w-5 h-5 text-[var(--color-cream)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
      </div>

      <!-- 名字 - 艺术衬线字体 -->
      <h1 class="font-serif text-5xl md:text-7xl mb-4 tracking-wide text-[var(--color-primary)]">
        <span class="italic font-medium">Homyee</span>
        <span class="mx-3 text-[var(--color-accent)]">·</span>
        <span class="font-normal">King</span>
      </h1>

      <!-- 副标题 -->
      <p class="font-serif text-lg md:text-xl text-[var(--color-muted)] mb-12 tracking-widest uppercase">
        Digital Craftsman & Basketball Enthusiast
      </p>



      <!-- 底部装饰 -->
      <div class="flex items-center justify-center gap-6">
        <div class="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
        <div class="font-serif text-3xl text-[var(--color-accent)] italic">§</div>
        <div class="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
      </div>

      <!-- 引言 -->
      <p class="mt-8 font-serif text-sm text-[var(--color-muted)] italic tracking-wide">
        "I can do all things..."
      </p>
    </div>



    <!-- 中世纪复古台灯 -->
    <VintageLamp />
  </div>
</template>

<style scoped>
/* 优雅的入场动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 背景微动效果 */
@keyframes subtleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(10px, -10px) scale(1.02);
  }
  66% {
    transform: translate(-5px, 5px) scale(0.98);
  }
}
</style>
