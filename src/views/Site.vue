<script setup lang="ts">
defineProps<{
  uri?: string
}>()
</script>

<template>
  <main>
    <RouterView view-prop="uri" />
  </main>

</template>