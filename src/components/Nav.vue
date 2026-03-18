<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'
import BorderBeam from './BorderBeam.vue'

const navLists = ['zone', 'blogs', 'novels', 'movies', 'dramas', 'reading']
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
                viewBox="0 0 280 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="homyeeking-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

                <!-- homyeeking - 手写艺术字体 SVG path (每个字母的波浪连笔) -->
                <g filter="url(#glow)">
                  <!-- h -->
                  <path d="M15 38 L15 28 C15 22, 20 20, 25 22 C30 24, 30 28, 30 32 L30 38"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-h"/>
                  <!-- o -->
                  <ellipse cx="42" cy="32" rx="6" ry="8"
                           stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                           class="letter-o"/>
                  <!-- m -->
                  <path d="M55 38 L55 28 L62 35 L69 28 L76 38"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="letter-m"/>
                  <!-- y -->
                  <path d="M83 28 L88 35 C92 40, 95 38, 98 35 C101 32, 101 28, 101 24"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-y"/>
                  <!-- e -->
                  <path d="M108 32 C108 26, 115 24, 120 28 C124 31, 123 38, 115 38 C108 38, 105 32, 108 28 C111 25, 118 26, 120 30"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-e"/>
                  <!-- e (second) -->
                  <path d="M127 32 C127 26, 134 24, 139 28 C143 31, 142 38, 134 38 C127 38, 124 32, 127 28 C130 25, 137 26, 139 30"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-e2"/>
                  <!-- k -->
                  <path d="M146 22 L146 38 M146 30 L156 24 M146 32 L156 38"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-k"/>
                  <!-- i -->
                  <line x1="163" y1="24" x2="163" y2="38"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" stroke-linecap="round" class="letter-i"/>
                  <circle cx="163" cy="20" r="2" fill="url(#homyeeking-gradient)" class="letter-i-dot"/>
                  <!-- n -->
                  <path d="M170 38 L170 28 C170 22, 180 22, 180 28 L180 38"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-n"/>
                  <!-- g -->
                  <path d="M187 32 C187 26, 192 24, 197 26 C202 28, 202 34, 197 36 C192 38, 188 38, 185 35 L185 40"
                        stroke="url(#homyeeking-gradient)" stroke-width="2.5" fill="none"
                        stroke-linecap="round" class="letter-g"/>
                </g>

                <!-- 装饰下划线 -->
                <line
                  x1="5"
                  y1="48"
                  x2="275"
                  y2="48"
                  stroke="var(--color-accent)"
                  stroke-width="2"
                  stroke-linecap="round"
                  class="underline-animate"
                  opacity="0.6"
                />
              </svg>
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
              class="block px-4 py-3 rounded-xl font-serif text-lg text-[var(--color-primary)] dark:text-[var(--color-secondary)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
              :class="route.path === `/${nav}` ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] dark:text-[var(--color-accent)]' : ''"
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
.letter-h, .letter-o, .letter-m, .letter-y, .letter-e, .letter-e2, .letter-k, .letter-i, .letter-i-dot, .letter-n, .letter-g {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawLetter 0.3s ease-out forwards;
}

.letter-h { animation-delay: 0.1s; }
.letter-o { animation-delay: 0.2s; }
.letter-m { animation-delay: 0.3s; }
.letter-y { animation-delay: 0.4s; }
.letter-e { animation-delay: 0.5s; }
.letter-e2 { animation-delay: 0.6s; }
.letter-k { animation-delay: 0.7s; }
.letter-i { animation-delay: 0.8s; }
.letter-i-dot { animation: dotAppear 0.3s ease-out 1s forwards; opacity: 0; }
.letter-n { animation-delay: 0.9s; }
.letter-g { animation-delay: 1s; }

.underline-animate {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: drawUnderline 1s ease-out 1.5s forwards;
}

@keyframes drawLetter {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawUnderline {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dotAppear {
  to {
    opacity: 1;
  }
}

/* 悬停效果 - 重新播放动画 */
.group:hover .letter-h, .group:hover .letter-o, .group:hover .letter-m,
.group:hover .letter-y, .group:hover .letter-e, .group:hover .letter-e2,
.group:hover .letter-k, .group:hover .letter-i, .group:hover .letter-n,
.group:hover .letter-g {
  animation: drawLetter 0.25s ease-out forwards;
}

.group:hover .letter-h { animation-delay: 0.05s; }
.group:hover .letter-o { animation-delay: 0.1s; }
.group:hover .letter-m { animation-delay: 0.15s; }
.group:hover .letter-y { animation-delay: 0.2s; }
.group:hover .letter-e { animation-delay: 0.25s; }
.group:hover .letter-e2 { animation-delay: 0.3s; }
.group:hover .letter-k { animation-delay: 0.35s; }
.group:hover .letter-i { animation-delay: 0.4s; }
.group:hover .letter-n { animation-delay: 0.45s; }
.group:hover .letter-g { animation-delay: 0.5s; }

.group:hover .underline-animate {
  animation: drawUnderline 0.8s ease-out 1.3s forwards;
}
</style>