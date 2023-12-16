<script setup lang="ts">
import type { Site } from '@/types/site';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const loading = ref(true);
const plugins = ref();

apiStore.getRoute('wp/v2/plugins').then((res) => {
    loading.value = false;

    plugins.value = res;
});

</script>

<template>
    <div v-if="!loading">
        <h1>Plugins</h1>
        <div v-for="plugin in plugins" :key="plugin.name">
            <h2>{{ plugin.name }}</h2>
            <small>Version: {{ plugin.version }}, Author: {{ plugin.author }}, Status: {{ plugin.status }}, Author URI: <a :href="plugin.author_uri">{{ plugin.author_uri }}</a></small>
            <p>{{ plugin.description.raw }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>