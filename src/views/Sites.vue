<script setup lang="ts">
import { useSitesStore } from '@/stores/sites';
import SiteIcon from '@/components/SiteIcon.vue';
import { SiteConnectionStatus } from '@/types/site';

const sitesStore = useSitesStore();
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
                        <th scope="col" style="width:0">Version</th>
                        <th scope="col">Plugins</th>
                        <th scope="col">Theme</th>
                        <th scope="col">Integrations</th>
                        <th scope="col">Runners</th>
                    </tr>
                </thead>
                <tbody>

                    <!-- Show available sites first, then alphabetical -->
                    <template v-for="site in sitesStore.sites.sort((a, b) => {
                        if (a.getSiteAvailability() == SiteConnectionStatus.AVAILABLE && b.getSiteAvailability() != SiteConnectionStatus.AVAILABLE) {
                            return -1;
                        } else if (a.getSiteAvailability() != SiteConnectionStatus.AVAILABLE && b.getSiteAvailability() == SiteConnectionStatus.AVAILABLE) {
                            return 1;
                        } else {
                            return a.uri.localeCompare(b.getSiteInfo().title || b.uri);
                        }
                    })" :key="site.uri">
                        <tr v-if="site.getSiteAvailability() !== SiteConnectionStatus.AVAILABLE">
                            <td>
                                <SiteIcon :site="site" />
                            </td>
                            <td colspan="6">
                                <div v-html="site.getSiteInfo().title || site.uri"></div>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="bi text-warning d-inline-flex" style="font-size:18px;" :class="{
                                        'bi-wifi-off': site.connectionStatus == SiteConnectionStatus.OFFLINE,
                                        'bi-exclamation-triangle-fill': site.connectionStatus == SiteConnectionStatus.ERROR,
                                        'bi-person-fill-lock': site.connectionStatus == SiteConnectionStatus.UNAUTHORIZED
                                    }" :title="site.error"></i>
                                    <div class="spinner spinner-border spinner-border-sm text-muted"
                                        v-if="site.connectionStatus == SiteConnectionStatus.UNKNOWN || site.connectionStatus == SiteConnectionStatus.CHECKING">
                                    </div>
                                    <small class="text-muted" v-if="site.getSiteInfo().title">
                                        {{ site.uri }}
                                    </small>
                                    <small class="text-muted" v-else>
                                        {{ site.connectionStatus }}
                                    </small>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="site.getSiteAvailability() == SiteConnectionStatus.AVAILABLE">
                            <td>
                                <SiteIcon :site="site" />
                            </td>
                            <td>
                                <RouterLink :to="{ name: 'site', params: { uri: site.uri } }"
                                    v-html="site.getSiteInfo().title || site.uri">
                                </RouterLink>
                                <i class="bi bi-exclamation-triangle-fill text-warning ms-2 bi-sm" style="font-size:14px;"
                                    v-if="site.error && !site.siteInfo.loading" :title="site.error"></i>
                                <div class="spinner spinner-border spinner-border-sm ms-2 text-muted"
                                    v-if="site.getSiteInfo().loading">
                                </div>
                                <small class="text-muted d-flex" v-if="site.getSiteInfo().title">
                                    {{ site.uri }}
                                </small>
                            </td>
                            <td>
                                <div v-if="site.getWpManagerWpCore().current" class="badge rounded-pill"
                                    :class="{ 'text-bg-success': !site.getWpManagerWpCore().available, 'text-bg-warning': site.getWpManagerWpCore().available, 'placeholder': site.getWpManagerWpCore().loading }">
                                    {{ site.getWpManagerWpCore().current }}
                                    <span v-if="site.getWpManagerWpCore().available"><i class="bi bi-arrow-right"></i> {{
                                        site.getWpManagerWpCore().available }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="spinner spinner-border spinner-border-sm ms-2 text-muted"
                                    v-if="site.connectionStatus == SiteConnectionStatus.AVAILABLE && site.getPlugins().loading">
                                </div>
                                <span v-if="site.getPlugins()">{{ site.getPlugins().length }}</span>
                            </td>
                            <td>
                                <div class="spinner spinner-border spinner-border-sm ms-2 text-muted"
                                    v-if="site.getThemes().loading"></div>
                                <div
                                    v-if="site.getThemes().length && site.getThemes().find((theme) => theme.status == 'active')">
                                    <span>{{ site.getThemes().find((theme) => theme.status == 'active')?.name.rendered
                                    }}</span>
                                    <small class="text-muted d-flex">
                                        v{{ site.getThemes().find((theme) => theme.status == 'active')?.version }}
                                    </small>
                                </div>
                            </td>
                            <td>
                                <div v-if="site.discover()?.namespaces?.includes('wp-manager/v1')">
                                    WP Manager Essentials
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </template>
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
}
</style>