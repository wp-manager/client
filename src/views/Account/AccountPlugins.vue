
<script setup lang="ts">
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();

let apiBase = import.meta.env.APP_SERVER_URL;

const installPlugin = () => {
    const path = prompt('Enter the plugin path');
    // POST to /api/v1/plugin/install
    fetch(`${apiBase}/account/install-plugin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            path
        })
    }).then(async (res) => {
        if (res.ok) {
            accountStore.getSession(true);
            console.log('Plugin installed');
            return;
        }
        console.log('Plugin install failed');


    });
}

const uninstallPlugin = (path: string) => {
    // POST to /api/v1/plugin/install
    fetch(`${apiBase}/account/uninstall-plugin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            path
        })
    }).then(async (res) => {
        if (res.ok) {
            accountStore.getSession(true);
            console.log('Plugin uninstalled');
            return;
        }
        console.log('Plugin uninstall failed');
    });
};
</script>

<template>
    <a class="btn btn-primary" @click="installPlugin">Install Plugin</a>
    <div class="card" style="width: 18rem;" v-for="plugin in accountStore?.account?.plugins">
        <div class="card-body">
            <h5 class="card-title">{{ plugin }}</h5>
            <a class="card-link" @click="uninstallPlugin(plugin)">Uninstall</a>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>