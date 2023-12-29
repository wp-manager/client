<script setup lang="ts">
import SiteIcon from '@/components/SiteIcon.vue';
import { useNewSitesStore } from '@/stores/sitesNew';
import { ref } from 'vue';

const sitesStore = useNewSitesStore();

</script>

<template>
	<div class="d-flex flex-column gap-2">
		<div class="d-flex align-items-center gap-2">
			<SiteIcon :site="sitesStore.currentSite" />
			<h1 v-html="sitesStore.currentSite?.getSiteInfo().title || sitesStore.currentSite.uri" class="mb-0 lh-1" />
		</div>
		<p v-html="sitesStore.currentSite?.getSiteInfo().description" class="mb-0" />
	</div>
		
		<hr />
	<RouterView />
</template>

<style scoped lang="scss">
</style>
