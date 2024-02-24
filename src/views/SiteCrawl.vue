<script setup lang="ts">
import { useNewFetch } from '@/composables/fetch';
import { useSiteStore } from '@/stores/site';
import { computed, ref } from 'vue';

let apiBase = import.meta.env.APP_SERVER_URL;

const siteStore = useSiteStore();

const getCrawlInfo = useNewFetch(`${apiBase}/site/${siteStore.routeSite()?.url}/crawl`, {
    credentials: 'include'
});
getCrawlInfo.execute();

let data = ref({});

getCrawlInfo.onSuccess.value = () => {
    if(getCrawlInfo.data.value) {
        data.value = getCrawlInfo.data.value;
    }
    setTimeout(() => {
        getCrawlInfo.execute();
    }, 1000);
};

</script>

<template>
     <div class="card mb-3" v-if="siteStore?.routeSite()?.stq_sucuri_audit()">
        <div class="card-header d-flex align-items-center justify-content-between pe-2">
            Crawl Results
            <div class="badge">
                {{ data?.status }} - {{ data?.stats?.done}} / {{ data?.stats?.total}} - ({{ ((data?.stats?.done / data?.stats?.total) * 100).toFixed(0) }}%)
            </div>
        </div>
        <ul class="list-group list-group-flush" v-if="data.results">
            <li class="list-group-item" v-for="result in data.results.sort((a, b) => b.response - a.response || a.url.localeCompare(b.url))">
                <div class="badge" 
                :class="{
                    'text-bg-success': result.response.toString().startsWith(2),
                    'text-bg-warning': result.response.toString().startsWith(3),
                    'text-bg-danger': result.response.toString().startsWith(4) || result.response.toString().startsWith(5),
                }"
                >{{ result.response}}</div> {{ result.url }}
                <small class="text-muted d-block" v-if="result.redirect"><i class="bi bi-arrow-right"></i> {{ result.redirect }}</small>
            </li>
        </ul>
    </div>
   
    
</template>

<style scoped lang="scss">
</style>