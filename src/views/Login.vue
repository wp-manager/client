<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const checking = ref(false);
const available = ref(false);
const submitted = ref(false);

const formValidation = ref(false as string | false);

const inputValidation = ref({
  email: false as string | false,
  password: false as string | false,
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
  authStore.register(email.value, password.value).then(() => {
    authStore.login(email.value, password.value).then(() => {
      window.location.href = '/';
    });
  });
};

const login = () => {
  checking.value = true;
  authStore.login(email.value, password.value).then(() => {
    formValidation.value = false;
    window.location.href = '/';
  }).catch(() => {
    formValidation.value = 'Invalid email or password';
    checking.value = false;
  })

}

</script>

<template>
  <form style="max-width: 500px;" @submit.prevent>
    <h1 class="h4">Login/Register</h1>
    <hr>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" placeholder="example@gmail.com" aria-label="Email" v-model="email"
        :class="{ 'is-invalid': inputValidation.email }">
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

    <div class="d-flex gap-2 align-items-center">
      <div class="d-inline">
        <div>
          <button type="submit" class="btn btn-primary me-2" :disabled=" !password || checking"
            @click.prevent="login">Login</button>
          <button type="submit" class="btn btn-success" @click.prevent="register"
            :disabled="!email || !password || checking || available">Register</button>
        </div>
      </div>
      <div v-if="submitted">
        <small class="text-muted d-block" v-if="checking">Checking availability...</small>
        <small class="text-muted d-block" v-if="!checking && !available">Email already exists!</small>
        <small class="text-muted d-block" v-if="!checking && available">Redirecting...</small>
      </div>
      <div class="d-flex justify-content-end flex-grow-1">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" :disabled="checking">
          <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
      </div>
    </div>
    <div class="form-text text-danger" v-if="formValidation">
      {{ formValidation }}
    </div>
  </form>
</template>