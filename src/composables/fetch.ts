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
                    const body = await res.json();
                    if (body.message) {
                        throw Error(body.message);
                    }
                    throw Error("Could not fetch data");
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

    return { data, error, loading, execute, callback() {} };
};

export function useNewFetch(url: string, options?: RequestInit | Object) {
    // Reactive variables
    const loading = ref(false);
    const data = ref({} as any);
    const ok = ref(false);
    const error = ref(null as any);
    const dirty = ref(false);

    // Callbacks
    const onExecute = ref(() => {});
    const onFinally = ref(() => {});
    const onError = ref(() => {});
    const onSuccess = ref(() => {});

    // Functions
    const clear = (delay: number = 0) => {
        setTimeout(() => {
            loading.value = false;
            data.value = {};
            ok.value = false;
            error.value = null;
            dirty.value = false;
        }, delay);
    };

    const execute = () => {
        loading.value = true;
        data.value = {};
        ok.value = false;
        error.value = null;
        dirty.value = true;

        if (onExecute.value) {
            onExecute.value();
        }

        setTimeout(() => {
            fetch(url, options)
                .then(async (res) => {
                    if (!res.ok) {
                        const body = await res.json();
                        throw Error(body.message);
                    }
                    ok.value = res.ok;
                    return res;
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    data.value = res;
                    onSuccess.value();
                })
                .catch((err) => {
                    error.value = err;
                    onError.value();
                })
                .finally(() => {
                    loading.value = false;
                    onFinally.value();
                });
        }, 500);
    };

    return {
        loading,
        data,
        ok,
        error,
        execute,
        clear,
        dirty,
        onExecute,
        onFinally,
        onError,
        onSuccess,
    };
}
