<script lang='ts' setup>
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router
  .getRoutes()
  .filter((i) => i.path.startsWith("/blogs/"))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
  );
</script>

<template>
  <div>blog lists</div>

  <div v-for="route in routes" :key="route.name">
    <router-link :to="route.path">
      <h1>{{ route.meta.frontmatter.title }}</h1>
      <small>{{ route.meta.frontmatter.date }}</small>
      <span v-if="route.meta.frontmatter.duration"
        >· {{ route.meta.frontmatter.duration }}</span
      >
    </router-link>
  </div>
</template>
