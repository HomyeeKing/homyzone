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

// 获取 zone 下的所有文章
const allPosts = computed(() => {
  const posts = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => !i.meta.frontmatter?.isCategory)
    .filter((i) => !i.path.endsWith('.html'))
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

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
      <!-- 文章列表 -->
      <div class="max-w-4xl mx-auto">
        <div
          v-for="(post, index) in allPosts"
          :key="post.path"
          class="group mb-8"
        >
          <router-link
            :to="post.path"
            class="block transition-all duration-300 hover:pl-2"
          >
            <h2 class="font-serif text-2xl md:text-3xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-2">
              {{ post.meta.frontmatter?.title || post.name }}
            </h2>
            <div class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <span v-if="post.date.getTime() > 0">{{ formatDate(post.date) }}</span>
              <span v-if="post.meta.frontmatter?.duration" class="flex items-center gap-1">
                <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
                {{ post.meta.frontmatter.duration }}
              </span>
            </div>
          </router-link>
        </div>

        <!-- 空状态 -->
        <div v-if="allPosts.length === 0" class="py-16 text-center">
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
