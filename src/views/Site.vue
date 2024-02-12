<script setup lang="ts">
import { useSiteStore } from '@/stores/site';


const siteStore = useSiteStore();
siteStore.routeSite()?.discover();

</script>

<template>
	<div class="site-header border-bottom mb-3 pb-3 pt-1">
		<h1 class="h2 lh-1 site-header__heading" :class="{
			'text-muted opacity-25': siteStore.routeSite()?.discover().loading
		}">{{ siteStore.routeSite()?.discover().data?.name || siteStore.routeSite()?.url }}
		</h1>
		<div class="site-header__actions">
			
		</div>
	</div>
	<RouterView />
</template>

<style scoped lang="scss">
	.site-header{
		margin-left: -1rem;
		margin-right: -1rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>
