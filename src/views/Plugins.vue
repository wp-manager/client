<script setup lang="ts">
import { usePluginsStore } from '@/stores/plugins';

const plugins = usePluginsStore();
</script>

<template>
    <main>
        <div class="plugins">
            <div v-for="plugin in plugins.list()" :key="plugin.name" :class="{disabled: !plugin.enabled}" class="plugin">
                <h2>{{ plugin.name }}</h2>
                <p>{{ plugin.description }}</p>
                <p>{{ plugin.version }}</p>
                <p>{{ plugin.author }}</p>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
.plugin.disabled {
    opacity: .5;
}
</style>