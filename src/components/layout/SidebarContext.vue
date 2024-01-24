<script setup lang="ts">

defineProps<{
    item: {
        label: string;
        path: string;
        icon: string;
        divider: boolean | string;
        class: string;
    }
}>();
</script>

<template>
    <hr v-if="item?.divider === true">
    <div class="divider-heading" v-else-if="item?.divider" :data-label="item?.divider" :class="item?.class"></div>
    <div class="nav-item" v-else :class="item?.class">
        <RouterLink class="nav-link" :class="item?.class" :to="item">
            <i class="bi me-2" :class="item?.icon" v-if="item?.icon"></i> {{ item?.label }}
        </RouterLink>
    </div>
</template>

<style scoped lang="scss"></style>
