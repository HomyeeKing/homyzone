<script setup lang="ts">
import { isDark } from '@/logics'
const navLists = ['blogs', 'movies', 'dramas', 'reading']
</script>

<template>
  <nav class="w-full h-15   grid grid-cols-3   content-center text-xl text-gray-700 dark:text-green-600">
    <!-- nav -->
    <div class="grid  grid-cols-4 place-items-center">
      <router-link v-for="nav in navLists" :key="nav"
       class="h-full first-letter:uppercase" :to="`/${nav}`">
        {{ nav }}
      </router-link>
    </div>
    <!-- icon group -->
    <div class="col-end-4  grid  grid-cols-6 place-items-center">
      <router-link class="lt-md:hidden col-auto" to="/" title="首页">
        <carbon-campsite />
      </router-link>

      <a class="lt-md:hidden" title="切换深色模式" @click="isDark = !isDark">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </a>

      <router-link class="lt-md:hidden" to="/about" title="关于">
        <carbon-dicom-overlay />
      </router-link>

      <a class="lt-md:hidden" rel="noreferrer" href="https://twitter.com/unclehomy30" target="_blank" title="Twitter">
        <carbon-logo-twitter />
      </a>
      <a class="lt-md:hidden" rel="noreferrer" href="https://github.com/HomyeeKing" target="_blank" title="GitHub">
        <carbon-logo-github />
      </a>
      <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
        <jam:rss-feed />
      </a>
    </div>

  </nav>
</template>
