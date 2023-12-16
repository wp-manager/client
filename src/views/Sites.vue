<script setup lang="ts">
import type { Site } from '@/stores/api';
import { useApiStore } from '@/stores/api';
import { useFlashStore } from '@/stores/flash';
import { useSitesStore } from '@/stores/sites';
import { sanitiseURL } from '@/utils/url';
import { ref } from 'vue';

const apiStore = useApiStore();
const flashStore = useFlashStore();



</script>

<template>
    <div class="sites" v-if="apiStore.sites">
        <RouterLink v-for="site in apiStore.sites" :key="site.uri" :to="{ name: 'site', params: { uri: site.uri } }" class="site">
            <h2>{{ site.uri }}</h2>
            <small>{{ site._id }}</small>
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.sites {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    .site {
        border: 1px solid #ccc;
        border-radius: .5rem;
        padding: 1rem 2rem;
    }
}
</style>