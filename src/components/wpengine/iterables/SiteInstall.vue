<script setup lang="ts">
defineProps({
    siteInstall: {
        type: Object,
        required: true
    }
});

const abbreaivations = {
    production: 'prod',
    staging: 'stg',
    development: 'dev'
};

const abbreviate = (environment: string) => {
    return abbreaivations[environment];
};
</script>

<template>
    <div class="site-install" :class="siteInstall.environment" :data-id="siteInstall.id">
        <div class="site-install__environment" :class="siteInstall.environment">
            {{ abbreviate(siteInstall.environment) }}
        </div>
        <div class="site-install__name">
            {{ siteInstall.name }}
        </div>
        <div class="site-install__url">
            {{ siteInstall.cname }}
        </div>
        <div class="site-install__php_version">
            PHP: {{ siteInstall.php_version }}
        </div>
    </div>
</template>