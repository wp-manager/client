<script setup lang="ts">
import Plugin from '@/components/wordpress/iterables/Plugin.vue';
import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

let finished = ref(0);
let times = ref({} as any);
const plugins = ref({} as any);

apiStore.getSites().then((sites) => {
  sites.forEach((site) => {
    apiStore.siteUri = site.uri;
    times.value[site.uri] = new Date().getTime();
    apiStore.getRoute(`wp/v2/plugins`).then((res) => {
      plugins.value[site.uri] = res;
    }).finally(() => {
      times.value[site.uri] = new Date().getTime() - times.value[site.uri];
      finished.value++;

    });
  });
});
</script>

<template>
  <h2>All Plugins</h2>
  <div v-if="finished < apiStore.sites.length">
    Loading ({{ finished }} of {{ apiStore.sites.length }} sites loaded)
  </div>
  <div class="plugins" v-if="plugins">
    <div class="loading" v-if="finished < apiStore.sites.length"></div>
    <div v-for="pluginList,site in plugins">
      <h3>{{ site }} <small v-if="times[site]">(took {{ times[site] }}ms)</small></h3>
      <div class="plugins">
        <Plugin v-for="plugin in pluginList" :key="plugin.name" :plugin="plugin" />
      </div>
      <br><br>
    </div>
  </div>
</template>