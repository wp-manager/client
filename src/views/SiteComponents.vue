<script setup lang="ts">
import PluginsVue from '@/components/wordpress/Plugins.vue';
import { useSiteStore } from '@/stores/site';
const siteStore = useSiteStore();

</script>

<template>
    <!-- PluginsVue emits "loaded" -->
    <PluginsVue />
</template>