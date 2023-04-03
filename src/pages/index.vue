<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')

const router = useRouter()


</script>

<template>
  <div class="flex flex-col items-center mt-30">
    <img src="https://avatars.githubusercontent.com/u/49113249?v=4" width="144" height="144" alt="avatar"
      class="rounded-full">
    <p class="text-5xl leading-normal font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow to-blue-500">
      Homyee King</p>
    <p class="mt-5 text-3xl ">
      A programmer, like playing 🏀, crazy fan of
      @StephenCurry30
      and a underdog
    </p>
    <hr class="w-full my-5 opacity-10">
  </div>
</template>
