<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const allRoutes = router
  .getRoutes()
  .filter((i) => !i.meta.frontmatter?.hidden)
  .filter((i) => i.meta.frontmatter?.isCategory)
  .filter((i) => !i.path.endsWith('.html'));


</script>

<template>
  <div class="mx-auto grid justify-center sm:gap-8 grid-cols-1 lg:grid-cols-2   sm:px-12 my-12 dark:text-white">
    <router-link v-for="r in allRoutes" :key="r.name" :to="r.path"
      class="flex   h-40 py-10 px-2 sm:p-6 bg-white dark:bg-black/20 sm:rounded-xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:sm:shadow-indigo-500/20 transition duration-500 dark:sm:border dark:border-slate-800">
      <img :src="r.meta.frontmatter?.icon" class="w-10 h-10 dark:contrast-70 brightness-120" />
      <span class="mb-0.5 ml-2 text-2xl first-letter:uppercase sm:text-3xl font-bold"> {{ r.meta.frontmatter?.title }}</span>
    </router-link>
  </div>
</template>
