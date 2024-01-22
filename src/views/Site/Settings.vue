<script setup lang="ts">
import type BackupButton from '@/plugins/wpengine/components/BackupButton.vue';
import {inject} from 'vue';


const message = inject('testMessage', 'default message');
</script>

<template>
    Message: {{ message }}
    <BackupButton />
</template>