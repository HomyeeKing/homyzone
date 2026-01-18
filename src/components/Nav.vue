<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'
import LuxoJr3D from './LuxoJr3D.vue'

const navLists = ['blogs', 'movies', 'dramas', 'reading']
const route = useRoute()
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'">
    <!-- Background with glassmorphism -->
    <div class="mx-4 mt-4 px-6 py-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border border-white/20 dark:border-gray-700/20">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-3 items-center">
          <!-- Logo/Brand -->
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
              <router-link to="/" class="relative flex items-center gap-2 group">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  H
                </div>
                <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-blue-500 hidden sm:block">
                  Homyee
                </span>
              </router-link>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center justify-center gap-1 sm:gap-2">
            <router-link
              v-for="nav in navLists"
              :key="nav"
              :to="`/${nav}`"
              class="relative px-3 py-2 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 hover:scale-105 first-letter:uppercase"
              :class="route.path === `/${nav}` ? 'text-blue-500 dark:text-blue-400' : ''"
            >
              <span class="relative z-10">{{ nav }}</span>
              <div
                v-if="route.path === `/${nav}`"
                class="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-blue-500/10 rounded-xl animate-pulse"
              ></div>
            </router-link>
          </div>

          <!-- Icon Group -->
          <div class="flex items-center justify-end gap-1 sm:gap-3">
            <router-link
              to="/"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="首页"
            >
              <carbon-campsite class="w-5 h-5 sm:w-6 sm:h-6" />
            </router-link>

            <button
              @click="isDark = !isDark"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="切换深色模式"
            >
              <carbon-moon v-if="isDark" class="w-5 h-5 sm:w-6 sm:h-6" />
              <carbon-sun v-else class="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <router-link
              to="/about"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="关于"
            >
              <carbon-dicom-overlay class="w-5 h-5 sm:w-6 sm:h-6" />
            </router-link>

            <a
              rel="noreferrer"
              href="https://twitter.com/unclehomy30"
              target="_blank"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="Twitter"
            >
              <carbon-logo-twitter class="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            <a
              rel="noreferrer"
              href="https://github.com/HomyeeKing"
              target="_blank"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="GitHub"
            >
              <carbon-logo-github class="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            <a
              href="/feed.xml"
              target="_blank"
              class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 hover:scale-110 lt-md:hidden"
              title="RSS"
            >
              <jam:rss-feed class="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated bottom border -->
    <div class="mx-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mt-2"></div>
  </nav>

  <!-- Spacer for fixed nav -->
  <div class="h-28"></div>

  <!-- 3D Luxo Jr Lamp -->
  <LuxoJr3D />
</template>

<style scoped>
/* Nav styles */
</style>
