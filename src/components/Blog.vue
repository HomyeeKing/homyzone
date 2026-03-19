<script lang='ts' setup>
import { useRoute } from 'vue-router'
import { isClient, useEventListener } from '@vueuse/core'
import { fromDateString } from '@/logics'
import Comments from './Comments.vue'

const route = useRoute()
const { frontmatter } = defineProps<{ frontmatter: any }>()

const navigate = () => {
  if (location.hash)
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
}

if (isClient) {
  useEventListener(window, 'hashchange', navigate)
}
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
    <div v-if="frontmatter.display || frontmatter.title" class="prose mb-8 max-w-none">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl">
        {{ frontmatter.title }}
      </h1>
      <p v-if="frontmatter.date" class="text-gray-300 text-sm sm:text-base">
        {{ `${fromDateString(frontmatter.date)} · ${frontmatter.duration} ` }}
      </p>
    </div>
    <img v-if="frontmatter.hero_image" :src="frontmatter.hero_image" alt="hero_image" 
      class="w-full h-auto max-h-64 sm:max-h-80 lg:max-h-96 object-cover mb-5 rounded-lg">

    <slot />

    <div v-if="route.path !== '/'" class="prose my-8">
      <router-link :to="route.path.split('/').slice(0, -1).join('/') || '/'"
        class="font-mono no-underline opacity-50 hover:opacity-75">
        cd ..
      </router-link>
    </div>

    <!-- 评论系统 -->
    <Comments v-if="route.path !== '/'" />
  </div>
</template>
