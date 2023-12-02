<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue';
</script>

<template>
  <div class="app">
    
    <Sidebar />
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;

  .view{
    flex-grow: 1;
    padding: .75rem;
  }
}
</style>
