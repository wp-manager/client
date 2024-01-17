<script setup lang="ts">
import { useMetaStore } from '../stores/meta';
const metaStore = useMetaStore();
</script>

<template>
    <div class="progress" role="progressbar" aria-label="Animated striped example"
      :class="{ 'visible': (metaStore.finishedRequests !== metaStore.pendingRequests) }">
      <div class="progress-bar progress-bar-striped progress-bar-animated"
        :class="{ 'bg-success': (metaStore.finishedRequests === metaStore.pendingRequests) }"
        :style="{ width: (metaStore.finishedRequests / metaStore.pendingRequests) * 100 + '%' }"></div>
    </div>
</template>

<style scoped lang="scss">
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

  &-bar {
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
</style>