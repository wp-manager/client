<script setup lang="ts">
import {inject} from 'vue';


const message = inject('testMessage', 'default message');
</script>

<template>
    <RouterView />
</template>
