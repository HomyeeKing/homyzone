<template>
  <div class="relative overflow-hidden rounded-[inherit]">
    <!-- Border beam effect -->
    <div
      class="pointer-events-none absolute inset-0 rounded-[inherit]"
      :class="[
        'before:absolute before:inset-0 before:rounded-[inherit]',
        'before:content-[\'\']',
        'before:[background:conic-gradient(from_var(--border-beam-angle),transparent_0%,var(--border-beam-color)_20%,transparent_40%,transparent_100%)]',
        'before:[mask:linear-gradient(90deg,transparent_calc(100%-var(--border-beam-width)),black_calc(100%-var(--border-beam-width)+1px),black_calc(100%-1px),transparent_100%)]',
        'before:[mask-composite:intersect]',
        'before:[animation:border-beam-spin_var(--border-beam-duration)_linear_infinite]',
        'after:absolute after:inset-[1px] after:rounded-[inherit] after:bg-[var(--c-bg)]',
      ]"
      :style="{
        '--border-beam-angle': '0deg',
        '--border-beam-color': color,
        '--border-beam-width': width + 'px',
        '--border-beam-duration': duration + 's',
      }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  width?: number
  duration?: number
}

withDefaults(defineProps<Props>(), {
  color: '#c9a86c',
  width: 2,
  duration: 4,
})
</script>

<style>
@keyframes border-beam-spin {
  from {
    --border-beam-angle: 0deg;
  }
  to {
    --border-beam-angle: 360deg;
  }
}

@property --border-beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>
