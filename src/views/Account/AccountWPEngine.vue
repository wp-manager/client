<script setup lang="ts">
import { useWPEStore } from '@/plugins/wpengine/stores/wpe';
import { useAccountStore } from '@/stores/account';
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';

let success = ref(false);
let error = ref(false);
let message = ref('');
let token = ref('');

const wpeStore = useWPEStore();
const accountStore = useAccountStore();

let apiBase = import.meta.env.APP_SERVER_URL;

const { data: hasToken, isFetching: tokenLoading, error: tokenError, execute: checkToken } = useFetch(`${apiBase}/plugins/wp-engine-api-proxy/auth`, {
    method: 'GET',
    credentials: 'include'
});

const updateToken = async () => {
    fetch(`${apiBase}/plugins/wp-engine-api-proxy/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            token: token.value
        })
    }).then(async (res) => {
        const body = await res.json();
        message.value = body.message;
        success.value = res.ok;
        error.value = !res.ok;
        accountStore.getSession(true);
        wpeStore.engine.data = {};
        wpeStore.engine.getUser();
        checkToken();

        if (res.ok) {
            // repeat string (*)
            token.value = '';
        }

    }).catch((err) => {
        success.value = false;
        error.value = true;
        message.value = err.message;
        wpeStore.engine.data = {};
        wpeStore.engine.getUser();
    });
}

const deleteToken = async () => {
    fetch(`${apiBase}/plugins/wp-engine-api-proxy/auth`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(async (res) => {
        const body = await res.json();
        message.value = body.message;
        success.value = res.ok;
        error.value = !res.ok;
        accountStore.getSession(true);
        wpeStore.engine.data = {};
        wpeStore.engine.getUser();
        checkToken();
    }).catch((err) => {
        success.value = false;
        error.value = true;
        wpeStore.engine.data = {};
        wpeStore.engine.getUser();
        message.value = err.message;
    });
}
</script>

<template>
    <div style="max-width: 500px;">
        <h1 class="h4 mb-2">WPEngine API Token</h1>
        <hr class="mb-3">
        <div class="mb-3">
            <strong>
                Token Status:
            </strong>
            <span v-if="tokenLoading">Checking...</span>
            <span v-else-if="hasToken">WP Engine API token exists</span>
            <span v-else-if="tokenError">No WP Engine API token set</span>
        </div>
        <div class="input-group mb-3">
            <input type="password" class="form-control " placeholder="WPEngine API Token" aria-label="WPEngine API Token"
                aria-describedby="button-addon2" v-model="token">
            <button class="btn btn-primary" type="button" id="button-addon2" @click="updateToken" :disabled="!token">
                <span v-if="!hasToken">Add</span>
                <span v-else>Update</span>
                Token</button>
            <button class="btn btn-danger" type="button" id="button-addon2" @click="deleteToken"
                :disabled="!hasToken">Delete Token</button>
        </div>
        <div class="alert alert" :class="{
            'alert-success': success,
            'alert-danger': error
        }" role="alert" v-if="message">
            <i class="bi bi-check-circle-fill me-2" v-if="success"></i>
            <i class="bi bi-exclamation-circle-fill me-2" v-if="error"></i>
            {{ message }}
        </div>
        <template v-if="hasToken && wpeStore.engine.getUser()">
            <hr>
            <h5 class="mb-2">WPEngine User</h5>
            <template v-if="hasToken && wpeStore.engine.getUser().loading">
                Loading...
            </template>
            <template v-if="hasToken && wpeStore.engine.getUser().data">
                <div v-if="wpeStore.engine.getUser()?.data?.id">
                    <strong class="me-1">ID:</strong>
                    <span class="text-muted">{{ wpeStore.engine.getUser()?.data?.id }}</span>
                </div>
                <div v-if="wpeStore.engine.getUser()?.data?.first_name">
                    <strong class="me-1">First Name:</strong>
                    <span class="text-muted">{{ wpeStore.engine.getUser()?.data?.first_name }}</span>
                </div>
                <div v-if="wpeStore.engine.getUser()?.data?.last_name">
                    <strong class="me-1">Last Name:</strong>
                    <span class="text-muted">{{ wpeStore.engine.getUser()?.data?.last_name }}</span>
                </div>
                <div v-if="wpeStore.engine.getUser()?.data?.phone_number">
                    <strong class="me-1">Phone Number:</strong>
                    <span class="text-muted">{{ wpeStore.engine.getUser()?.data?.phone_number }}</span>
                </div>
            </template>
            <template v-else-if="wpeStore.engine.getUser()?.error">
                <div class="alert alert-warning" role="alert">
                    <i class="bi bi-exclamation-circle-fill me-2"></i>
                    {{ wpeStore.engine.getUser()?.error }}
                </div>
            </template>
        </template>
        <template v-if="hasToken && wpeStore.engine.getUser()">
            <hr>
            <h5 class="mb-2">WPEngine Accounts</h5>
            <template v-if="hasToken && wpeStore.engine.getAccounts().loading">
                Loading...
            </template>
            <template v-if="hasToken && wpeStore.engine.getAccounts().data">
                {{ wpeStore.engine.getAccounts().data }}
            </template>
        </template>
        <template v-if="hasToken && wpeStore.engine.getUser()">
            <hr>
            <h5 class="mb-2">WPEngine Sites</h5>
            <template v-if="hasToken && wpeStore.engine.getSites().loading">
                Loading...
            </template>
            <template v-if="hasToken && wpeStore.engine.getSites().data">
                
                <ul class="list-group">
                    <li v-for="site in wpeStore.engine.getSites().data?.results" class="list-group-item">
                        <div>{{ site?.name }}</div>
                        <div class="d-flex gap-1">
                            <div class="badge wpe-env rounded-pill" v-for="install in site?.installs" :title="install?.environment"
                            :class="{
                                'wpe-env--production': install?.environment === 'production',
                                'wpe-env--staging': install?.environment === 'staging',
                                'wpe-env--development': install?.environment === 'development'
                                
                            }"
                        >{{ install?.name }}</div>
                    </div>
                    </li>
                </ul>
            </template>
        </template>
        


    </div>
</template>

<style scoped lang="scss"></style>