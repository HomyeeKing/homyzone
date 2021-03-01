<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { fromDateString } from '@/logics'
const router = useRouter()
const routes = router
  .getRoutes()
  .filter(i => i.path.startsWith('/blogs/'))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter?.date) - +new Date(a.meta.frontmatter?.date),
  )

</script>

<template>
  <div v-for="route in routes" :key="route.name" class="my-5">
    <router-link :to="route.path" class="no-underline">
      <h2>{{ route.meta.frontmatter?.title }}</h2>
      <small>{{ fromDateString(route.meta.frontmatter?.date) }}</small>
      <small v-if="route.meta.frontmatter?.duration">· {{ route.meta.frontmatter?.duration }}</small>
    </router-link>
  </div>
</template>
