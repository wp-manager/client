<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const checking = ref(false);
const available = ref(false);
const submitted = ref(false);

const formValidation = ref(false as string | false);

const inputValidation = ref({
  email: false as string | false,
  password: false as string | false,
  passwordConfirm: false as string | false,
})

const checkUserAvailability = () => {
  checking.value = true;
  submitted.value = true;
  authStore.checkEmailAvailability(email.value).then(valid => {
    checking.value = false;
    available.value = valid;
  });
};

const register = () => {
  if (password.value !== passwordConfirm.value) {
    inputValidation.value.passwordConfirm = 'Passwords do not match';
    return;
  }
  authStore.register(email.value, password.value).then(() => {
    authStore.login(email.value, password.value).then(() => {
      window.location.href = '/';
    });
  });
};

</script>

<template>
  <div class="center">
    <div class="logo">
      <img src="/wpm-logo.svg" alt="Logo" />
    </div>
    <form style="width: 100%;max-width: 350px;" @submit.prevent>
      <h1 class="h4 mb-2">Register</h1>
      <hr class="mb-3">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="example@gmail.com" aria-label="Email" v-model="email"
          :class="{ 'is-invalid': inputValidation.email }" required>
        <div class="form-text invalid-feedback" v-if="inputValidation.email">
          {{ inputValidation.email }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password"
          :class="{ 'is-invalid': inputValidation.password }">
        <div class="form-text invalid-feedback" v-if="inputValidation.password">
          {{ inputValidation.password }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password-confirm" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="password-confirm" placeholder="Confirm Password"
          v-model="passwordConfirm" :class="{ 'is-invalid': inputValidation.passwordConfirm }">
        <div class="form-text invalid-feedback" v-if="inputValidation.passwordConfirm">
          {{ inputValidation.passwordConfirm }}
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-100"
          :disabled="!email || !password || !passwordConfirm || checking || (password !== passwordConfirm)"
          @click.prevent="register">Register</button>
        <small class="d-block text-muted mt-2">
          Already have an account? <router-link :to="{ name: 'login' }" class="text-white text-decoration-none" :class="{
            'disabled': !email || !password || checking || available
          }">Login</router-link>
        </small>

      </div>
      <div class="form-text text-danger" v-if="formValidation">
        {{ formValidation }}
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