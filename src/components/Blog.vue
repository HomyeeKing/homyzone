<script lang='ts' setup>
import { useRoute } from 'vue-router'
import { isClient, useEventListener } from '@vueuse/core'
import { fromDateString } from '@/logics'

const route = useRoute()
const { frontmatter } = defineProps<{ frontmatter: any }>()

const navigate = () => {
  if (location.hash)
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
}

useEventListener(window, 'hashchange', navigate)
</script>

<template>
  <div v-if="frontmatter.display || frontmatter.title" class="prose mb-8 m-auto">
    <h1>
      {{ frontmatter.title }}
    </h1>
    <p v-if="frontmatter.date" class="text-gray-300">
      {{ `${fromDateString(frontmatter.date)} · ${frontmatter.duration} ` }}
    </p>
  </div>
  <img v-if="frontmatter.hero_image" :src="frontmatter.hero_image" alt="hero_image" width="900" height="500"
    class="h-70 w-1/1 mb-5" object="fill">

  <slot />

  <div v-if="route.path !== '/'" class="prose m-auto my-8">
    <router-link :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75">
      cd ..
    </router-link>
  </div>
</template>
