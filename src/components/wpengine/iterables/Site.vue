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