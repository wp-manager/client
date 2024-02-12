<script lang="ts" setup>
import { useNewFetch } from '@/composables/fetch';
import { useToastStore } from '@/stores/toast';
import type { PropType } from 'vue';

let apiBase = import.meta.env.APP_SERVER_URL;

const toastStore = useToastStore();

type CacheType = 'object' | 'page' | 'cdn';
const cacheTypeDescriptions: Record<CacheType, string> = {
    object: 'Object',
    page: 'Page',
    cdn: 'CDN'
};

const props = defineProps({
    installId: {
        type: String,
        required: true
    },
    cacheType: {
        type: String as PropType<CacheType>,
        required: true
    }
});

const purgeCache = useNewFetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${props.installId}/purge_cache`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        type: props.cacheType
    })
});

purgeCache.onFinally.value = () => {
    if (purgeCache.ok.value) {
        toastStore.addToast({
            message: `The ${cacheTypeDescriptions[props.cacheType]} cache has been purged`
        });
    } else if (purgeCache.error.value) {
        toastStore.addToast({
            title: 'Error purging cache',
            message: purgeCache.error.value.message
        });
    }
    
    purgeCache.clear(3000);
};


</script>
<template>
    <div class="dropdown-item d-flex align-items-center gap-2" @click="purgeCache.execute"
        :class="{ disabled: purgeCache.dirty.value }">
        <span class="spinner-border spinner-border-sm" v-if="purgeCache.loading.value"></span>
        <i class="bi bi-check-circle-fill" v-else-if="purgeCache.ok.value"></i>
        <i class="bi bi-exclamation-circle-fill" v-else-if="purgeCache.error.value"></i>
        <span>Purge {{ cacheTypeDescriptions[props.cacheType] }} Cache</span>
    </div>
</template>