<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')

const router = useRouter()


</script>

<template>
  <div class="flex flex-col items-center mt-10">
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">HOMYZONE</a>
    </p>
    <div class="self-center">
      <p class="text-sm opacity-75 my-2 underline">
        WAY TO GREAT
      </p>
      <br>
     
    </div>
  </div>
</template>
