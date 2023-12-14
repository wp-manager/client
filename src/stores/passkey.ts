import { defineStore } from "pinia";
import { startAuthentication, startRegistration, browserSupportsWebAuthn } from "@simplewebauthn/browser";


export const usePasskeyStore = defineStore("passkey", () => {
    const url = 'home.mrdarrengriffin.com:8443';
    async function generatePasskeyAuthenticationOptions(){
        await fetch(
            `https://${url}/passkey/generate-authentication-options`
        )
            .then((resp) => resp.json())
            .then(async (opts) => {
                startAuthentication(opts, true)
                    .then(async (asseResp) => {
                        console.log('1', asseResp);
                        const resp = await fetch(
                            `https://${url}/passkey/verify-authentication-response`,
                            {
                                method: "POST",
                                body: JSON.stringify(asseResp),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        const verification = await resp.json();
                        console.log(verification);
                        if (verification && verification.verified) {
                            console.log("Verified!");
                            alert("Verified!");
                        } else {
                            console.log("Not verified!");
                        }
                    })
                    .catch((err) => {
                        console.log("(Autofill)", err);
                    }).finally(() => {
                        console.log('2');
                    });
            }).catch((err) => {
                console.log(err);
            });
    };

    async function generatePasskeyRegistrationOptions(){
        const resp = await fetch(`https://${url}/passkey/generate-registration-options`)
        let attResp;
        try {
            const opts = await resp.json();

            console.log(opts);

            // Hide auth form
            // ...

            attResp = await startRegistration(opts);

            console.log(attResp);
        } catch (err) {
            console.log(err);
            return;
        }
        
        const verificationResp = await fetch(`https://${url}/passkey/verify-registration-response`, {
            method: 'POST',
            body: JSON.stringify(attResp),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const verificationJSON = await verificationResp.json();
        console.log(verificationJSON);

        if (verificationJSON && verificationJSON.verified) {
            console.log('Verified!');
            alert('Verified!');
        } else {
            console.log('Not verified!', verificationJSON);
        }

    };

    async function authenticate(){
        let resp = await fetch(`https://${url}/passkey/generate-authentication-options`);
        let attResp;
        try {
            const opts = await resp.json();
            attResp = await startAuthentication(opts);
        } catch (err) {
            return;
        }

        const verificationResp = await fetch(`https://${url}/passkey/verify-authentication-response`, {
            method: "POST",
            body: JSON.stringify(attResp),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const verificationJSON = await verificationResp.json();
        console.log(verificationJSON);

        if (verificationJSON && verificationJSON.verified) {
            console.log("Verified!");
            alert("Verified!");
        } else {
            console.log("Not verified!", verificationJSON);
        }
    };

    //generatePasskeyAuthenticationOptions();

    return {
        generatePasskeyAuthenticationOptions,
        generatePasskeyRegistrationOptions,
        authenticate        
    }
});
