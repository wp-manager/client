<script setup lang="ts">
import type { Site } from '@/types/site';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const loading = ref(true);
const image = ref();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

if(!props.id) {
    throw new Error('No ID provided');
}

apiStore.getRoute(`wp/v2/media/${props.id}`).then((res) => {
    loading.value = false;

    image.value = res;
});


</script>

<template>
    <div v-if="!loading">
        <img v-if="image.media_details.sizes.thumbnail.source_url"
            :src="image.media_details.sizes.thumbnail.source_url"
            :alt="image.alt_text">
    </div>
</template>

<style scoped lang="scss">
</style>