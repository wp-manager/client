<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const tab = ref(0);

</script>

<template>
    <div class="card">
        <div class="card-header pb-0">
            <ul class="nav nav-tabs border-bottom-0">
                <li class="nav-item">
                    <div class="nav-link text-body d-flex gap-3 align-items-center lh-1" :class="{ active: tab === 0 }"
                        @click="tab = 0">Mobile <div class="d-flex gap-1">
                            <div class="badge badge-lg" :title="type + ' - Mobile'"
                                v-if="$route.meta.site?.pagespeed()?.data && $route.meta.site?.pagespeed()?.data?.mobile"
                                v-for="(score, type) in $route.meta.site?.pagespeed()?.data?.mobile" :class="{
                                    'bg-success': score >= .9,
                                    'bg-warning text-dark': score >= .5 && score < .9,
                                    'bg-danger': score < .5
                                }">
                                {{ type.charAt(0).toUpperCase() }}: {{ (score * 100).toFixed(0) }}
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link text-body d-flex gap-3 align-items-center lh-1" :class="{ active: tab === 1 }"
                        @click="tab = 1">Desktop <div class="d-flex gap-1">
                            <div class="badge badge-lg" :title="type + ' - Desktop'"
                                v-if="$route.meta.site?.pagespeed()?.data && $route.meta.site?.pagespeed()?.data?.desktop"
                                v-for="(score, type) in $route.meta.site?.pagespeed()?.data?.desktop" :class="{
                                    'bg-success': score >= .9,
                                    'bg-warning text-dark': score >= .5 && score < .9,
                                    'bg-danger': score < .5
                                }">
                                {{ type.charAt(0).toUpperCase() }}: {{ (score * 100).toFixed(0) }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="card-body p-0">
            <div class="tab-content" :class="{ 'd-none': tab !== 0 }">
                <iframe
                    :src="`https://googlechrome.github.io/lighthouse/viewer/?psiurl=https://${$route.meta?.site?.url}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=MOBILE`"></iframe>
            </div>
            <div class="tab-content" :class="{ 'd-none': tab !== 1 }">
                <iframe
                    :src="`https://googlechrome.github.io/lighthouse/viewer/?psiurl=https://${$route.meta?.site?.url}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=DESKTOP`"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nav-item {
    cursor: pointer;
}

.tab-content {
    iframe {
        width: 100%;
        height: 100vh;
        border: none;
    }
}
</style>