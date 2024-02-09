<script setup lang="ts">
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
</script>

<template>
    <TransitionGroup name="list" tag="div" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-for="toast in toastStore.toasts"
            :key="toast.id">
            <div class="toast-header" v-if="toast.title || toast.altText">
                <strong class="me-auto" v-if="toast.title">{{ toast.title }}</strong>
                <small v-if="toast.altText">{{ toast.altText }}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" v-if="toast.showClose"
                    @click="toastStore.removeToast(toast)"></button>
            </div>
            <div class="d-flex">
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                    v-if="(!toast.title && !toast.altText) && toast.showClose"
                    @click="toastStore.removeToast(toast)"></button>
            </div>
        </div>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
    transition: opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}
</style>