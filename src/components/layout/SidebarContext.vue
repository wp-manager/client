<script setup lang="ts">

defineProps<{
    item: {
        name: string;
        path: string;
        icon: string;
        divider: boolean | string;
    };
}>();
</script>

<template>
    <hr v-if="item?.divider === true">
    <div class="divider-heading" v-else-if="item?.divider" :data-label="item?.divider"></div>
    <div class="nav-item" v-else>
        <RouterLink class="nav-link" :to="item">
            <i class="bi me-2" :class="item?.icon"></i> {{ item?.label }}
        </RouterLink>
    </div>
</template>

<style scoped lang="scss"></style>
