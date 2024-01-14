<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useSiteStore } from '@/stores/site';

import SitePluginRow from '@/components/tables/SitePluginRow.vue';
import SiteGravityFormRow from '@/components/tables/SiteGravityFormRow.vue';

const siteStore = useSiteStore();


</script>
<template>
    <div class="main overflow-hidden flex-grow-1">
        <div class="card table-responsive mb-4">
            <table class="m-0 table table-striped">
                <div class="fade-out"></div>
                <thead>
                    <tr>
                        <th scope="col" style="width:0"></th>
                        <th scope="col">Site</th>
                        <th scope="col">Form</th>
                        <th scope="col">Active</th>
                        <th scope="col">Notifications</th>
                        <th scope="col">Confirmations</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <SiteGravityFormRow v-for="site in siteStore.sites" :key="site.url" :site="site" />
                </tbody>
            </table>
        </div>
    </div>
    <hr>
    <RouterView />
</template>

<style scoped lang="scss">
.icon {
    overflow: hidden;
    width: 32px;
    height: 32px;
    isolation: isolate;
    position: relative;

    &.missing {
        &:before {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ffffff' class='bi bi-question' viewBox='0 0 16 16'%3E%3Cpath d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 24px;
            opacity: 0.5;
            position: absolute;
            inset: 0;
            z-index: -1;
        }

        img {
            opacity: 0;
        }

    }

    img {
        width: 100%;
        height: 100%;
    }
}
</style>