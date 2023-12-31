<script setup lang="ts">
import { isValidURL, sanitiseURL } from '@/utils/url';
import { ref } from 'vue';
let apiBase = import.meta.env.APP_SERVER_URL;

const url = ref('');

const beginAuthFlow = () => {
  if (!isValidURL(url.value)) return;
  url.value = sanitiseURL(url.value);


  window.location.replace(`${apiBase}/site-auth/${url.value}`);
};
</script>

<template>
  <main>
    <form id="addSite" @submit.prevent="beginAuthFlow" style="max-width: 500px;">
      <div class="input-group mb-2">
        <input type="text" class="form-control" name="url" id="url" v-model="url" placeholder="https://example.com"
        aria-describedby="submitBtn">
        <button class="btn btn-primary" type="submit" id="submitBtn" :disabled="!isValidURL(url)">Add WordPress Site</button>
      </div>
      <div class="form-text">You will be redirected to the WordPress site you are trying to add and asked to
        login and authorise the application. This will then allow WP Manager to access your site based on the permissions
        of the user you logged in as.</div>

    </form>
  </main>
</template>