<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Main content -->
    <div
      class="relative z-10 text-center max-w-3xl mx-auto transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- Avatar with glow effect -->
      <div class="relative inline-block mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <img
          src="https://avatars.githubusercontent.com/u/49113249?v=4"
          width="160"
          height="160"
          alt="avatar"
          class="relative rounded-full border-4 border-white/20 backdrop-blur-sm shadow-2xl"
        >
      </div>

      <!-- Name with artistic gradient -->
      <h1 class="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-blue-500 animate-gradient bg-300%">
          Homyee King
        </span>
      </h1>

      <!-- Description with artistic elements -->
      <div class="space-y-4">
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          <span class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/10 to-blue-500/10 border border-yellow-400/20 mr-2">💻</span>
          Programmer crafting digital experiences
        </p>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          <span class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-orange-400/10 to-red-500/10 border border-orange-400/20 mr-2">🏀</span>
          Basketball enthusiast & Golden State Warriors fan
        </p>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          <span class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 mr-2">⭐</span>
          Inspired by <span class="font-semibold text-blue-500">@StephenCurry30</span>'s greatness
        </p>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          <span class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-500/10 border border-purple-400/20 mr-2">🔥</span>
          Embracing the underdog journey
        </p>
      </div>

      <!-- Decorative separator -->
      <div class="mt-12 flex items-center justify-center gap-4">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700"></div>
        <div class="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 animate-pulse"></div>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700"></div>
      </div>
    </div>

    <!-- Floating particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-2 h-2 bg-yellow-400/30 rounded-full animate-float"></div>
      <div class="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-float" style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400/30 rounded-full animate-float" style="animation-delay: 1.5s;"></div>
      <div class="absolute bottom-20 right-10 w-3 h-3 bg-orange-400/30 rounded-full animate-float" style="animation-delay: 2s;"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-10px) translateX(-10px);
  }
  75% {
    transform: translateY(-30px) translateX(5px);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

.bg-300\% {
  background-size: 300% 300%;
}
</style>
