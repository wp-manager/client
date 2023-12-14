<script setup lang="ts">
import { usePasskeyStore } from '@/stores/passkey';

const passkeyStore = usePasskeyStore();

const stopSubmit = (event: Event) => {
  event.preventDefault();
  return false;
};



</script>

<template>
  <main>
    
    <form :onsubmit="stopSubmit">
            <section id="inputUsername">
              <label for="username">Username</label>
              <input type="text" name="username" autocomplete="username webauthn" autofocus />
              <br />
              <label for="password">Password</label>
              <input type="password" name="password" autocomplete="current-password webauthn" />
              <br />
            </section>
            <button @click="passkeyStore.generatePasskeyRegistrationOptions()">
              <strong>🔐&nbsp;Authenticate</strong>
            </button>
          </form><hr>
    <button @click="passkeyStore.generatePasskeyAuthenticationOptions()">Generate Passkey Authentication Options</button>
    <button @click="passkeyStore.generatePasskeyRegistrationOptions()">Generate Passkey Authentication</button>
    <button @click="passkeyStore.authenticate()">Authenticate</button>

  </main>
</template>