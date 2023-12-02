import { AES, enc } from 'crypto-js';

class Encryption {

    private passphrase: string;

    constructor(passphrase: string) {
        if(!passphrase) throw new Error('Passphrase is required');

        this.passphrase = passphrase;
        sessionStorage.setItem('passphrase', passphrase);
    }

    public static encrypt(data: string): string {
        return AES.encrypt(data, sessionStorage.getItem('passphrase')).toString();
    }

    public static decrypt(data: string): string {
        return AES.decrypt(data, sessionStorage.getItem('passphrase')).toString(enc.Utf8);
    }

    // function to check if the passphrase is valid for the given data
    public static isValid(data: string) {
        try {
            return !!AES.decrypt(data, sessionStorage.getItem('passphrase')).toString(enc.Utf8);
           
        } catch (error) {
            return false;
        }
    }

}

export default Encryption;