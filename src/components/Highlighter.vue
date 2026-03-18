<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  size?: number
  color?: string
  duration?: number
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 400,
  color: '#c9a86c',
  duration: 0.4,
  enabled: true,
})

const mouseX = ref(0)
const mouseY = ref(0)
const opacity = ref(0)

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseEnter() {
  opacity.value = 1
}

function handleMouseLeave() {
  opacity.value = 0
}
</script>

<template>
  <div
    class="relative rounded-[inherit]"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Highlighter effect -->
    <div
      class="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity"
      :style="{
        opacity: enabled ? opacity : 0,
        transitionDuration: `${duration}s`,
      }"
    >
      <div
        class="absolute inset-0 rounded-[inherit]"
        :style="{
          background: `radial-gradient(${size / 2}px circle at ${mouseX}px ${mouseY}px, ${color}14, transparent 40%)`,
        }"
      />
      <div
        class="absolute inset-0 rounded-[inherit]"
        :style="{
          background: `radial-gradient(${size / 4}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 40%)`,
          opacity: 0.5,
        }"
      />
    </div>
    <slot />
  </div>
</template>
