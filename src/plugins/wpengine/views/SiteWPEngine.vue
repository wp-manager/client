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

let selectedSite = ref('');
let selectedInstall = ref('');

let apiBase = import.meta.env.APP_SERVER_URL;

fetch(`${apiBase}/plugins/wp-engine-api-proxy/assigned-site/${siteStore.routeSite()?.url}`, {
    method: 'GET',
    credentials: 'include'
}).then(async (res) => {
    const body = await res.json();

    selectedSite.value = body.siteId;
    selectedInstall.value = body.installId;
});

let backupStatus = ref('idle');

const backupSite = async () => {
    backupStatus.value = 'requesting';
    fetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${selectedInstall.value}/backups`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: 'Backup from WP Manager',
            notification_emails: [accountStore.account?.email]
        })
    }).then(async (res) => {
        const body = await res.json();
        if (body.id) {
            backupStatus.value = 'requested';
            pollBackupStatus(body.id);
        }
    });
}


const pollBackupStatus = async (backupId: string) => {
    let interval = setInterval(() => {
        fetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${selectedInstall.value}/backups/${backupId}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async (res) => {
            const body = await res.json();
            console.log(body);
            backupStatus.value = body.status;
            if (body.status === 'completed') {
                clearInterval(interval);
                setTimeout(() => {
                    backupStatus.value = 'idle';
                }, 5000);
            }
        }).catch((err) => {
            clearInterval(interval);
            backupStatus.value = 'error';
        });
    }, 3000);
}

const purgeInProgress = ref({
    object: false,
    page: false,
    cdn: false
})

const purgeCache = (type: 'object' | 'page' | 'cdn') => {
    purgeInProgress.value[type] = true;
    fetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${selectedInstall.value}/purge_cache`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type
        })
    }).then(async (res) => {
        if (res.ok) {
            switch (type) {
                case 'object':
                    toastStore.addToast({
                        message: 'Object cache purged successfully'
                    });
                    break;
                case 'page':
                    toastStore.addToast({
                        message: 'Page cache purged successfully'
                    });
                    break;
                case 'cdn':
                    toastStore.addToast({
                        message: 'CDN cache purged successfully'
                    });
                    break;
            }
        } else {
            const body = await res.json();
            toastStore.addToast({
                title: 'Error purging cache',
                message: body.message
            });
        }
    }).catch((err) => {
        toastStore.addToast({
            title: 'Error purging cache',
            message: err.message
        });
    }).finally(() => {
        purgeInProgress.value[type] = false;
    });
}

</script>

<template>
    <div style="max-width: 600px;">
        <h1 class="h4 mb-2">Actions</h1>
        <hr class="mb-3">
        <div class="mb-3" v-if="selectedInstall">
            <div class="mb-2">
                <div>
                    <button class="btn btn-primary" @click="backupSite" :disabled="backupStatus !== 'idle'">Backup Site
                        <span v-if="backupStatus !== 'idle'" class="me-2"> - <span style="text-transform: capitalize">{{
                            backupStatus }}</span></span>
                        <i class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                            v-if="backupStatus !== 'idle' && backupStatus !== 'completed'"></i>
                    </button>
                </div>
                <small>Backup notification will be sent to {{ accountStore.account?.email }} </small>
            </div>
            <div>
                <div>
                    <button class="btn btn-primary me-2" @click="purgeCache('object')"
                        :disabled="purgeInProgress['object']">
                        Purge Object Cache
                        <i class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"
                            v-if="purgeInProgress['object']"></i>
                    </button>
                    <button class="btn btn-primary me-2" @click="purgeCache('page')"
                        :disabled="purgeInProgress['page']">Purge Page Cache
                        <i class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"
                            v-if="purgeInProgress['page']"></i>
                    </button>
                    <button class="btn btn-primary" @click="purgeCache('cdn')" :disabled="purgeInProgress['cdn']">Purge CDN
                        Cache
                        <i class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"
                            v-if="purgeInProgress['cdn']"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="mb-2" v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>