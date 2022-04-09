<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { fromDateString } from '@/logics'
const prefix = '/blogs/'
const router = useRouter()
const routePathFilter = ref('/')
const allRoutes = router
  .getRoutes()
  .filter(i => i.path.startsWith(prefix))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter?.date) - +new Date(a.meta.frontmatter?.date),
  ).filter(i => !i.path.endsWith('.html'))

const blogTags = Array.from(new Set(allRoutes.map(i => i.path.slice(prefix.length, i.path.lastIndexOf('/'))))).filter(Boolean)

const routes = computed(() => allRoutes.filter(i => i.path.includes(routePathFilter.value)
  || i.meta.frontmatter?.tags.includes(routePathFilter.value)))

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
    <ul class="fixed right-0 cursor-pointer">
      <li v-for="tag in blogTags" :key="tag" @click="routePathFilter = tag">
        {{ tag }}
      </li>

      <li @click="routePathFilter = '/'">
        查看所有
      </li>
    </ul>
  </div>
</template>
