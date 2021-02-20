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
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        HOMYZONE
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
      <br>
      <template v-for="item in navLists" :index="item">
        <router-link class="text-sm opacity-75 hover:underline" :to="`/${item}`">
          <span>{{ t(`cd.${item}`) }} 👉</span>
        </router-link>
        <br>
      </template>
    </p>
  </div>
</template>
