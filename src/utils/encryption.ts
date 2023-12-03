type EncryptedData = {
    salt: Uint8Array,
    iv: Uint8Array,
    data: ArrayBuffer
}

/** Represents a class that handles encryption and decryption operations. */
class Encryption {
    private algorithm: {name: string, length: number};
    private keyDerivationAlgorithm: {name: string, hash: string, salt: string | Uint8Array, iterations: number};
    private ivLength: number;

    /**
     * Creates a new instance of the class.
     * 
     * @constructor
     */
    constructor() {
        // The encryption algorithm to be used.
        this.algorithm = {
            name: "AES-GCM",
            length: 256
        }

        // The key derivation algorithm to be used.
        this.keyDerivationAlgorithm = {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: '', // Placeholder for the salt
            iterations: 100000
        }

        // The length of the initialization vector.
        this.ivLength = 12; // Length of the initialization vector
    }

    /**
     * Derives a cryptographic key using the provided password and salt.
     * 
     * @param {string} password - The password used for key derivation.
     * @param {ArrayBuffer} salt - The salt used for key derivation.
     * 
     * @returns {Promise<CryptoKey>} A promise that resolves to the derived cryptographic key.
     */
    async deriveKey(password: string, salt: ArrayBuffer): Promise<CryptoKey> {
        const baseKey = await window.crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        ).catch((err) => {
            throw new Error(err);
        });


        const derivedKeyAlgorithm = {
            ...this.keyDerivationAlgorithm,
            salt: new Uint8Array(salt)
        };

        return await window.crypto.subtle.deriveKey(
            derivedKeyAlgorithm,
            baseKey,
            { name: this.algorithm.name, length: this.algorithm.length },
            false,
            ["encrypt", "decrypt"]
        ).catch((err) => {
            throw new Error(err);
        });
    }

    /**
     * Encrypts the given data using the provided password.
     * 
     * @param {string} data - The data to be encrypted.
     * @param {string} password - The password used for encryption.
     * 
     * @returns {Promise<Object>} - A promise that resolves to an object containing the salt, iv, and encrypted data.
     */
    async encrypt(data: string, password: string): Promise<EncryptedData> {
        // Generate a unique salt
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        // Generate a key from the password using the salt
        const key = await this.deriveKey(password, salt);
        // Generate a random initialization vector
        const iv = window.crypto.getRandomValues(new Uint8Array(this.ivLength));
        // Encrypt the data using the key and iv
        const encryptedData = await window.crypto.subtle.encrypt(
            { ...this.algorithm, iv: iv },
            key,
            new TextEncoder().encode(data)
        ).catch((err) => {
            throw new Error(err);
        });

        // Return the encrypted data
        return {
            salt, iv, data: encryptedData
        };
    }

    /**
     * Decrypts the encrypted data using the provided password.
     * 
     * @param {Object} encryptedData - The encrypted data object.
     * @param {string} password - The password used for decryption.
     * 
     * @returns {Promise<string>} - A promise that resolves to the decrypted data as a string.
     */
    async decrypt(encryptedData: EncryptedData, password: string): Promise<string> {
        const key = await this.deriveKey(password, encryptedData.salt);
        const iv = new Uint8Array(encryptedData.iv);
        const encryptedDataContents = new Uint8Array(encryptedData.data);

        const decryptedData = await window.crypto.subtle.decrypt(
            { ...this.algorithm, iv: iv },
            key,
            encryptedDataContents
        ).catch((err) => {
            throw new Error(err);
        });

        return new TextDecoder().decode(decryptedData);
    }

    /**
     * Serializes encrypted data into a JSON string.
     * 
     * @param {Object} encryptedData - The encrypted data object.
     * 
     * @returns {string} - The serialized JSON string.
     */
    serialise(encryptedData: EncryptedData): string {
        return JSON.stringify({
            salt: Array.from(encryptedData.salt),
            iv: Array.from(encryptedData.iv),
            data: Array.from(new Uint8Array(encryptedData.data))
        });
    }

    /**
     * Deserializes the serialized data.
     * 
     * @param {string} serialised - The serialized data to be deserialized.
     * 
     * @returns {Object} - The deserialized data.
     */
    deserialise(serialised: string): EncryptedData {
        const parsed = JSON.parse(serialised);

        return {
            salt: new Uint8Array(parsed.salt),
            iv: new Uint8Array(parsed.iv),
            data: Uint8Array.from(parsed.data).buffer
        };
    }
}

// Implementation example
const encryptionHandler = new Encryption();

// The password used for encryption/decryption.
// This should be stored securely in a password manager and use modern password best practices.
let password = "your-secure-password";

// The data string to be encrypted.
const dataToEncrypt = "This message must be kept secret!";

async function implementationExample() {
    console.log('======= Encrypt =======');
    // Encrypt
    const encrypted = await encryptionHandler.encrypt(dataToEncrypt, password);
    console.log("Encrypted:", encrypted);

    console.log('====== Serialise ======');
    // Serialise
    const serialised = encryptionHandler.serialise(encrypted);
    console.log("Serialised:", serialised);
    let serialised64 = btoa(serialised); // This would then be stored somewhere
    console.log("Serialised Base64:", serialised64);

    console.log('===== Deserialise =====');
    // Deserialise
    const deserialised = atob(serialised64); // This would be retrieved from storage
    console.log("Deserialised Base64:", deserialised);
    const deserialisedData = encryptionHandler.deserialise(deserialised);
    console.log("Deserialised:", deserialisedData);

    console.log('======= Decrypt =======');
    // Decrypt
    const decrypted = await encryptionHandler.decrypt(deserialisedData, password)
    console.log("Decrypted:", decrypted);
}

//implementationExample();

export default Encryption;