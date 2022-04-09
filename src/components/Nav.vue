<script setup lang="ts">
import { isDark } from '@/logics'



</script>

<template>
  <nav class="text-xl mt-6 text-right">
    <router-link class="icon-btn mx-2" to="/" title="首页">
      <carbon-campsite />
    </router-link>

    <a class="icon-btn mx-2" title="切换深色模式" @click="isDark = !isDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>

    <router-link class="icon-btn mx-2" to="/about" title="关于">
      <carbon-dicom-overlay />
    </router-link>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://twitter.com/unclehomy30" target="_blank" title="Twitter">
      <carbon-logo-twitter />
    </a>
    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/HomyeeKing" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>
