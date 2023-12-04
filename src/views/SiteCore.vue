<script setup lang="ts">

import { useSitesStore } from '@/stores/sites';
import { useSiteStore } from '@/stores/site';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const siteStore = useSiteStore();
const sitesStore = useSitesStore();
// get uri from route via router parms
defineProps<{
  uri?: string
}>()

// get router params
const router = useRouter();
const { uri } = router.currentRoute.value.params;

if(uri) {
  const site = sitesStore.getSite(uri.toString());
  if(site) {
    siteStore.useSite(site);
    siteStore.apiGetCore();

  }
}

</script>

<template>
  <main>
    {{ $props }}
  </main>
</template>