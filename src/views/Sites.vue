<script setup lang="ts">
import { useSitesStore } from '@/stores/sites';
import Encryption from '@/utils/encryption';
import { sanitiseURL } from '@/utils/url';

const validEncryption = (encrypted: string) => {
    return Encryption.isValid(encrypted);
};


const sitesStore = useSitesStore();
</script>

<template>
    <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Site</th>
                <th>User</th>
                <th>Valid Decryption?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="site in sitesStore.getSites()" :key="site.uri">
                <td>{{ sanitiseURL(site.uri) }}</td>
                <td>{{ site.user }}</td>
                <td>{{ validEncryption(site.password) }}</td>
            </tr>
        </tbody>
    </table>
</template>