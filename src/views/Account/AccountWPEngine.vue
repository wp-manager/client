<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';

let success = ref(false);
let error = ref(false);
let message = ref('');
let token = ref('');

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


        checkToken();

        if (res.ok) {
            // repeat string (*)
            token.value = '';
        }

    }).catch((err) => {
        success.value = false;
        error.value = true;
        message.value = err.message;
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
        checkToken();
    }).catch((err) => {
        success.value = false;
        error.value = true;
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
            <button class="btn btn-primary" type="button" id="button-addon2" @click="updateToken">
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
    </div>
</template>

<style scoped lang="scss"></style>