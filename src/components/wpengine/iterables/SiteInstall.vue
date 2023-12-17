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
    <div class="site-install" :class="siteInstall.environment">
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

<style scoped lang="scss">
.site-install {
    border: 1px solid var(--text-color);
    border-radius: .5rem;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    flex-direction: column;
    gap: .5rem;

    &.production {
        order: 3;
    }

    &.staging {
        order: 2;
    }

    &.development {
        order: 1;
    }

    p {
        font-size: .875rem;
        margin: 0;
        flex-grow: 1;
    }

    small {
        opacity: .6;
        font-size: .75rem;
    }

    &__environment {
        background-color: var(--text-color);
        display: inline-flex;
        align-items: center;
        text-transform: capitalize;
        padding: .125rem .25rem;

        border: 2px solid #11CAD4;
        font-weight: 700;
        border-radius: 4px;
        font-size: .75rem;
        position: absolute;
        top: 4px;
        right: 4px;
        
        color: var(--background);


        &.production {
            background-color: #9EEAEE;
        }

        &.staging {
            background-color: #E8FAFB;
        }

        &.development {
            background-color: #FFFFFF;
        }


    }

    &__url {
        font-size: .875rem;
        color: var(--text-color-muted);
        font-weight: 700;
    }
}
</style>

