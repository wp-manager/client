<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';
import UserImage from '../UserImage.vue';

const props = defineProps({
    site: WPSite
});

props.site?.discover();

</script>

<template>
    <tr v-if="site?.users()?.data" v-for="(user, index) in site.users()?.data" :key="user?.slug">
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
            <div class="badge bg-secondary text-capitalize role" v-if="user.roles" v-for="role in user.roles">
                {{ role }}
            </div>
        </td>
    </tr>
</template>