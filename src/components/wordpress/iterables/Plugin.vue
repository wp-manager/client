<script setup lang="ts">
defineProps({
    plugin: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="plugin">
        <h3>{{ plugin.name }}</h3>
        <p>{{ plugin.description.raw }}</p>
        <small>Version: {{ plugin.version }}, Author: {{ plugin.author }}, Status: {{ plugin.status }}, Author URI:
            <a :href="plugin.author_uri">{{ plugin.author_uri }}</a></small>
    </div>
</template>

<style scoped lang="scss">
.plugin {
    border: 1px solid var(--text-color);
    border-radius: .5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    p{
        font-size: .875rem;
        margin: 0;
        flex-grow: 1;
    }
    small{
        opacity: .6;
        font-size: .75rem;
    }
}
</style>
