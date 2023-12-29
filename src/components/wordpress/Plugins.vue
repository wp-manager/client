<script setup lang="ts">
import Plugin from './iterables/Plugin.vue';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const emit = defineEmits(['hasLoaded']);

const apiStore = useApiStore();

const loading = ref(true);
const plugins = ref();

apiStore.getRoute('wp/v2/plugins').then((res) => {
    loading.value = false;
    plugins.value = res;
    emit('hasLoaded');
});


</script>

<template>
    <div class="plugins" :class="{ loading: loading }">
        <div v-if="!loading">
            <Plugin v-for="plugin in plugins" :key="plugin.name" :plugin="plugin" />
        </div>
    </div>
</template>