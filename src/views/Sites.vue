<script setup lang="ts">
import Site from '@/classes/site.class';
import { useApiStore } from '@/stores/api';
import { useFlashStore } from '@/stores/flash';
import { ref } from 'vue';
import { useNewSitesStore } from '@/stores/sitesNew';
import { storeToRefs } from 'pinia';
import SiteIcon from '@/components/SiteIcon.vue';

const newSitesStore = useNewSitesStore();

</script>
<template>
    <div class="main overflow-hidden flex-grow-1">
        <div class="card table-responsive mb-4">
            <table class="m-0 table table-striped">
                <div class="fade-out"></div>
                <thead>
                    <tr>
                        <th scope="col" style="width:0"></th>
                        <th scope="col">Site</th>
                        <th scope="col">Version</th>
                        <th scope="col">Plugins</th>
                        <th scope="col">Crawl</th>
                        <th scope="col">Integrations</th>
                        <th scope="col">Runners</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="site in newSitesStore.sites.sort((a, b) => a.uri.localeCompare(b.uri))" :key="site.uri">
                        <td>
                            <SiteIcon :site="site" />
                        </td>
                        <td>
                            <RouterLink :to="{ name: 'site', params: { uri: site.uri } }"
                                v-html="site.getSiteInfo().title || site.uri">
                            </RouterLink>
                            <div class="spinner spinner-border spinner-border-sm ms-2 text-muted" v-if="site.getSiteInfo().loading">
                            </div>
                            <small class="text-muted d-flex" v-if="site.getSiteInfo().title">
                                {{ site.uri }}
                            </small>
                        </td>
                        <td>
                            <div v-if="site.getWpManagerWpCore()?.available" class="badge rounded-pill"
                                :class="{ 'text-bg-success': !site.getWpManagerWpCore().available, 'text-bg-warning': site.getWpManagerWpCore().available, 'placeholder': site.getWpManagerWpCore().loading }">
                                {{ site.getWpManagerWpCore().current }}
                                <span v-if="site.getWpManagerWpCore().available"><i class="bi bi-arrow-right"></i> {{
                                    site.getWpManagerWpCore().available }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="spinner spinner-border spinner-border-sm ms-2 text-muted" v-if="site.getPlugins().loading"></div>
                            <span v-if="site.getPlugins()">{{ site.getPlugins().length }}</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <hr>
    <RouterView />
</template>

<style scoped lang="scss">
.icon {
    overflow: hidden;
    width: 32px;
    height: 32px;
    isolation: isolate;
    position: relative;

    &.missing {
        &:before {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ffffff' class='bi bi-question' viewBox='0 0 16 16'%3E%3Cpath d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 24px;
            opacity: 0.5;
            position: absolute;
            inset: 0;
            z-index: -1;
        }

        img {
            opacity: 0;
        }

    }

    img {
        width: 100%;
        height: 100%;
    }
}</style>
