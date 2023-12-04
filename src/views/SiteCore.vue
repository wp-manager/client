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

// on mount, load site
onMounted(() => {
  const uri = useRouter().currentRoute.value.params.uri;
  if(!uri) return;
  let s = sitesStore.getSite(uri.toString());
  if(!s) return;
  console.log('ss',s);

  siteStore.useSite(Object.assign({},s));
  console.log('dd',siteStore.apiGetCore());
})

</script>

<template>
  <main>
    {{ $props }}
  </main>
</template>