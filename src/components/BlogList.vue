<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { fromDateString } from '@/logics'
const router = useRouter()
const prefix = '/blogs/'


const allRoutes = router
  .getRoutes()
  .filter(i => i.path.startsWith(prefix))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter?.date) - +new Date(a.meta.frontmatter?.date),
  ).filter(i => !i.path.endsWith('.html'))

const blogTags = Array.from(new Set(allRoutes.reduce(
  (prev, cur) => {
    return prev.concat(cur?.meta?.frontmatter?.tags ?? [])
  },
  [],
)))
const routes = allRoutes.filter(i=>i.path.startsWith(`${router.currentRoute.value.path}/`))


</script>

<template>
  <div class="max-w-3xl mx-auto px-6 pb-6">
    <!-- 博客列表 -->
    <section>
      <div v-for="route in routes" :key="route.name" class="group">
        <router-link :to="route.path" class="block no-underline py-3 border-b border-[var(--color-secondary)]/10 hover:border-[var(--color-accent)]/30 transition-colors duration-300">
          <h2 class="font-serif text-xl text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1">
            {{ route.meta.frontmatter?.title }}
          </h2>
          <div class="font-serif text-sm text-[var(--color-muted)]">
            <span>{{ fromDateString(route.meta.frontmatter?.date) }}</span>
            <span v-if="route.meta.frontmatter?.duration" class="ml-2">· {{ route.meta.frontmatter?.duration }}</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 标签 -->
    <div class="mt-6 pt-4 border-t border-[var(--color-secondary)]/10">
      <div class="font-serif text-sm text-[var(--color-muted)] mb-2">分类</div>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="tag in blogTags" 
          :key="tag" 
          @click="router.push(`${prefix}${tag}`)"
          class="font-serif text-sm px-2 py-0.5 rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-accent)]/40 transition-all duration-300"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>
