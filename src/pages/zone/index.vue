<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import posts from './posts.json'

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div class="min-h-screen w-full relative overflow-hidden bg-(--c-bg)">
    <!-- 艺术风格背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full opacity-30">
        <div class="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-linear-to-br from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-linear-to-tl from-stone-300/30 via-amber-100/20 to-transparent rounded-full blur-[80px]"></div>
        <div class="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-linear-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>

    <!-- 主内容 -->
    <div
      class="relative z-10 px-4 py-8 transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- Twitter 风格卡片列表 -->
      <div class="max-w-xl mx-auto">
        <div class="divide-y divide-(--color-secondary)/10">
          <div
            v-for="(post, index) in posts"
            :key="index"
            class="py-4 first:pt-0"
          >
            <!-- 卡片头部：标题和时间 -->
            <div class="flex items-baseline justify-between gap-4 mb-2">
              <h3 class="font-serif text-lg font-medium text-(--color-primary)">
                {{ post.title }}
              </h3>
              <span 
                class="text-xs text-(--color-muted) shrink-0" 
                :title="post.fullDate"
              >
                {{ post.timeAgo }}
              </span>
            </div>
            
            <!-- 卡片内容 -->
            <p class="text-sm text-(--color-muted) leading-relaxed">
              {{ post.content }}
            </p>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="posts.length === 0" class="py-16 text-center">
          <div class="font-serif text-(--color-muted)">
            <p class="text-lg mb-2">暂无内容</p>
            <p class="text-sm">敬请期待...</p>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-12 flex items-center justify-center gap-6">
        <div class="h-px w-20 bg-linear-to-r from-transparent to-(--color-secondary)"></div>
        <div class="font-serif text-2xl text-(--color-accent) italic">§</div>
        <div class="h-px w-20 bg-linear-to-l from-transparent to-(--color-secondary)"></div>
      </div>
    </div>
  </div>
</template>
