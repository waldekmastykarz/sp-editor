import { CommonAuthorizationCodeRequest, ICrypto, AccountEntity, IdTokenEntity, AccessTokenEntity, RefreshTokenEntity, AppMetadataEntity, CacheManager, ServerTelemetryEntity, ThrottlingEntity, Logger, AuthorityMetadataEntity, AccountInfo, ValidCredentialType } from "@azure/msal-common";
import { CacheOptions } from "../config/Configuration";
import { InteractionType } from "../utils/BrowserConstants";
/**
 * This class implements the cache storage interface for MSAL through browser local or session storage.
 * Cookies are only used if storeAuthStateInCookie is true, and are only used for
 * parameters such as state and nonce, generally.
 */
export declare class BrowserCacheManager extends CacheManager {
    private cacheConfig;
    private browserStorage;
    private internalStorage;
    private temporaryCacheStorage;
    private logger;
    private readonly COOKIE_LIFE_MULTIPLIER;
    constructor(clientId: string, cacheConfig: Required<CacheOptions>, cryptoImpl: ICrypto, logger: Logger);
    /**
     * Returns a window storage class implementing the IWindowStorage interface that corresponds to the configured cacheLocation.
     * @param cacheLocation
     */
    private setupBrowserStorage;
    /**
     *
     * @param cacheLocation
     */
    private setupTemporaryCacheStorage;
    /**
     * Migrate all old cache entries to new schema. No rollback supported.
     * @param storeAuthStateInCookie
     */
    private migrateCacheEntries;
    /**
     * Utility function to help with migration.
     * @param newKey
     * @param value
     * @param storeAuthStateInCookie
     */
    private migrateCacheEntry;
    /**
     * Parses passed value as JSON object, JSON.parse() will throw an error.
     * @param input
     */
    private validateAndParseJson;
    /**
     * fetches the entry from the browser storage based off the key
     * @param key
     */
    getItem(key: string): string | null;
    /**
     * sets the entry in the browser storage
     * @param key
     * @param value
     */
    setItem(key: string, value: string): void;
    /**
     * fetch the account entity from the platform cache
     * @param accountKey
     */
    getAccount(accountKey: string): AccountEntity | null;
    /**
     * set account entity in the platform cache
     * @param key
     * @param value
     */
    setAccount(account: AccountEntity): void;
    /**
     * generates idToken entity from a string
     * @param idTokenKey
     */
    getIdTokenCredential(idTokenKey: string): IdTokenEntity | null;
    /**
     * set IdToken credential to the platform cache
     * @param idToken
     */
    setIdTokenCredential(idToken: IdTokenEntity): void;
    /**
     * generates accessToken entity from a string
     * @param key
     */
    getAccessTokenCredential(accessTokenKey: string): AccessTokenEntity | null;
    /**
     * set accessToken credential to the platform cache
     * @param accessToken
     */
    setAccessTokenCredential(accessToken: AccessTokenEntity): void;
    /**
     * generates refreshToken entity from a string
     * @param refreshTokenKey
     */
    getRefreshTokenCredential(refreshTokenKey: string): RefreshTokenEntity | null;
    /**
     * set refreshToken credential to the platform cache
     * @param refreshToken
     */
    setRefreshTokenCredential(refreshToken: RefreshTokenEntity): void;
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey
     */
    getAppMetadata(appMetadataKey: string): AppMetadataEntity | null;
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata
     */
    setAppMetadata(appMetadata: AppMetadataEntity): void;
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetryKey
     */
    getServerTelemetry(serverTelemetryKey: string): ServerTelemetryEntity | null;
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey
     * @param serverTelemetry
     */
    setServerTelemetry(serverTelemetryKey: string, serverTelemetry: ServerTelemetryEntity): void;
    /**
     *
     */
    getAuthorityMetadata(key: string): AuthorityMetadataEntity | null;
    /**
     *
     */
    getAuthorityMetadataKeys(): Array<string>;
    /**
     * Sets wrapper metadata in memory
     * @param wrapperSKU
     * @param wrapperVersion
     */
    setWrapperMetadata(wrapperSKU: string, wrapperVersion: string): void;
    /**
     * Returns wrapper metadata from in-memory storage
     */
    getWrapperMetadata(): [string, string];
    /**
     *
     * @param entity
     */
    setAuthorityMetadata(key: string, entity: AuthorityMetadataEntity): void;
    /**
     * Gets the active account
     */
    getActiveAccount(): AccountInfo | null;
    /**
     * Sets the active account's localAccountId in cache
     * @param account
     */
    setActiveAccount(account: AccountInfo | null): void;
    /**
     * Gets a list of accounts that match all of the filters provided
     * @param account
     */
    getAccountInfoByFilter(accountFilter: Partial<Omit<AccountInfo, "idTokenClaims" | "name">>): AccountInfo[];
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey
     */
    getThrottlingCache(throttlingCacheKey: string): ThrottlingEntity | null;
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey
     * @param throttlingCache
     */
    setThrottlingCache(throttlingCacheKey: string, throttlingCache: ThrottlingEntity): void;
    /**
     * Gets cache item with given key.
     * Will retrieve from cookies if storeAuthStateInCookie is set to true.
     * @param key
     */
    getTemporaryCache(cacheKey: string, generateKey?: boolean): string | null;
    /**
     * Sets the cache item with the key and value given.
     * Stores in cookie if storeAuthStateInCookie is set to true.
     * This can cause cookie overflow if used incorrectly.
     * @param key
     * @param value
     */
    setTemporaryCache(cacheKey: string, value: string, generateKey?: boolean): void;
    /**
     * Removes the cache item with the given key.
     * Will also clear the cookie item if storeAuthStateInCookie is set to true.
     * @param key
     */
    removeItem(key: string): boolean;
    /**
     * Checks whether key is in cache.
     * @param key
     */
    containsKey(key: string): boolean;
    /**
     * Gets all keys in window.
     */
    getKeys(): string[];
    /**
     * Clears all cache entries created by MSAL.
     */
    clear(): Promise<void>;
    /**
     * Add value to cookies
     * @param cookieName
     * @param cookieValue
     * @param expires
     */
    setItemCookie(cookieName: string, cookieValue: string, expires?: number): void;
    /**
     * Get one item by key from cookies
     * @param cookieName
     */
    getItemCookie(cookieName: string): string;
    /**
     * Clear all msal-related cookies currently set in the browser. Should only be used to clear temporary cache items.
     */
    clearMsalCookies(): void;
    /**
     * Clear an item in the cookies by key
     * @param cookieName
     */
    clearItemCookie(cookieName: string): void;
    /**
     * Get cookie expiration time
     * @param cookieLifeDays
     */
    getCookieExpirationTime(cookieLifeDays: number): string;
    /**
     * Gets the cache object referenced by the browser
     */
    getCache(): object;
    /**
     * interface compat, we cannot overwrite browser cache; Functionality is supported by individual entities in browser
     */
    setCache(): void;
    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    generateCacheKey(key: string): string;
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    generateAuthorityKey(stateString: string): string;
    /**
     * Create Nonce key to cache nonce
     * @param state
     */
    generateNonceKey(stateString: string): string;
    /**
     * Creates full cache key for the request state
     * @param stateString State string for the request
     */
    generateStateKey(stateString: string): string;
    /**
     * Gets the cached authority based on the cached state. Returns empty if no cached state found.
     */
    getCachedAuthority(cachedState: string): string | null;
    /**
     * Updates account, authority, and state in cache
     * @param serverAuthenticationRequest
     * @param account
     */
    updateCacheEntries(state: string, nonce: string, authorityInstance: string, loginHint: string, account: AccountInfo | null): void;
    /**
     * Reset all temporary cache items
     * @param state
     */
    resetRequestCache(state: string): void;
    /**
     * Removes temporary cache for the provided state
     * @param stateString
     */
    cleanRequestByState(stateString: string): void;
    /**
     * Looks in temporary cache for any state values with the provided interactionType and removes all temporary cache items for that state
     * Used in scenarios where temp cache needs to be cleaned but state is not known, such as clicking browser back button.
     * @param interactionType
     */
    cleanRequestByInteractionType(interactionType: InteractionType): void;
    cacheCodeRequest(authCodeRequest: CommonAuthorizationCodeRequest, browserCrypto: ICrypto): void;
    /**
     * Gets the token exchange parameters from the cache. Throws an error if nothing is found.
     */
    getCachedRequest(state: string, browserCrypto: ICrypto): CommonAuthorizationCodeRequest;
    isInteractionInProgress(matchClientId?: boolean): boolean;
    getInteractionInProgress(): string | null;
    setInteractionInProgress(inProgress: boolean): void;
    /**
     * Returns username retrieved from ADAL or MSAL v1 idToken
     */
    getLegacyLoginHint(): string | null;
    /**
     * Updates a credential's cache key if the current cache key is outdated
     */
    updateCredentialCacheKey(currentCacheKey: string, credential: ValidCredentialType): string;
}
export declare const DEFAULT_BROWSER_CACHE_MANAGER: (clientId: string, logger: Logger) => BrowserCacheManager;
//# sourceMappingURL=BrowserCacheManager.d.ts.map