<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDark } from '@/logics'
import { useRoute } from 'vue-router'
import BorderBeam from './BorderBeam.vue'
import Logo from './Logo.vue'

const navLists = [
  { key: 'zone', label: '碎碎念' },
  { key: 'blogs', label: '博客' },
  { key: 'novels', label: '小说' },
  { key: 'movies', label: '电影' },
  { key: 'dramas', label: '剧集' },
  { key: 'reading', label: '阅读' },
]
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
          <!-- Logo/Brand - 手写衬线体签名 -->
          <div class="flex items-center gap-2">
            <router-link to="/" class="relative group">
              <Logo />
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center justify-center gap-1">
            <router-link
              v-for="nav in navLists"
              :key="nav.key"
              :to="`/${nav.key}`"
              class="relative px-3 py-2 text-sm font-serif font-medium text-[var(--color-muted)] rounded-lg transition-all duration-300 hover:text-[var(--color-primary)] tracking-wide"
              :class="route.path === `/${nav.key}` ? 'text-[var(--color-primary)]' : ''"
            >
              <span class="relative z-10">{{ nav.label }}</span>
              <div
                v-if="route.path === `/${nav.key}`"
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
              :key="nav.key"
              :to="`/${nav.key}`"
              @click="closeMenu"
              class="block px-4 py-3 rounded-xl font-serif text-lg text-[var(--color-primary)] dark:text-[var(--color-secondary)] hover:bg-[var(--color-warm)] dark:hover:bg-[var(--color-warm)]/20 transition-all duration-300"
              :class="route.path === `/${nav.key}` ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] dark:text-[var(--color-accent)]' : ''"
            >
              {{ nav.label }}
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
/* Logo 悬停时重新播放动画 */
.group:hover :deep(.letter-h),
.group:hover :deep(.letter-o),
.group:hover :deep(.letter-m),
.group:hover :deep(.letter-y),
.group:hover :deep(.letter-e),
.group:hover :deep(.letter-e2),
.group:hover :deep(.letter-k),
.group:hover :deep(.letter-i),
.group:hover :deep(.letter-n),
.group:hover :deep(.letter-g) {
  animation: drawLetter 0.5s ease-out forwards;
}

.group:hover :deep(.letter-h) { animation-delay: 0.05s; }
.group:hover :deep(.letter-o) { animation-delay: 0.1s; }
.group:hover :deep(.letter-m) { animation-delay: 0.15s; }
.group:hover :deep(.letter-y) { animation-delay: 0.2s; }
.group:hover :deep(.letter-e) { animation-delay: 0.25s; }
.group:hover :deep(.letter-e2) { animation-delay: 0.3s; }
.group:hover :deep(.letter-k) { animation-delay: 0.35s; }
.group:hover :deep(.letter-i) { animation-delay: 0.4s; }
.group:hover :deep(.letter-n) { animation-delay: 0.45s; }
.group:hover :deep(.letter-g) { animation-delay: 0.5s; }

.group:hover :deep(.underline-draw) {
  animation: drawUnderline 0.8s ease-out 0.8s forwards;
}

@keyframes drawLetter {
  from { stroke-dashoffset: 200; }
  to { stroke-dashoffset: 0; }
}

@keyframes drawUnderline {
  from { stroke-dashoffset: 500; }
  to { stroke-dashoffset: 0; }
}
</style>