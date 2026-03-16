<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'
import LuxoJr3D from './LuxoJr3D.vue'

const navLists = ['blogs', 'novels', 'movies', 'dramas', 'reading']
const route = useRoute()
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out font-serif bg-[var(--c-bg)]/95 dark:bg-[var(--c-bg)]/95 backdrop-blur-xl shadow-lg border-b border-[var(--color-warm)] dark:border-[var(--color-warm)]/30"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'">
    <!-- Background with artistic style - 全宽磨砂玻璃 -->
    <div class="px-6 py-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
              <router-link to="/" class="relative flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-cream)] dark:text-[var(--color-primary)] font-serif font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-[var(--color-accent)]">
                  H
                </div>
                <span class="text-xl font-serif font-semibold text-[var(--color-primary)] dark:text-[var(--color-cream)] hidden sm:block tracking-wide">
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
              class="relative px-4 py-2 text-sm sm:text-base font-serif font-medium text-[var(--color-muted)] dark:text-[var(--color-secondary)] rounded-lg transition-all duration-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-accent)] tracking-wide uppercase"
              :class="route.path === `/${nav}` ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)]' : ''"
            >
              <span class="relative z-10">{{ nav }}</span>
              <div
                v-if="route.path === `/${nav}`"
                class="absolute inset-0 bg-[var(--color-accent)]/10 rounded-lg"
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

    <!-- Elegant bottom border -->
    <div class="mx-4 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent mt-2"></div>
  </nav>

  <!-- Spacer for fixed nav -->
  <div class="h-28"></div>

  <!-- Vintage Lamp removed from Nav, now in index page -->
</template>

<style scoped>
/* Nav styles */
</style>
