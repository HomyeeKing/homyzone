<script setup lang="ts">
import MVTV from '@/components/MVTV.vue'
import { ref } from 'vue'
const myType = ['黑色幽默', '悬疑', '荒诞']
</script>

<template>
  <div class="p-8">
    <MVTV title="电影" :type="myType" />
  </div>
</template>
