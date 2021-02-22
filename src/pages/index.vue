<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const name = ref('')

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
const navLists = ['blogs', 'movies', 'dramas']
</script>

<template>
  <div class="text-center">
    <p class="text-4xl ">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        HOMYZONE
      </a>
    </p>
    <div>
      <p class="text-sm opacity-75  my-2 underline">
        {{ t('intro.desc') }}
      </p>
      <br>
      <div v-for="nav in navLists" :key="nav">
        <router-link class="text-sm opacity-75 hover:underline" :to="`/${nav}`">
          <p class="transition duration-150 transform hover:scale-150">
            {{ t(`cd.${nav}`) }} 👉
          </p>
        </router-link>
        <br>
      </div>
    </div>
  </div>
</template>
