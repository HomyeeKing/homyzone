<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import postsData from './posts.json'

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const posts = ref(postsData.map(p => ({
  ...p,
  date: new Date(p.date)
})));

// 格式化日期为 Twitter 风格
const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 365) {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
  } else if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return '刚刚';
  }
};

// 格式化完整日期
const formatFullDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 处理内容：移除 markdown 标记，截取前 280 字（类似 Twitter）
const formatContent = (content: string) => {
  // 移除 markdown 标记
  let text = content
    .replace(/#+ /g, '') // 标题
    .replace(/\*\*/g, '') // 粗体
    .replace(/\*/g, '') // 斜体
    .replace(/`{3}[\s\S]*?`{3}/g, '[代码]') // 代码块
    .replace(/`([^`]+)`/g, '$1') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/> /g, '') // 引用
    .replace(/\n+/g, ' ') // 换行转空格
    .trim()
  
  // 截取 280 字
  if (text.length > 280) {
    text = text.slice(0, 280).trim() + '...'
  }
  
  return text
};
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
                :title="formatFullDate(post.date)"
              >
                {{ formatTime(post.date) }}
              </span>
            </div>
            
            <!-- 卡片内容 -->
            <p class="text-sm text-(--color-muted) leading-relaxed whitespace-pre-wrap">
              {{ formatContent(post.content) }}
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
