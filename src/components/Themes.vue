<script setup lang="ts">
import type { Site } from '@/types/site';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const loading = ref(true);
const themes = ref();

apiStore.getRoute('wp/v2/themes').then((res) => {
    loading.value = false;

    themes.value = res;
});

</script>

<template>
    <div v-if="!loading">
        <h1>Themes</h1>
        <div v-for="theme in themes" :key="theme.name">
            <h2>{{ theme.name.raw }}</h2>
            <p v-html="theme.description.raw"></p>
        </div>
    </div>
</template>