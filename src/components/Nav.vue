<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'
import BorderBeam from './BorderBeam.vue'

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
  <BorderBeam
    :color="isDark ? '#d4b896' : '#c9a86c'"
    :width="2"
    :duration="6"
    class="fixed top-0 left-0 right-0 z-50"
  >
    <nav class="transition-all duration-1000 ease-out font-serif bg-[var(--c-bg)]/95 dark:bg-[var(--c-bg)]/95 backdrop-blur-xl"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'">
    <div class="px-4 sm:px-6 py-3">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand - 手写艺术签名 -->
          <div class="flex items-center gap-2">
            <router-link to="/" class="relative group">
              <!-- 手写签名 SVG -->
              <svg 
                class="h-10 sm:h-12 w-auto overflow-visible" 
                viewBox="0 0 220 50" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="signature-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:var(--color-accent);stop-opacity:1" />
                    <stop offset="50%" style="stop-color:var(--color-primary);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:var(--color-secondary);stop-opacity:1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <!-- 签名文字 - 使用 path 实现手写动画 -->
                <path
                  id="signature-path"
                  d="M20 35 C 20 35, 25 20, 35 25 C 45 30, 40 40, 50 35 C 60 30, 55 20, 65 25 C 75 30, 70 40, 80 35 L 85 35 M 90 30 C 95 25, 100 25, 105 30 C 110 35, 105 40, 100 38 C 95 36, 95 32, 100 30 C 105 28, 110 30, 115 35 L 120 35 M 125 25 C 130 20, 140 20, 145 25 C 150 30, 145 38, 140 38 C 135 38, 135 30, 140 28 C 145 26, 150 28, 155 32 L 160 35 M 165 30 C 170 25, 180 25, 185 30 C 190 35, 185 40, 180 40 C 175 40, 175 32, 180 30 C 185 28, 190 30, 195 35"
                  stroke="url(#signature-gradient)"
                  stroke-width="3"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  filter="url(#glow)"
                  class="signature-animate"
                />
                
                <!-- 装饰下划线 -->
                <path
                  d="M10 45 Q 110 50, 210 45"
                  stroke="var(--color-accent)"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  class="underline-animate"
                  opacity="0.6"
                />
              </svg>
              
              <!-- CSS 动画样式 -->
              <style scoped>
                .signature-animate {
                  stroke-dasharray: 500;
                  stroke-dashoffset: 500;
                  animation: drawSignature 2.5s ease-out forwards;
                }
                
                .underline-animate {
                  stroke-dasharray: 300;
                  stroke-dashoffset: 300;
                  animation: drawUnderline 1s ease-out 2s forwards;
                }
                
                @keyframes drawSignature {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                
                @keyframes drawUnderline {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                
                /* 悬停效果 - 重新播放动画 */
                .group:hover .signature-animate {
                  animation: drawSignature 2s ease-out forwards;
                }
                
                .group:hover .underline-animate {
                  animation: drawUnderline 0.8s ease-out 1.8s forwards;
                }
              </style>
            </router-link>
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
  </BorderBeam>

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
</template>

<style scoped>
/* Nav styles */
</style>