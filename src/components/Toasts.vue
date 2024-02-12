<script setup lang="ts">
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
</script>

<template>
    <TransitionGroup name="toast-item" tag="div" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-for="toast in toastStore.toasts"
            :key="toast.id" :style="{ '--timeout': `${(toast.timeout / 1000) - 1}s` }">
            <div class="toast-header" v-if="toast.title || toast.altText">
                <strong class="me-auto" v-if="toast.title">{{ toast.title }}</strong>
                <small v-if="toast.altText">{{ toast.altText }}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" v-if="toast.showClose"
                    @click="toastStore.removeToast(toast)"></button>
            </div>

            <div class="d-flex">
                <div class="toast-body" v-html="toast.message">
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                    v-if="(!toast.title && !toast.altText) && toast.showClose"
                    @click="toastStore.removeToast(toast)"></button>
            </div>

            <div class="toast-bar" :class="{'active': toast.timeout && !toast.persist}"></div>
        </div>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.toast-item-enter-active,
.toast-item-leave-active {
    transition: opacity 0.5s ease;
}

.toast-item-enter-from,
.toast-item-leave-to {
    opacity: 0;
}

.toast {
    overflow: hidden;
    position: relative;

    &.show {
        .toast-bar {
            animation: progress var(--timeout) linear forwards;
            animation-delay: 500ms;
        }
    }

    .toast-bar {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: opacity 1s ease;
        height: 2px;
        background-color: var(--bs-secondary);
        &.active {
            opacity: 1;
        }
    }
}

@keyframes progress {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}
</style>