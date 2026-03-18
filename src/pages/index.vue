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
  <div class="h-[calc(100vh-7rem)] w-full flex items-center justify-center px-4 relative bg-[var(--c-bg)] overflow-hidden">
    <!-- 艺术风格背景 -->
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

      </div>

      <!-- 名字 - 艺术衬线字体 -->
      <h1 class="font-serif text-5xl md:text-7xl mb-4 tracking-wide text-[var(--color-primary)]">
        <span class="italic font-medium">Homyee</span>
        <span class="mx-3 text-[var(--color-accent)]">·</span>
        <span class="font-normal">King</span>
      </h1>

      <!-- 副标题 -->
      <p class="font-serif text-lg md:text-xl text-[var(--color-muted)] mb-8 tracking-widest">
        你想活出怎样的人生
      </p>

      <!-- 兴趣爱好标签 -->
      <div class="flex flex-wrap items-center justify-center gap-3 mb-12">
        <span class="tag-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-[var(--color-primary)] font-serif">
          🏋🏻 健身
        </span>
        <span class="tag-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-[var(--color-primary)] font-serif">
          🏀 篮球（已荒废）
        </span>
        <span class="tag-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-[var(--color-primary)] font-serif">
          🎬 剪辑（学习中）
        </span>
        <span class="tag-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-[var(--color-primary)] font-serif">
          あ 日语（学习中）
        </span>
      </div>

      <!-- 底部引言 -->
      <FooterQuote quote="I can do all things..." />
    </div>
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

/* 标签样式 - 柔和发光效果替代硬边框 */
.tag-item {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.tag-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  padding: 1px;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.08) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.tag-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08);
}

.tag-item:hover::before {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.12) 100%);
}
</style>
