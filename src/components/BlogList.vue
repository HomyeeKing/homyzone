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
  <div class="flex">
    <section>
      <div v-for="route in routes" :key="route.name" class="m-auto">
        <router-link :to="route.path" class="no-underline">
          <h2>{{ route.meta.frontmatter?.title }}</h2>
          <small>{{ fromDateString(route.meta.frontmatter?.date) }}</small>
          <small v-if="route.meta.frontmatter?.duration">· {{ route.meta.frontmatter?.duration }}</small>
        </router-link>
      </div>
    </section>

    <!-- tags -->
    <ul class="fixed right-0 top-1/5 cursor-pointer">
      <li v-for="tag in blogTags" :key="tag" class="opacity-60" hover="opacity-100" @click="router.push(`${prefix}${tag}`)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
