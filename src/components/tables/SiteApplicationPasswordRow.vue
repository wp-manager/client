<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';
import UserImage from '../UserImage.vue';
import { computed } from 'vue';

const props = defineProps({
    site: WPSite
});

const groupByUuid = (data: any) => {
    return data.reduce((acc: any, item: any) => {
        if (!acc[item.app_id]) {
            acc[item.app_id] = [];
        }
        acc[item.app_id].push(item);
        return acc;
    }, {});
};

const sortedUsers = computed(() => {
    return props.site?.users('administrator')?.data?.sort((a: any, b: any) => {
        return a.name.localeCompare(a.name);
    });
});

</script>

<template>
    <tr v-if="site?.discover()?.data && site?.users('administrator')?.data?.length > 0" v-for="(user, index) in sortedUsers"
        :key="user?.slug">
        <td>
            <SiteIcon :site="site" />
        </td>
        <td>
            <div v-html="site.discover()?.data?.name || site.url"></div>
        </td>
        <td>
            <div class="d-flex gap-2 lh-1 align-items-center">
                <UserImage :user="user" />
                <div class="d-flex flex-column gap-1">
                    <div>{{ user.name }}</div>
                    <small class="text-muted">{{ user.email }}</small>
                </div>
            </div>
        </td>
        <td>
            <template v-if="site?.userApplicationPasswords(user.id)?.loading">
                <div class="spinner-border text-white spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <template v-if="site?.userApplicationPasswords(user.id)?.data">
                <div v-if="site?.userApplicationPasswords(user.id)?.data"
                    v-for="(creds, uuid) in groupByUuid(site?.userApplicationPasswords(user.id)?.data)">
                    <small v-if="uuid">{{ uuid }}</small>
                    <small v-else><i>Manual</i></small>
                    <br>
                    <div class="badge bg-success text-capitalize role" v-if="site?.userApplicationPasswords(user.id)?.data"
                        v-for="cred in creds">
                        {{ cred.name }}
                    </div>
                </div>
            </template>
        </td>

    </tr>
</template>