<script setup lang="ts">

defineProps<{
    item: {
        label: string;
        path: string;
        icon: string;
        iconSvg?: string;
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
            <i class="me-2" :class="item?.icon" v-if="item?.icon"></i>
            <div v-if="item?.iconSvg" class="icon-svg me-2" v-html="item?.iconSvg"></div>
             {{ item?.label }}
        </RouterLink>
    </div>
</template>

<style scoped lang="scss"></style>
