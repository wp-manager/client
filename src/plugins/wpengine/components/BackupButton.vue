<script setup lang="ts">
import { useWPEStore } from '../stores/wpe';

const wpeStore = useWPEStore();

wpeStore.engine.getUser();
</script>

<template>
    <div class="btn btn-primary">Backup</div>
</template>