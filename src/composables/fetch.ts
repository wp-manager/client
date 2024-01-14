// Fetch composable

import { useMetaStore } from "@/stores/meta";
import { ref } from "vue";

type UseFetchOptions = {
    immediate: boolean;
};


export type UseFetchReturn = {
    data: any;
    error: any;
    loading: any;
    execute: () => Promise<void>;
    callback: () => void;
};

export const useFetch = (
    requestInfo: RequestInfo,
    requestInit?: RequestInit,
    options?: UseFetchOptions
): UseFetchReturn => {
    const metaStore = useMetaStore();
    
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const callback = ref<() => void>(null); // Add a callback ref
    
    const execute = async () => {
        loading.value = true;
        metaStore.pending();
        await fetch(requestInfo, requestInit)
            .then(async (res) => {
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return await res.json();
            })
            .then((res) => {
                if (res.error) {
                    throw Error(res.error);
                }
                return res;
            })
            .then((res) => (data.value = res))
            .catch((err) => (error.value = err.message))
            .finally(() => {
                metaStore.finish();
                loading.value = false;
                if (callback.value) {
                    callback.value(); // Invoke the callback if it exists
                }
            });
    };

    const defaultUseFetchOptions: UseFetchOptions = {
        immediate: true,
    };

    options = Object.assign(defaultUseFetchOptions, options);

    if (options?.immediate) {
        execute();
    }

    return { data, error, loading, execute, callback() {
    }}
};
