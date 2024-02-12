<script setup lang="ts">
import router from '@/router';
import { useAccountStore } from '@/stores/account';
import { useToastStore } from '@/stores/toast';
import { ref } from 'vue';

const accountStore = useAccountStore();
const toastStore = useToastStore();

const email = ref('');
const password = ref('');

const checking = ref(false);

const formValidation = ref(false as string | false);


let apiBase = import.meta.env.APP_SERVER_URL;

const login = async () => {
  checking.value = true;
  fetch(`${apiBase}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(async (res) => {
    if (res.ok) {
      await accountStore.getSession(true);
      await router.push({ name: 'home' });

      toastStore.addToast({
        title: 'Login successful',
        message: 'Welcome back to WP Manager !'
      });

      toastStore.addToast({
        title: 'Beta notice',
        message: 'WP Manager is currently in beta and under active development meaning that there may be bugs and missing features.<br><br>If you\'d like to report an issue or request a feature, please do so via <a href="https://github.com/wp-manager/client/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a>.<br><br>If you would like to learn more about WP Manager or sponsor the project, please visit <a href="https://github.com/sponsors/wp-manager" target="_blank" rel="noopener noreferrer">GitHub Sponsors</a>.',
        timeout: 30000
      });
      return;
    }

    const data = await res.json();
    formValidation.value = data.message;
    checking.value = false;
  });
}

</script>

<template>
  <div class="center">
    <div class="logo">
      <img src="/wpm-logo.svg" alt="Logo" />
    </div>
    <form style="width: 100%;max-width: 350px;" @submit.prevent>
      <h1 class="h4 mb-2">Login</h1>
      <hr class="mb-3">
      <div class="alert alert-info" role="alert" v-if="Object.keys($route.query).includes('registered')">
        Your account has been created, please login.
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="example@gmail.com" aria-label="Email" v-model="email">
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
        <div class="form-text text-danger text-center mt-0 mt-2" v-if="formValidation">
          {{ formValidation }}
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-100" :disabled="!password || checking"
          @click.prevent="login">Login</button>
        <small class="d-block text-muted mt-2">
          Don't have an account? <router-link :to="{ name: 'register' }" class="text-white text-decoration-none" :class="{
            'disabled': checking
          }">Register</router-link>
        </small>

      </div>
    </form>
  </div>
</template>
<style scoped>
.logo {
  max-width: 10rem;

  img {
    width: 100%;
  }
}

.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>