<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue';
</script>

<template>
  <div class="app">
    
    <Sidebar />
    <div class="view flex-grow-1 p-3">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
}
.view{
  overflow: hidden;
}
</style>
