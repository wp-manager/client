<script lang="ts" setup>
import { useNewFetch } from '@/composables/fetch';
import { useAccountStore } from '@/stores/account';
import { useToastStore } from '@/stores/toast';

let apiBase = import.meta.env.APP_SERVER_URL;

const toastStore = useToastStore();
const accountStore = useAccountStore();

const props = defineProps({
    installId: {
        type: String,
        required: true
    }
});

const backupSite = useNewFetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${props.installId}/backups`,
    {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            description: 'Backup from WP Manager',
            notification_emails: [accountStore.account?.email]
        })
    });

// Placeholder
let backupStatus = useNewFetch('');

backupSite.onSuccess.value = () => {
    if (!backupSite.data.value?.id) {
        return;
    }

    const backupId = backupSite.data.value.id;

    toastStore.addToast({
        title: 'Backup Started',
        message: `WP Engine will send an email to <strong>${accountStore.account?.email}</strong> once the backup is complete. You do not need to stay on this page.`
    });

    backupStatus = useNewFetch(`${apiBase}/plugins/wp-engine-api-proxy/api/installs/${props.installId}/backups/${backupId}`, {
        credentials: 'include'
    });
    backupStatus.execute();

    backupStatus.onSuccess.value = () => {
        if (backupStatus.data.value.status === 'completed') {
            toastStore.addToast({
                message: 'Backup completed successfully'
            });
            return;
        }

        setTimeout(() => {
            backupStatus.execute();
        }, 1000);
    };

    backupStatus.onError.value = () => {
        toastStore.addToast({
            title: 'Error checking backup status',
            message: backupStatus.error.value?.message
        });
    };
};

backupSite.onError.value = () => {
    toastStore.addToast({
        title: 'Error starting backup',
        message: backupSite.error.value?.message
    });
};

backupSite.onFinally.value = () => {
    backupSite.clear(3000);
};
</script>
<template>
    <div class="btn btn-primary d-inline-flex gap-2 align-items-center" @click="backupSite.execute"
        :class="{ disabled: backupSite.dirty.value }">
        <span class="spinner-border spinner-border-sm" v-if="backupSite.loading.value"></span>
        <i class="bi bi-check-circle-fill" v-else-if="backupSite.ok.value"></i>
        <i class="bi bi-exclamation-circle-fill" v-else-if="backupSite.error.value"></i>
        <span>Backup Site</span>
    </div>
</template>