<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <div>
    <h1>我看过的{{ title }}</h1>
    <p class="mt-8 text-left">
      一些我喜欢的类型:{{ type.join('/') }}
    </p>
  </div>
</template>
