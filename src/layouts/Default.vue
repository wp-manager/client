<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '../components/layout/Sidebar.vue';
import { useMetaStore } from '../stores/meta';
import RequestProgress from '@/components/RequestProgress.vue';

const metaStore = useMetaStore();

</script>

<template>
    <Sidebar />
    <div class="view flex-grow-1">
        <RequestProgress />
        <div class="view-wrapper p-3">
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="scss">
.view {
    position: relative;
    max-width: calc(100% - var(--sidebar-width));
    transition: max-width 0.2s ease-in-out;
    margin-left: auto;    
}

.view-wrapper{
    height: 100%;
}
</style>