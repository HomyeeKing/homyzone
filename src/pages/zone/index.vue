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

// 获取所有 zone 文章（排除 index.vue 自身）
const allPosts = computed(() => {
  const posts = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => i.path.startsWith('/zone/') && i.path !== '/zone')
    .map((route) => ({
      ...route,
      date: route.meta.frontmatter?.date
        ? new Date(route.meta.frontmatter.date)
        : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
});

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
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 简化内容显示（取前200字）
const truncateContent = (content: string, maxLength = 200) => {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trim() + '...';
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
      class="relative z-10 px-4 sm:px-8 lg:px-12 py-12 transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- Timeline 消息卡片列表 -->
      <div class="max-w-2xl mx-auto">
        <div class="space-y-0">
          <div
            v-for="(post, index) in allPosts"
            :key="post.path"
            class="relative"
          >
            <!-- 消息卡片 -->
            <div class="ml-0 mb-6">
              <router-link
                :to="post.path"
                class="block relative bg-(--c-bg-light) rounded-2xl p-6 shadow-sm border border-(--color-secondary)/10 hover:shadow-md hover:border-(--color-secondary)/20 transition-all duration-300 group"
              >
                <!-- 帖子标题和时间 -->
                <div class="flex items-start justify-between gap-4 mb-3">
                  <h3 class="font-serif text-xl text-(--color-primary)">
                    {{ post.meta.frontmatter?.title || post.name }}
                  </h3>
                  <span class="text-xs text-(--color-muted) whitespace-nowrap pt-1" :title="formatFullDate(post.date)">
                    {{ formatTime(post.date) }}
                  </span>
                </div>

                <!-- 帖子内容预览 -->
                <div class="text-(--color-muted) leading-relaxed">
                  {{ post.meta.frontmatter?.description || '点击查看详情' }}
                </div>

                <!-- 悬停光效 -->
                <div class="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="allPosts.length === 0" class="py-16 text-center">
          <div class="font-serif text-(--color-muted)">
            <p class="text-lg mb-2">暂无内容</p>
            <p class="text-sm">敬请期待...</p>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-16 flex items-center justify-center gap-6">
        <div class="h-px w-20 bg-linear-to-r from-transparent to-(--color-secondary)"></div>
        <div class="font-serif text-3xl text-(--color-accent) italic">§</div>
        <div class="h-px w-20 bg-linear-to-l from-transparent to-(--color-secondary)"></div>
      </div>
    </div>
  </div>
</template>
