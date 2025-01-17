import { Logger } from "..";
/**
 * This class implements functions used by the browser library to perform cryptography operations such as
 * hashing and encoding. It also has helper functions to validate the availability of specific APIs.
 */
export declare class BrowserCrypto {
    private _keygenAlgorithmOptions;
    private logger;
    constructor(logger: Logger);
    /**
     * Returns a sha-256 hash of the given dataString as an ArrayBuffer.
     * @param dataString
     */
    sha256Digest(dataString: string): Promise<ArrayBuffer>;
    /**
     * Populates buffer with cryptographically random values.
     * @param dataBuffer
     */
    getRandomValues(dataBuffer: Uint8Array): void;
    /**
     * Generates a keypair based on current keygen algorithm config.
     * @param extractable
     * @param usages
     */
    generateKeyPair(extractable: boolean, usages: Array<KeyUsage>): Promise<CryptoKeyPair>;
    /**
     * Export key as Json Web Key (JWK)
     * @param key
     * @param format
     */
    exportJwk(key: CryptoKey): Promise<JsonWebKey>;
    /**
     * Imports key as Json Web Key (JWK), can set extractable and usages.
     * @param key
     * @param format
     * @param extractable
     * @param usages
     */
    importJwk(key: JsonWebKey, extractable: boolean, usages: Array<KeyUsage>): Promise<CryptoKey>;
    /**
     * Signs given data with given key
     * @param key
     * @param data
     */
    sign(key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    /**
     * Check whether IE crypto or other browser cryptography is available.
     */
    private hasCryptoAPI;
    /**
     * Checks whether IE crypto (AKA msCrypto) is available.
     */
    private hasIECrypto;
    /**
     * Check whether browser crypto is available.
     */
    private hasBrowserCrypto;
    /**
     * Helper function for SHA digest.
     * @param algorithm
     * @param data
     */
    private getSubtleCryptoDigest;
    /**
     * IE Helper function for SHA digest.
     * @param algorithm
     * @param data
     */
    private getMSCryptoDigest;
    /**
     * IE Helper function for generating a keypair
     * @param extractable
     * @param usages
     */
    private msCryptoGenerateKey;
    /**
     * IE Helper function for exportKey
     * @param key
     * @param format
     */
    private msCryptoExportJwk;
    /**
     * IE Helper function for importKey
     * @param key
     * @param format
     * @param extractable
     * @param usages
     */
    private msCryptoImportKey;
    /**
     * IE Helper function for sign JWT
     * @param key
     * @param data
     */
    private msCryptoSign;
    /**
     * Returns stringified jwk.
     * @param jwk
     */
    static getJwkString(jwk: JsonWebKey): string;
}
//# sourceMappingURL=BrowserCrypto.d.ts.map