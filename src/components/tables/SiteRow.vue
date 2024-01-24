<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';

const props = defineProps({
    site: WPSite
});

props.site?.discover();

</script>

<template>
    <tr v-if="site?.discover()">
        <td>
            <RouterLink :to="{ name: 'site', params: { uri: site?.url } }">
                <SiteIcon :site="site" />
            </RouterLink>
        </td>
        <td>
            <RouterLink :to="{ name: 'site', params: { uri: site?.url } }" v-html="site.discover()?.data?.name || site.url" class="d-block text-body"></RouterLink>
            <small v-html="site.discover()?.data?.description"></small>
        </td>
        <td>
            <template v-if="site?.pagespeed()?.data">
                <div class="d-flex flex-column gap-1 lh-1">
                    <div v-if="site?.pagespeed()?.data?.mobile" class="d-flex gap-2 align-items-center">
                        <div class="d-flex gap-1">
                            <div class="badge" :title="type + ' - Mobile'"
                                v-if="site?.pagespeed()?.data && site?.pagespeed()?.data?.mobile"
                                v-for="(score, type) in site?.pagespeed()?.data?.mobile" :class="{
                                    'bg-success': score >= .9,
                                    'bg-warning text-dark': score >= .5 && score < .9,
                                    'bg-danger': score < .5
                                }">
                                {{ type.charAt(0).toUpperCase() }}: {{ (score * 100).toFixed(0) }}
                            </div>
                        </div>
                        <small>Mobile</small>
                    </div>
                    <div v-if="site?.pagespeed()?.data?.desktop" class="d-flex gap-2 align-items-center">
                        <div class="d-flex gap-1">
                            <div class="badge" :title="type + ' - Desktop'"
                                v-if="site?.pagespeed()?.data && site?.pagespeed()?.data?.desktop"
                                v-for="(score, type) in site?.pagespeed()?.data?.desktop" :class="{
                                    'bg-success': score >= .9,
                                    'bg-warning text-dark': score >= .5 && score < .9,
                                    'bg-danger': score < .5
                                }">
                                {{ type.charAt(0).toUpperCase() }}: {{ (score * 100).toFixed(0) }}
                            </div>
                        </div>
                        <small>Desktop</small>
                    </div>
                </div>
            </template>

        </td>
        <td>
            <template v-if="site.hasNamespace('wp-manager/v1')">
                <template v-if="site.wpm_core_version()?.loading">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </template>
                <template v-if="site.wpm_core_version()?.error">
                    <i class="bi bi-exclamation-triangle text-danger"></i>
                </template>
                <template v-else-if="site.wpm_core_version()?.data">

                    <div class="d-flex gap-2">
                        <div class="badge bg-success" v-if="!site.wpm_core_version()?.data.available"><i
                                class="bi bi-wordpress"></i> {{ site.wpm_core_version()?.data.current }}</div>
                        <div class="badge bg-warning text-dark" v-if="site.wpm_core_version()?.data.available"><i
                                class="bi bi-wordpress"></i> {{ site.wpm_core_version()?.data.current }} => {{
                                    site.wpm_core_version()?.data.available }}</div>
                    </div>
                </template>
            </template>
            <template v-else>
                <i class="bi bi-exclamation-circle text-muted" title="Unable to find wp-manager/v1 namespace"></i>
            </template>
        </td>
        <td>
            <template v-if="site.plugins()?.loading">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <template v-else-if="site.plugins()?.data?.length">
                <div class="d-flex gap-2">
                    <div class="badge bg-success">{{ site.plugins()?.data?.length }} Installed</div>
                    <div class="badge bg-warning text-dark">{{ site.plugins()?.data?.filter((a: any) => {
                        return a.status
                            !== 'active'
                    }).length }} Inactive</div>
                </div>
            </template>
        </td>

        <td>
            <template v-if="site.themes()?.loading">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <template v-else-if="site.themes()?.data?.length">
                <div>Active: {{ site.themes()?.data?.find((a: any) => { return a.status == 'active' }).name.rendered }}
                </div>
                <div>Total: {{ site.themes()?.data?.length }}</div>
            </template>
        </td>
        <td>
            <div class="d-flex gap-2">
                <div class="badge bg-secondary" v-if="site.hasNamespace('wp-manager/v1')">
                    WP Manager Companion
                </div>
                <div class="badge bg-secondary" v-if="site.hasNamespace('wp-rocket/v1')">
                    WP Rocket
                </div>
                <div class="badge bg-secondary" v-if="site.hasNamespace('wpe/cache-plugin/v1')">
                    WP Engine Cache
                </div>
                <div class="badge bg-secondary" v-if="site.hasNamespace('stq/v1')">
                    StrategiQ Dev Toolkit
                </div>
            </div>
        </td>
        <td></td>
    </tr>
</template>