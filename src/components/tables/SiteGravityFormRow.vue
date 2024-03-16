<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';

const props = defineProps({
    site: WPSite
});

props.site?.discover();

</script>

<template>
    <tr v-if="site?.discover()?.data && site?.hasNamespace('gravityforms/v2') && site?.hasNamespace('stq/v1')"
        v-for="(form, index) in site.stq_gravity_forms()?.data" :key="form?.id">
        <td>
            <SiteIcon :site="site" />
        </td>
        <td>
            <div v-html="site.discover()?.data?.name || site.url"></div>
        </td>
        <td>
            <div>{{ form?.title }}</div>
            <small class="text-muted">{{ form?.description }}</small>
        </td>
        <td>
            <div class="badge bg-success" v-if="form?.is_active">
                Active
            </div>
            <div class="badge bg-danger" v-else>
                Inactive
            </div>
        </td>
        <td>
            <div v-for="notification in form?.notifications">
                <div>{{ notification.name }}
                    <span class="badge bg-success" v-if="notification?.isActive">
                        Active
                    </span>
                    <span class="badge bg-danger" v-else>
                        Inactive
                    </span>
                </div>
                <div v-for="recipient in notification.to.split(',')" class="badge bg-primary" v-if="notification.to">
                    {{ recipient }}
                </div>
                <div v-for="recipient in notification.cc.split(',')" class="badge bg-primary" v-if="notification.cc">
                    {{ recipient }}
                </div>
                <div v-for="recipient in notification.bcc.split(',')" class="badge bg-primary" v-if="notification.bcc">
                    {{ recipient }}
                </div>
            </div>
        </td>
        <td>
            <div v-for="confirmation in form?.confirmations">
                <div>{{ confirmation.name }}</div>
                <small class="text-muted">{{ confirmation.message }}</small>
            </div>
        </td>
        <td>
            <span class="badge bg-success" v-if="form?.has_honeypot">
                Honeypot Present
            </span>
            <span class="badge bg-danger" v-else>
                No Honeypot
            </span>
        </td>
        <td>
        </td>
    </tr>
</template>