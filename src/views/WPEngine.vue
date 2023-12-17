<script setup lang="ts">
import Sites from '@/components/wpengine/Sites.vue';
import { useApiStore } from '@/stores/api';
import { useSiteStore } from '@/stores/site';
import { ref } from 'vue';

const apiStore = useApiStore();

const loading = ref(true);
const wpeUserData = ref({});

apiStore.getWPEngineRoute('user').then((res) => {
    loading.value = false;
    wpeUserData.value = res;
});

</script>

<template>
    <h1>WP Engine</h1>
    <p v-if="loading">Authenticating...</p>
    <div v-if="!loading && !wpeUserData">
        <p>Authentication failed.</p>
    </div>
    <div v-if="!loading && wpeUserData">
        <p>Authenticated as {{ wpeUserData.first_name }} {{ wpeUserData.last_name }} ({{ wpeUserData.email }})</p>
    </div>
    <hr>
    <Transition name="fade">
        <div class="loading" v-if="loading"></div>
    </Transition>
    <div v-if="!loading">
        <Sites />
    </div>
</template>