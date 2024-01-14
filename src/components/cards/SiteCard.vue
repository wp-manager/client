<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';
import SiteScreenshot from '../SiteScreenshot.vue';

const props = defineProps({
    site: WPSite
});

</script>

<template>
    <RouterLink class="card m-0 overflow-hidden" :class="{ 'loading': site?.discover()?.loading }"
        :to="{ name: 'site', params: { uri: site?.url } }">
        <div class="site-header">
            <div class="screenshots">
                <SiteScreenshot :url="site?.screenshot" />
            </div>
            <div class="site-header__content">
                <SiteIcon :site="site" />
                <span class="site-header__name" v-html="site?.discover()?.data?.name || site?.url"></span>
            </div>
            <div class="site-header__meta">
                <template v-if="site?.hasNamespace('wp-manager/v1')">
                    <div class="badge bg-warning text-dark" v-if="site?.wpm_core_version()?.data?.available">
                        <i class="bi bi-wordpress me-1"></i> {{ site.wpm_core_version()?.data?.available }}
                    </div>
                    <div class="badge bg-primary" v-else-if="site?.wpm_core_version()?.data?.current">
                        <i class="bi bi-wordpress me-1"></i> {{ site.wpm_core_version()?.data?.current }}
                    </div>
                </template>
            </div>
        </div>
    </RouterLink>
</template>
<style scoped lang="scss">
.card {
    height: 10rem;
    .screenshots {
        display: flex;
        height: 100%;
        gap: 1px;

        .screenshot {
            height: 100%;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
                
            }
            &:first-child {
                flex-grow: 1;
            }
            &:last-child {
                aspect-ratio: 4/9;
                flex-shrink: 0;
                height: auto;
            }
        }
    }

    &:hover {
        .screenshot {
            &:after {
                opacity: .8;
            }
        }
    }

    .site-header {
        height: 100%;
        position: relative;

        .icon {
            border: none !important;
        }

        .screenshot {
            &:after {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(0deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0.5) 100%);
                transition: opacity .25s ease-in-out;
            }
        }

        .site-header__content {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            align-items: flex-start;
            position: absolute;
            bottom: 0;
            margin: .75rem 1rem;
        }

        .site-header__name {
            font-weight: 500;
            font-size: 20px;
            line-height: 1;
        }

        .site-header__meta {
            position: absolute;
            margin: .5rem;
            top: 0;
            right: 0;
            display: flex;
        }
    }
}</style>