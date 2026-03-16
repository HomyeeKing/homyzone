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

// 获取所有文章（非分类页面，排除 novels）
const allPosts = computed(() => {
  const posts = router
    .getRoutes()
    .filter((i) => !i.meta.frontmatter?.hidden)
    .filter((i) => !i.meta.frontmatter?.isCategory)
    .filter((i) => !i.path.endsWith('.html'))
    .filter((i) => i.path.startsWith('/blogs/') && i.path !== '/blogs')
    .filter((i) => !i.path.includes('/novels'))
    .map((route) => ({
      ...route,
      date: route.meta.frontmatter?.date
        ? new Date(route.meta.frontmatter.date)
        : new Date(0),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
});

// 按年月分组
const groupedPosts = computed(() => {
  const groups: Record<string, Record<string, typeof allPosts.value>> = {};

  allPosts.value.forEach((post) => {
    const year = post.date.getFullYear().toString();
    const month = post.date.toLocaleDateString('en-US', { month: 'long' });

    if (!groups[year]) {
      groups[year] = {};
    }
    if (!groups[year][month]) {
      groups[year][month] = [];
    }
    groups[year][month].push(post);
  });

  return groups;
});

// 获取年份列表（倒序）
const years = computed(() => {
  return Object.keys(groupedPosts.value).sort((a, b) => parseInt(b) - parseInt(a));
});

// 获取月份列表
const getMonths = (year: string) => {
  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return Object.keys(groupedPosts.value[year]).sort((a, b) => {
    return monthOrder.indexOf(b) - monthOrder.indexOf(a);
  });
};

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

      <!-- 文章列表 - 按年月分组 -->
      <div class="max-w-4xl mx-auto">
        <!-- 年份分组 -->
        <div v-for="year in years" :key="year" class="mb-12">
          <!-- 年份标题 -->
          <div class="flex items-baseline gap-2 mb-8">
            <h2 class="font-serif text-3xl md:text-4xl text-[var(--color-primary)]">{{ year }}</h2>
            <span class="font-serif text-sm text-[var(--color-muted)]">
              {{ Object.values(groupedPosts[year]).flat().length }}
            </span>
          </div>

          <!-- 月份分组 -->
          <div v-for="month in getMonths(year)" :key="`${year}-${month}`" class="mb-8">
            <div class="flex gap-8 md:gap-16">
              <!-- 月份侧边栏 -->
              <div class="flex-shrink-0 w-20 md:w-24 pt-2">
                <div class="flex items-baseline gap-1">
                  <span class="font-serif text-lg md:text-xl text-[var(--color-primary)]">{{ month }}</span>
                  <span class="font-serif text-xs text-[var(--color-muted)]">{{ groupedPosts[year][month].length }}</span>
                </div>
              </div>

              <!-- 文章列表 -->
              <div class="flex-1 border-l border-[var(--color-secondary)]/10 pl-6 md:pl-8">
                <div
                  v-for="(post, index) in groupedPosts[year][month]"
                  :key="post.path"
                  class="group mb-6 last:mb-0"
                >
                  <router-link
                    :to="post.path"
                    class="block transition-all duration-300 hover:pl-2"
                  >
                    <h3 class="font-serif text-lg md:text-xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1">
                      {{ post.meta.frontmatter?.title || post.name }}
                    </h3>
                    <div class="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                      <span>{{ formatDate(post.date) }}</span>
                      <span v-if="post.meta.frontmatter?.duration" class="flex items-center gap-1">
                        <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
                        {{ post.meta.frontmatter.duration }}
                      </span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="allPosts.length === 0" class="py-16 text-center">
          <div class="font-serif text-[var(--color-muted)]">
            <p class="text-lg mb-2">暂无文章</p>
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
