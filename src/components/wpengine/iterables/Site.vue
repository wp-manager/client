<script setup lang="ts">
import SiteInstall from '@/components/wpengine/iterables/SiteInstall.vue';
defineProps({
    site: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="site" :data-id="site.id">
        <div class="site__group">
            {{ site.group_name }}
        </div>
        <div class="site__name">
            {{ site.name }}
        </div>
        <div class="site__installs">
            <SiteInstall v-for="siteInstall in site.installs" :siteInstall="siteInstall" />
        </div>

    </div>
</template>

<style scoped lang="scss">
.site {

    &__group {
        font-size: .75rem;
        color: var(--text-color-muted);
        font-weight: bold;
    }

    &__name {
        font-size: 1.25rem;
    }

    &__installs {
        display: flex;
        padding: 1rem 0;
        gap: 1rem;

        .site-install {
            width: 300px;
            flex-grow: 0;

        }
    }
}
</style>

