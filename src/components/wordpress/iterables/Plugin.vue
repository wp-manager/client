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

