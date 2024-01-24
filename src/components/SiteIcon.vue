<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import { useSiteStore } from '@/stores/site';
import { ref } from 'vue';

const missing = ref(false)
const loading = ref(true);


defineProps({
    site: {
        type: WPSite,
        required: true
    },
});
</script>

<template>
    <div class="icon rounded border" :class="{ missing, loading }" :title="loading ? 'Loading icon...' : missing ? 'Missing icon' : ''">
        <img :src="site?.favicon" @error="missing = true; loading = false;" @load="loading = false;" />
    </div>
</template>

<style scoped lang="scss">
.icon {
    background: #ffffff;
    display: grid;
    isolation: isolate;
    overflow: hidden;
    place-items: center;
    position: relative;
    width: 32px;
    height: 32px;
    padding: 3px;

    &.loading,
    &.missing {
        &:before {
            content: '';
        }

        img {
            opacity: 0;
        }
    }

    &.loading {
        &:before {
            content: '';
            width: 1rem;
            height: 1rem;
            position: absolute;
            opacity: 0.25;
            rotate: 0deg;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin .5s linear infinite;
            transform-origin: center;
        }
    }

    &.missing {
        &:before {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230000000' class='bi bi-question' viewBox='0 0 16 16'%3E%3Cpath d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 24px;
            opacity: .25;
            position: absolute;
            inset: 0;
            z-index: -1;
        }
    }

    img {
        
        border-radius: 4px;
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: opacity .25s ease-in-out;
    }
}

@keyframes spin {
    to {
        rotate: 360deg;
    }
}
</style>
