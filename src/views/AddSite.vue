<script setup lang="ts">
import { isValidURL } from '@/utils/url';
import WordpressAuth from '@/utils/wordpressAuth';
import { onMounted, ref } from 'vue';

const url = ref('');
const authError = ref('');

const beginAuthFlow = () => {
  if (!isValidURL(url.value)) return;

  const auth = new WordpressAuth(url.value);
  window.location.replace(auth.getAuthorisationURL());
};

const checkURLValidity = () => {
  if (!isValidURL(url.value)) {
    authError.value = 'Please enter a valid URL';
  } else {
    authError.value = '';
  }
};


import {useSitesStore} from '@/stores/sites';

const sitesStore = useSitesStore();

</script>

<template>
  <main>
    <form id="addSite" @submit.prevent="beginAuthFlow">
      <input type="text" name="url" id="url" v-model="url" placeholder="https://example.com" @keyup="checkURLValidity" />
      <span class="error" v-if="authError">{{ authError }}</span>
      {{ url }}
      <button type="submit">Add Site</button>
    </form>
  </main>
</template>