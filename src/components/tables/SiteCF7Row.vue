<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';

const props = defineProps({
    site: WPSite
});

props.site?.discover();

</script>

<template>
    <tr v-if="site?.discover()?.data && site?.hasNamespace('contact-form-7/v1') && site?.hasNamespace('stq/v1')"
        v-for="(form, index) in site.stq_cf7_forms()?.data" :key="form?.slug">
        <td>
            <SiteIcon :site="site" />
        </td>
        <td>
            <div v-html="site.discover()?.data?.name || site.url"></div>
        </td>
        <td>
            <div>{{ form?.title }}</div>
            <small class="text-muted">{{ form?.subject }}</small>
        </td>
        <td>
            {{ form?.from }}
        </td>
        <td>
            <div v-for="recipient in form?.recipients" class="badge bg-primary">
                {{ recipient }}
            </div>
        </td>
        <td>
            {{ form?.additional_headers }}
        </td>
        <td>
            <span class="badge bg-success" v-if="form?.honeypot_present">
                Honeypot Present
            </span>
            <span class="badge bg-danger" v-else>
                No Honeypot
            </span>
        </td>
    </tr>
</template>