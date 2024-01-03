class FetchUtils {
    private static queue: { path: string; options: RequestInit }[] = [];

    static abortController = new AbortController();

    static abortFetches(reason?: string) {
        this.abortController.abort(reason);
    }

    static queueRequest(path: string, options: RequestInit = {}) {
        this.queue.push({ path, options });
    }

    static async processQueue() {
        const queue = this.queue;
        this.queue = [];

        await Promise.all(queue.map(request => fetch(request.path, request.options).then(response => response.json()))).then((res) => {
            return res;
        });
    }
}

export default FetchUtils;
