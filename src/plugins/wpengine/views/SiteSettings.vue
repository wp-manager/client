<script setup lang="ts">
import { useWPEStore } from '@/plugins/wpengine/stores/wpe';
import { useAccountStore } from '@/stores/account';
import { useSiteStore } from '@/stores/site';
import { useToastStore } from '@/stores/toast';
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';

const siteStore = useSiteStore();
const accountStore = useAccountStore();
const toastStore = useToastStore();

let loadingSelected = ref(true);
let selectedSite = ref('');
let selectedInstall = ref('');

const wpeStore = useWPEStore();

let apiBase = import.meta.env.APP_SERVER_URL;

fetch(`${apiBase}/plugins/wp-engine-api-proxy/assigned-site/${siteStore.routeSite()?.url}`, {
    method: 'GET',
    credentials: 'include'
}).then(async (res) => {
    const body = await res.json();

    selectedSite.value = body.siteId;
    selectedInstall.value = body.installId;
});

let assignStatus = ref('');

const assignSite = async () => {
    assignStatus.value = 'Assigning...';
    fetch(`${apiBase}/plugins/wp-engine-api-proxy/assign-site`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            uri: siteStore.routeSite()?.url,
            siteId: selectedSite.value,
            installId: selectedInstall.value
        })
    }).then(async (res) => {
        toastStore.addToast({
            message: 'WP Engine install assigned successfully'
        });
        wpeStore.engine.data['sites'] = null;
        wpeStore.engine.getSites();
    }).catch((err) => {
        toastStore.addToast({
            title: 'Error assigning site',
            message: err.message
        });
    });
}

</script>

<template>
    <div style="max-width: 600px;">
        <h1 class="h4 mb-2">WP Engine Settings</h1>
        <hr class="mb-3">
        <div v-if="wpeStore.engine.getSites().data?.results">
            <div class="row mb-3">
                <div class="col">
                    <select class="form-select" @change="selectedSite = $event.target.value; selectedInstall = ''">
                        <option value="">Select a site</option>
                        <option
                            v-for="site in wpeStore.engine.getSites().data?.results.sort((a, b) => a.name.localeCompare(b.name))"
                            :key="site.id" :value="site.id" :selected="site.id == selectedSite">{{ site.name }}</option>
                    </select>
                </div>
                <div v-if="selectedSite" class="col">
                    <select class="form-select" @change="selectedInstall = $event.target.value">
                        <option value="">Select an install</option>
                        <option
                            v-for="install in wpeStore.engine.getSites().data?.results.find((site) => site.id == selectedSite)?.installs"
                            :key="install.id" :value="install.id" :selected="install.id == selectedInstall">{{ install.name
                            }}
                            ({{ install.environment }})</option>
                    </select>
                </div>
            </div>
            <button class="btn btn-primary" @click="assignSite" v-if="selectedSite && selectedInstall">Assign
                Install</button>
        </div>
        <div class="mb-2" v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>