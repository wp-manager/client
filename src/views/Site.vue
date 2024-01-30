<script setup lang="ts">
import { useSiteStore } from '@/stores/site';


const siteStore = useSiteStore();
siteStore.routeSite()?.discover();

</script>

<template>
	<RouterView />
</template>
