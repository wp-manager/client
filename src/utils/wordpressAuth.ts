import { isValidURL, sanitiseURL } from "./url";

class WordpressAuth {
    private appID: string = '6708b25c-f31a-4a99-8dc5-68d575514c08';
    private callbackPath: string = '/sites/add/callback';
    public uri: string = '';

    constructor(url: string) {
        if(!isValidURL(url)) return;

        this.uri = sanitiseURL(url);
    }

    public getAuthorisationURL(): string {
        let url = `${this.uri}/wp-admin/authorize-application.php`;
        const urlParams = new URLSearchParams({
            'app_name': 'Site Manager UI by Darren',
            'app_id': this.appID,
            'success_url': window.location.origin + this.callbackPath,
            'reject_url': window.location.origin + this.callbackPath            
        });

        return `https://${url}/?${urlParams.toString()}`;
    }
}

export default WordpressAuth;