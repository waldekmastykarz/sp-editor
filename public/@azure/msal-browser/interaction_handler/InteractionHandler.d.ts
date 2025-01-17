import { AuthorizationCodePayload, CommonAuthorizationCodeRequest, AuthenticationResult, AuthorizationCodeClient, Authority, INetworkModule, CcsCredential, Logger } from "@azure/msal-common";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
export declare type InteractionParams = {};
/**
 * Abstract class which defines operations for a browser interaction handling class.
 */
export declare abstract class InteractionHandler {
    protected authModule: AuthorizationCodeClient;
    protected browserStorage: BrowserCacheManager;
    protected authCodeRequest: CommonAuthorizationCodeRequest;
    protected browserRequestLogger: Logger;
    constructor(authCodeModule: AuthorizationCodeClient, storageImpl: BrowserCacheManager, authCodeRequest: CommonAuthorizationCodeRequest, browserRequestLogger: Logger);
    /**
     * Function to enable user interaction.
     * @param requestUrl
     */
    abstract initiateAuthRequest(requestUrl: string, params: InteractionParams): Window | Promise<HTMLIFrameElement> | Promise<void>;
    /**
     * Function to handle response parameters from hash.
     * @param locationHash
     */
    handleCodeResponseFromHash(locationHash: string, state: string, authority: Authority, networkModule: INetworkModule): Promise<AuthenticationResult>;
    /**
     * Process auth code response from AAD
     * @param authCodeResponse
     * @param state
     * @param authority
     * @param networkModule
     * @returns
     */
    handleCodeResponseFromServer(authCodeResponse: AuthorizationCodePayload, state: string, authority: Authority, networkModule: INetworkModule, validateNonce?: boolean): Promise<AuthenticationResult>;
    /**
     * Updates authority based on cloudInstanceHostname
     * @param cloudInstanceHostname
     * @param authority
     * @param networkModule
     */
    protected updateTokenEndpointAuthority(cloudInstanceHostname: string, authority: Authority, networkModule: INetworkModule): Promise<void>;
    /**
     * Looks up ccs creds in the cache
     */
    protected checkCcsCredentials(): CcsCredential | null;
}
//# sourceMappingURL=InteractionHandler.d.ts.map