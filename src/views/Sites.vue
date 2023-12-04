<script setup lang="ts">
import { useFlashStore } from '@/stores/flash';
import { useSitesStore } from '@/stores/sites';
import { sanitiseURL } from '@/utils/url';

const sitesStore = useSitesStore();
const flashStore = useFlashStore();
</script>

<template>
    <table border="1" cellpadding="5" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Site</th>
                <th>User</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="site in sitesStore.getSites()" :key="site.uri">
                <td>
                    <RouterLink :to="{ name: 'site', params: { uri: site.uri } }">
                        {{ sanitiseURL(site.uri) }}
                    </RouterLink>
                </td>
                <td>{{ site.user }}</td>
                <td>{{ site.password }}</td>
            </tr>
        </tbody>
    </table>
</template>