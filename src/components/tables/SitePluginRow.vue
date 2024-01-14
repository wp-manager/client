<script setup lang="ts">
import WPSite from '@/classes/wp.class';
import SiteIcon from '../SiteIcon.vue';

const props = defineProps({
    site: WPSite
});

props.site?.discover();

</script>

<template>
    <tr v-if="site?.plugins()?.data" v-for="(plugin, index) in site.plugins()?.data" :key="plugin?.slug">
        <td>
            <SiteIcon :site="site" />
        </td>
        <td>
            <div v-html="site.discover()?.data?.name || site.url"></div>
        </td>
        <td>
            <div v-html="plugin.name"></div>
        </td>
        <td>
            <div v-html="plugin.version"></div>
        </td>

        <td>
            <div class="badge bg-success" v-if="plugin.status === 'active'">
                Active
            </div>
            <div class="badge bg-danger" v-else>
                Inactive
            </div>
        </td>
        <td>
           
        </td>
    </tr>
</template>