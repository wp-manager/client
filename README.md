# Site Manager UI
Designed to help manage and maintain WordPress websites

This tool utilises the WordPress REST API to gather information and perform actions. In addition, plugins on sites can extend the functionality of this tool, tailoring it for your needs

## Keeping it secure
- Each site is authenticated individually using an Application Password which is tied against the logged in WordPress user for that site
- The Application Password can only perform actions that is applicable to the user's role on each site
- Site credentials are stored using [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and are encrypted using a passphrase
- The passphrase is required to be set when launching the tool and is then used to encrypt and decrypt the site credentials.
- The passphrase is stored in the browser's [Session Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). This is cleared when either the tab is closed or the browser is closed.
- This tool is client-side only. No data is stored on a server.

## To Do
[-] Add info on CORS
[-] WordPress compatibility
[-] Plugins like WordFence blocking Application Passwords
[-] Add troubleshooting
