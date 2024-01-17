<script setup lang="ts">
import { useAccountStore } from './stores/account';

import Blank from './layouts/Blank.vue';
import Default from './layouts/Default.vue';

const accountStore = useAccountStore();

</script>

<template>
  <div class="app">
    <Default v-if="accountStore.account" />
    <Blank v-else/>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  height: 100%;
}
</style>