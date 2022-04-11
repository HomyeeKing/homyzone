<script setup lang="ts">
import { isDark } from '@/logics'
</script>

<template>
  <nav class="grid gap-5 grid-flow-col float-right text-xl mt-6 text-gray-700 dark:text-green-600">
    <router-link class="lt-md:hidden" to="/" title="首页">
      <carbon-campsite />
    </router-link>

    <a class="lt-md:hidden" title="切换深色模式" @click="isDark = !isDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>

    <router-link class="lt-md:hidden" to="/about" title="关于">
      <carbon-dicom-overlay />
    </router-link>

    <a
      class="lt-md:hidden"
      rel="noreferrer"
      href="https://twitter.com/unclehomy30"
      target="_blank"
      title="Twitter"
    >
      <carbon-logo-twitter />
    </a>
    <a
      class="lt-md:hidden"
      rel="noreferrer"
      href="https://github.com/HomyeeKing"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
    <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
      <jam:rss-feed />
    </a>
  </nav>
</template>
