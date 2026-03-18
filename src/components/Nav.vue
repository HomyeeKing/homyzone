<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'

const navLists = ['blogs', 'novels', 'movies', 'dramas', 'reading']
const route = useRoute()
const isVisible = ref(false)
const isMenuOpen = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out font-serif bg-[var(--c-bg)]/95 dark:bg-[var(--c-bg)]/95 backdrop-blur-xl shadow-lg border-b border-[var(--color-warm)] dark:border-[var(--color-warm)]/30"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'">
    <div class="px-4 sm:px-6 py-3">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center gap-2">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
              <router-link to="/" class="relative flex items-center gap-2 group">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-cream)] dark:text-[var(--color-primary)] font-serif font-bold text-base sm:text-lg shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-[var(--color-accent)]">
                  H
                </div>
                <span class="text-lg sm:text-xl font-serif font-semibold text-[var(--color-primary)] dark:text-[var(--color-cream)] tracking-wide">
                  Homyee
                </span>
              </router-link>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center justify-center gap-1">
            <router-link
              v-for="nav in navLists"
              :key="nav"
              :to="`/${nav}`"
              class="relative px-3 py-2 text-sm font-serif font-medium text-[var(--color-muted)] dark:text-[var(--color-secondary)] rounded-lg transition-all duration-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-accent)] tracking-wide uppercase"
              :class="route.path === `/${nav}` ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)]' : ''"
            >
              <span class="relative z-10">{{ nav }}</span>
              <div
                v-if="route.path === `/${nav}`"
                class="absolute inset-0 bg-[var(--color-accent)]/10 rounded-lg"
              ></div>
            </router-link>
          </div>

          <!-- Right Icons + Mobile Menu Button -->
          <div class="flex items-center gap-1 sm:gap-2">
            <!-- Desktop Icons -->
            <router-link
              to="/"
              class="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110"
              title="首页"
            >
              <carbon-campsite class="w-5 h-5" />
            </router-link>

            <button
              @click="isDark = !isDark"
              class="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-110"
              title="切换深色模式"
            >
              <carbon-moon v-if="isDark" class="w-5 h-5" />
              <carbon-sun v-else class="w-5 h-5" />
            </button>

            <a
              rel="noreferrer"
              href="https://x.com/unclehomy30"
              target="_blank"
              class="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              title="X (Twitter)"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              rel="noreferrer"
              href="https://github.com/HomyeeKing"
              target="_blank"
              class="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <carbon-logo-github class="w-5 h-5" />
            </a>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMenu"
              class="md:hidden p-2 rounded-xl text-[var(--color-primary)] dark:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
              :class="isMenuOpen ? 'bg-[var(--color-warm)] dark:bg-[var(--color-warm)]/20' : ''"
              title="菜单"
            >
              <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Drawer -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 md:hidden"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        @click="closeMenu"
      ></div>
      
      <!-- Drawer -->
      <div class="absolute right-0 top-0 bottom-0 w-72 bg-[var(--c-bg)]/98 dark:bg-[var(--c-bg)]/98 backdrop-blur-xl shadow-2xl border-l border-[var(--color-warm)] dark:border-[var(--color-warm)]/30">
        <div class="p-6">
          <!-- Close Button -->
          <div class="flex justify-end mb-6">
            <button
              @click="closeMenu"
              class="p-2 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-2">
            <router-link
              v-for="nav in navLists"
              :key="nav"
              :to="`/${nav}`"
              @click="closeMenu"
              class="block px-4 py-3 rounded-xl font-serif text-lg text-[var(--color-primary)] dark:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
              :class="route.path === `/${nav}` ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : ''"
            >
              {{ nav }}
            </router-link>
          </div>

          <!-- Mobile Icons -->
          <div class="mt-8 pt-8 border-t border-[var(--color-warm)] dark:border-[var(--color-warm)]/30 space-y-2">
            <button
              @click="isDark = !isDark; closeMenu()"
              class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
            >
              <carbon-moon v-if="isDark" class="w-5 h-5" />
              <carbon-sun v-else class="w-5 h-5" />
              <span class="font-serif">{{ isDark ? '深色模式' : '浅色模式' }}</span>
            </button>

            <a
              rel="noreferrer"
              href="https://x.com/unclehomy30"
              target="_blank"
              class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span class="font-serif">X (Twitter)</span>
            </a>

            <a
              rel="noreferrer"
              href="https://github.com/HomyeeKing"
              target="_blank"
              class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-cream)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
            >
              <carbon-logo-github class="w-5 h-5" />
              <span class="font-serif">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Spacer for fixed nav -->
  <div class="h-16 sm:h-20"></div>
</template>

<style scoped>
/* Nav styles */
</style>