<script lang='ts' setup>
import { defineProps } from 'vue'
import { fromDateString } from '@/logics'
import { useRoute } from 'vue-router'
import { useEventListener, isClient } from '@vueuse/core'

const route = useRoute()
const { frontmatter } = defineProps<{frontmatter: any}>()

const navigate = () => {
  if (location.hash)
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
}

useEventListener(window, 'hashchange', navigate)
</script>

<template>
  <div v-if="frontmatter.display || frontmatter.title" class="prose mb-8 m-auto">
    <h1>
      {{ frontmatter.display || frontmatter.title }}
    </h1>
    <p v-if="frontmatter.date" class="text-gray-300">
      {{ `${fromDateString(frontmatter.date)} · ${frontmatter.duration} ` }}
    </p>
  </div>
  <slot />

  <div v-if="route.path !== '/'" class="prose m-auto my-8">
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >
      cd ..
    </router-link>
  </div>
</template>
