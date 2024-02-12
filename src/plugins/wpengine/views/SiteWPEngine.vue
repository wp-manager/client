<script setup lang="ts">
import { useSiteStore } from '@/stores/site';
import { ref } from 'vue';
import BackupButton from '../components/BackupButton.vue';
import { useNewFetch } from '@/composables/fetch';
import PurgeCacheButton from '../components/PurgeCacheButton.vue';

const siteStore = useSiteStore();

let selectedSite = ref('');
let selectedInstall = ref('');

let apiBase = import.meta.env.APP_SERVER_URL;

const assignedSite = useNewFetch(`${apiBase}/plugins/wp-engine-api-proxy/assigned-site/${siteStore.routeSite()?.url}`, {
    credentials: 'include'
});

// Placeholder
let wpeInstall = useNewFetch('');

assignedSite.onSuccess.value = () => {
    if (!assignedSite.data) {
        return;
    }
    selectedSite.value = assignedSite.data.value?.siteId;
    selectedInstall.value = assignedSite.data.value?.installId;

    wpeInstall = useNewFetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${selectedInstall.value}`, {
        credentials: 'include'
    });

    wpeInstall.execute();
};

assignedSite.execute();

</script>

<template>
    <div style="max-width: 600px;">
        <div v-if="assignedSite.loading.value || wpeInstall.loading.value">
            <p>Gathering WP Engine information...</p>
        </div>
        <div v-else-if="wpeInstall.ok.value">
            <div class="d-flex gap-2">
                <BackupButton :installId="selectedInstall" />
                <PurgeCacheButton :installId="selectedInstall" />
            </div>
        </div>
        <div v-else-if="wpeInstall.error.value">
            <p>There was an error accessing the WP Engine API. Please check your WP Engine token and try again.</p>
            <router-link :to="{ name: 'account-wp-engine', params: { uri: siteStore.routeSite()?.url } }"
                class="btn btn-primary btn-sm">WP Engine Settings</router-link>
        </div>
        <div v-else>
            <p>No WP Engine install has been assigned to this site.</p>
            <!-- navigate to the current site setting page-->
            <router-link :to="{ name: 'site-settings-wp-engine', params: { uri: siteStore.routeSite()?.url } }"
                class="btn btn-primary btn-sm">Assign a site</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>