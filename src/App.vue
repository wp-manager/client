<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue';
import { useAuthStore } from './stores/auth';
import { useMetaStore } from './stores/meta';

const metaStore = useMetaStore();

</script>

<template>
  <div class="app">
    <Sidebar />
    <div class="view flex-grow-1">
      <div class="progress" role="progressbar" aria-label="Animated striped example"
        :class="{ 'visible': (metaStore.finishedRequests !== metaStore.pendingRequests) }">
        <div class="progress-bar progress-bar-striped progress-bar-animated"
        :class="{ 'bg-success': (metaStore.finishedRequests === metaStore.pendingRequests)}"
          :style="{ width: (metaStore.finishedRequests / metaStore.pendingRequests) * 100 + '%' }"></div>
      </div>
      <div class="view-wrapper p-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
}

.view {
  position: relative;
  overflow: hidden;
  max-width: calc(100% - var(--sidebar-width));
  transition: max-width 0.2s ease-in-out;
  margin-left: auto;

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
    height: 4px;
    transition: opacity .2s ease-in-out;
    opacity: 0;
    pointer-events: none;
    transition-delay: 1s;

    &-bar{
      animation-direction: reverse;
      transition: all .25s ease-in-out;
    }

    &.visible {
      pointer-events: all;
      transition-delay: 0s;
      transition-duration: 0.2s;
      opacity: 1;
    }
  }
}
</style>