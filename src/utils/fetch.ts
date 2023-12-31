class FetchUtils {

    static abortController = new AbortController();

    static abortFetches(reason?: string) {
        this.abortController.abort(reason);
    }
}

export default FetchUtils;