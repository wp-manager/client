<script setup lang="ts">
defineProps({
    msg: {
        type: String,
        default: 'h'
    }
});
</script>

<template>
    I am a site card: {{ msg }}
</template>

<style scoped lang="scss"></style>