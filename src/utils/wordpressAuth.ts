import router from "@/router";
import { isValidURL, sanitiseURL } from "./url";

class WordpressAuth {
    private appID: string = "6708b25c-f31a-4a99-8dc5-68d575514c08";
    private callbackPath: string = "";
    public uri: string = "";

    constructor(url: string) {
        // get router history mode
        if (!isValidURL(url)) return;

        // Build the callback path
        const callbackRoute = router.resolve({ name: "add-site-callback" });
        this.callbackPath = new URL(
            callbackRoute.href,
            window.location.origin + import.meta.env.BASE_URL
        ).href;

        this.uri = sanitiseURL(url);
    }

    public getAuthorisationURL(): string {
        let url = `${this.uri}/wp-admin/authorize-application.php`;
        const urlParams = new URLSearchParams({
            app_name: "Site Manager UI by Darren",
            app_id: this.appID,
            success_url: this.callbackPath,
            reject_url: this.callbackPath + "?reject=true",
        });

        return `https://${url}/?${urlParams.toString()}`;
    }
}

export default WordpressAuth;
