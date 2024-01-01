<script setup lang="ts">
import { useApiStore } from '@/stores/api';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const apiStore = useApiStore();
const authStore = useAuthStore();

const loading = ref(true);
const wpeUserData = ref({});
const cacheData = ref('idle' as any);
const enableBackup = ref(true);
const backupData = ref({status: 'idle'} as any);

let install = apiStore.sites.find(a => a.uri == apiStore.siteUri)?.wpeInstallId;

apiStore.getWPEngineRoute(`installs/${install}`).then((res) => {
    loading.value = false;
    wpeUserData.value = res;
});

const purgeCache = () => {
    cacheData.value = 'sending request...';
    apiStore.postWPEngineRoute(`installs/${install}/purge_cache`, {type:'cdn'}).then((res) => {
        cacheData.value = res;
    });
}

const backup = () => {
    backupData.value = {status: 'requesting from WP Engine'}
    apiStore.postWPEngineRoute(`installs/${install}/backups`,
    {
        description: 'WP Manager API Test',
        notification_emails: [authStore.user?.email],
    }).then((res) => {
        backupData.value = res;
        if(res.id){
            enableBackup.value = false;
            let check = setInterval(() => {
                apiStore.getWPEngineRoute(`installs/${install}/backups/${res.id}`).then((res) => {
                    backupData.value = res;
                    if(res.status == 'completed'){
                        enableBackup.value = true;
                        clearInterval(check);
                    }
                });
            }, 2000);
        }
    });
}
</script>

<template>
    <h1>WP Engine</h1>
    <hr>
    <Transition name="fade">
        <div class="loading" v-if="loading"></div>
    </Transition>
    <div v-if="!loading">
        {{ wpeUserData }}

        <h3>Purge Cache</h3>
        {{ cacheData }}
        <button @click="purgeCache">Purge Cache</button>

        <h3>Backup</h3>
        {{ backupData.status }}
        <button @click="backup" :disabled="!enableBackup">Backup</button>
        <p>A notification email will be sent to {{ authStore.user?.email }}</p>

    </div>
</template>