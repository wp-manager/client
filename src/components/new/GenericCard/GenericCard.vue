<script setup lang="ts">

</script>

<template>
    <div class="generic-card">
        <slot name="title">
            <div class="placeholder"></div>
        </slot>
        <slot name="body">
            <small class="fw-bold text-muted">NO DATA</small>
        </slot>
    </div>
</template>

<style scoped lang="scss">
.generic-card {
    background-color: #fff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: inline-flex;
    padding: var(--padding);

    .text-muted {
        opacity: .5;
    }
}
</style>