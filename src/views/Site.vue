<script setup lang="ts">
import Plugins from '@/components/Plugins.vue';
import Themes from '@/components/Themes.vue';
import Posts from '@/components/Posts.vue';
import Products from '@/components/Products.vue';
import { useApiStore } from '@/stores/api';
import { useSiteStore } from '@/stores/site';
import { ref } from 'vue';


const apiStore = useApiStore();

const props = defineProps({
    uri: {
        type: String
    },
});

</script>

<template>
  T: {{ apiStore.siteUri }}
  <main>
    <Posts />
    <hr>
    <Products />
    <hr>
    <Plugins />
    <hr>
    <Themes />
    <hr>
    <h1>Discovery</h1>
    <div v-if="apiStore.rootData">
      <div v-for="route, key in apiStore.rootData.routes" :key="route">
        <h2>{{ key }}</h2>
        <small>Namespace: {{ route.namespace }}</small><br>
        <small>Methods: {{ route.methods.join(', ') }}</small><br><br>
        <h2>Endpoints</h2>
        <br>
        <div v-for="endpoint in route.endpoints">
          Method: {{ endpoint.methods.join(', ') }}<br>
          Args: <br>
          <div v-if="endpoint.args">
            <small>
            <div v-for="arg, key in endpoint.args" :key="key">
              {{ key }}: <br>
                <div v-for="desc, key in arg" :key="key">
                  &nbsp;&nbsp;&nbsp;&nbsp; {{ key }}: {{ desc }}<br>
                </div>
              </div>
            </small>
          </div>
          <br><br>
        </div>
        <hr>
      </div>
    </div>
  </main>
</template>