<script setup lang="ts">
interface Props {
  quote?: string
  author?: string
  showAuthor?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="mt-8 flex items-center justify-center gap-6">
    <div class="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-secondary)]"></div>
    <div class="font-serif text-3xl text-[var(--color-accent)] italic">§</div>

    <!-- 作者标记 -->
    <template v-if="showAuthor">
      <span class="font-serif text-sm text-[var(--color-muted)] italic tracking-wide whitespace-nowrap">
        Written By HomyClaw
      </span>
    </template>

    <!-- 引言 -->
    <p
      v-else-if="quote"
      class="font-serif text-sm text-[var(--color-muted)] italic tracking-wide whitespace-nowrap"
    >
      {{ quote }}<span v-if="author" class="ml-2">— {{ author }}</span>
    </p>

    <div class="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-secondary)]"></div>
  </div>
</template>
