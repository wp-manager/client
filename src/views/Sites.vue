<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useSiteStore } from '@/stores/site';

import SiteRow from '@/components/tables/SiteRow.vue';
import SiteCard from '@/components/cards/SiteCard.vue';



const siteStore = useSiteStore();

</script>
<template>
    <div class="site-cards">
        <SiteCard v-for="site in siteStore.sites" :key="site.url" :site="site"/>
    </div>
    <div class="main overflow-hidden flex-grow-1">
        <div class="card table-responsive mb-4">
            <table class="m-0 table table-striped">
                <div class="fade-out"></div>
                <thead>
                    <tr>
                        <th scope="col" style="width:0"></th>
                        <th scope="col">Site</th>
                        <th scope="col" style="width:0">Version</th>
                        <th scope="col">Plugins</th>
                        <th scope="col">Theme</th>
                        <th scope="col">Integrations</th>
                        <th scope="col">Runners</th>
                    </tr>
                </thead>
                <tbody>
                    <SiteRow v-for="site in siteStore.sites" :key="site.url" :site="site" />
                </tbody>
            </table>
        </div>
    </div>
    <hr>
    <RouterView />
</template>

<style scoped lang="scss">
.site-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}
</style>