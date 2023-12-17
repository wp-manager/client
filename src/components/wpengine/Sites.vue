<script setup lang="ts">
import { useApiStore } from '@/stores/api';
import { ref } from 'vue';
import Site from './iterables/Site.vue';

const apiStore = useApiStore();

const loading = ref(true);
const wpeSites = ref({});

apiStore.getWPEngineRoute('sites').then((res) => {
    loading.value = false;
    wpeSites.value = res;
});

</script>

<template>
    <div class="sites" :class="{ loading: loading }">

        <Site v-for="site in wpeSites.results" :key="site.id" :site="site" />

    </div>
</template>

<style scoped lang="scss">
.sites {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-height: 100vh;
}
</style>