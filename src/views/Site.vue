<script setup lang="ts">
import { useSiteStore } from '@/stores/site';
import { ref } from 'vue';

const siteStore = useSiteStore();

let siteSettings = ref({});
siteStore.getSiteSettings().then((res) => {
  siteSettings.value = res;
});

</script>

<template>
  <main>
    <h1>{{ siteSettings?.title }}</h1>
    <h2>{{ siteSettings?.description }}</h2>

    <RouterView />
  </main>

</template>