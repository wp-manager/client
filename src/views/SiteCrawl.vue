<script setup lang="ts">
import { useNewFetch } from '@/composables/fetch';
import { useSiteStore } from '@/stores/site';
import { useToastStore } from '@/stores/toast';
import TimeUtils from '@/utils/time';
import { computed, ref } from 'vue';

let apiBase = import.meta.env.APP_SERVER_URL;

const siteStore = useSiteStore();
const toastStore = useToastStore();

const getCrawlInfo = useNewFetch(`${apiBase}/site/${siteStore.routeSite()?.url}/crawl`, {
    credentials: 'include'
});
getCrawlInfo.execute();

let data = ref({});

getCrawlInfo.onSuccess.value = () => {
    if (getCrawlInfo.data.value) {
        data.value = getCrawlInfo.data.value;
    }
    if (data.value.status == 'IN_PROGRESS' || data.value.status == 'QUEUED') {
        setTimeout(() => {
            getCrawlInfo.execute();
        }, 500);
    }
};

const queueCrawl = useNewFetch(`${apiBase}/site/${siteStore.routeSite()?.url}/crawl`, {
    method: 'POST',
    credentials: 'include'
});
queueCrawl.onSuccess.value = () => {
    getCrawlInfo.execute();
};
queueCrawl.onError.value = () => {
    toastStore.addToast({
        title: 'Crawl Queue Error',
        message: queueCrawl.error.value,
        timeout: 7000
    });
};

const sortedResults = computed(() => {
    if (!data.value?.results) return [];
    return data.value?.results.sort((a, b) => b.response - a.response || a.url.localeCompare(b.url));
})

</script>

<template>
    <div class="card mb-3" v-if="siteStore?.routeSite()?.stq_sucuri_audit()">
        <div class="card-header d-flex align-items-center justify-content-between pe-2">
            Crawl Results
            <div class="d-flex align-items-center gap-2">
                <div class="badge p-0">
                    <span>{{ data?.status }}</span>
                    <span v-if="data?.stats"> - {{ data?.stats?.done }} / {{ data?.stats?.total }} ({{
        ((data?.stats?.done / data?.stats?.total) * 100).toFixed(0) }}%)</span>
                    <span v-if="data?.startTime">
                        - ({{ TimeUtils.formatTime((data?.endTime ? data?.endTime : Date.now()) - data?.startTime) }})
                    </span>
                </div>
                <div class="btn btn-sm btn-secondary" @click="queueCrawl.execute()" :class="{
        'disabled': data?.status == 'IN_PROGRESS' || data?.status == 'QUEUED' || getCrawlInfo.loading.value || queueCrawl.loading.value
    }" v-if="getCrawlInfo.data">
                    Queue Crawl
                </div>
            </div>
        </div>
        <!-- progress bar -->
        <div class="progress" v-if="data?.stats?.total"
            :class="{ 'visible': data?.status == 'IN_PROGRESS' || data?.status == 'QUEUED' }">
            <div class="progress-bar" role="progressbar" :style="{
        width: ((data?.stats?.done / data?.stats?.total) * 100) + '%'
    }" :aria-valuenow="((data?.stats?.done / data?.stats?.total) * 100)" aria-valuemin="0" :aria-valuemax="100"></div>
        </div>
        <ul class="list-group list-group-flush" v-if="data.results">
            <li class="list-group-item" v-for="result in sortedResults">
                <div class="badge" :class="{
        'text-bg-success': result.response.toString().startsWith(2),
        'text-bg-warning': result.response.toString().startsWith(3),
        'text-bg-danger': result.response.toString().startsWith(4) || result.response.toString().startsWith(5),
    }">{{ result.response }}</div> {{ result.url }}
                <small class="text-muted" v-if="result.redirect"><i class="bi bi-arrow-right"></i> {{ result.redirect
                    }}</small>
            </li>
        </ul>
    </div>


</template>

<style scoped lang="scss">
.progress {
    border-radius: 0;
    height: 0px;
    transition: opacity .2s ease-in-out, height .2s ease-in-out;
    pointer-events: none;
    transition-delay: 5s;
    opacity: 0;

    &-bar {
        animation-direction: reverse;
        transition: all .25s ease-in-out;
    }

    &.visible {
        pointer-events: all;
        transition-delay: 0s;
        transition-duration: 0.2s;
        height: 4px;
        opacity: 1;
    }
}
</style>
