<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '@/components/SiteIcon.vue';
import SiteScreenshot from '@/components/SiteScreenshot.vue';
import { useSiteStore } from '@/stores/site';
import { routerKey, useRouter } from 'vue-router';

// get route meta
const router = useRouter();
const route = router.currentRoute.value;
const meta = route.meta;
const site = meta.site as WPSite;


</script>

<template>
	<RouterView />
</template>
