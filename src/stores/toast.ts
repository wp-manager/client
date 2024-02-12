import { defineStore } from "pinia";
import { reactive } from "vue";

type ToastInstance = {
    id?: string;
    persist?: boolean;
    timeout?: number;
    title?: string;
    altText?: string;
    message: string;
    showClose?: boolean;
}

const toastDefaults = {
    timeout: 5000,
    persist: false,
    showClose: true,
};

export const useToastStore = defineStore("toast", {
    state: () => reactive({
        toasts: [] as ToastInstance[]
    }),
    actions: {
        addToast(toast: ToastInstance): ToastInstance {
            toast = Object.assign({}, toastDefaults, toast);
            toast.id = toast.id || Math.random().toString(36).substring(2, 11);
            this.toasts.push(toast);

            if(!toast.persist){
                setTimeout(() => {
                    this.removeToast(toast);
                }, toast.timeout);
            }

            return toast;
        },
        removeToast(toastInstance: ToastInstance): void {
            let index = this.toasts.findIndex((t) => t.id === toastInstance.id);
            if(index > -1) this.toasts.splice(index, 1);
        },
        removeAllToasts(): void {
            this.toasts = [];
        }
    },    
});
