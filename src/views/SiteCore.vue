<script setup lang="ts">
import { useSiteStore } from '@/stores/site';
const siteStore = useSiteStore();

siteStore.apiGetCore();

</script>

<template>
  <main>
    {{ $props }}
  </main>
</template>