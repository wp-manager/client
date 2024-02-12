<script lang="ts" setup>
import { ref } from 'vue';
import PurgeCacheDropdownItem from './PurgeCacheDropdownItem.vue';

const open = ref(false);

// if clicked outside of dropdown, close it
window.addEventListener('click', (e: any) => {
    if (!e.target.closest('.dropdown')) {
        open.value = false;
    }
});

defineProps({
    installId: {
        type: String,
        required: true
    }
});
</script>
<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" :aria-expanded="open"
            @click="open = !open">
            Purge Cache
        </button>
        <ul class="dropdown-menu" :class="{ show: open }">
            <li>
                <PurgeCacheDropdownItem :installId="installId" cacheType="object" />
            </li>
            <li>
                <PurgeCacheDropdownItem :installId="installId" cacheType="page" />
            </li>
            <li>
                <PurgeCacheDropdownItem :installId="installId" cacheType="cdn" />
            </li>
        </ul>
    </div>
</template>