<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '../components/layout/Sidebar.vue';
import { useMetaStore } from '../stores/meta';
import RequestProgress from '@/components/RequestProgress.vue';

const metaStore = useMetaStore();

</script>

<template>
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
    overflow: hidden;
}
.view-wrapper{
    height: 100%;
}
</style>