import { AccountInfo, INetworkModule, AuthenticationResult, Logger, CommonSilentFlowRequest, ICrypto } from "@azure/msal-common";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { BrowserConfiguration, Configuration } from "../config/Configuration";
import { InteractionType, WrapperSKU } from "../utils/BrowserConstants";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
import { EventCallbackFunction } from "../event/EventMessage";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { EndSessionPopupRequest } from "../request/EndSessionPopupRequest";
import { INavigationClient } from "../navigation/INavigationClient";
import { EventHandler } from "../event/EventHandler";
import { ITokenCache } from "../cache/ITokenCache";
import { AuthorizationCodeRequest } from "../request/AuthorizationCodeRequest";
export declare abstract class ClientApplication {
    protected readonly browserCrypto: ICrypto;
    protected readonly browserStorage: BrowserCacheManager;
    protected readonly networkClient: INetworkModule;
    protected navigationClient: INavigationClient;
    protected config: BrowserConfiguration;
    private tokenCache;
    protected logger: Logger;
    protected isBrowserEnvironment: boolean;
    protected eventHandler: EventHandler;
    private redirectResponse;
    private hybridAuthCodeResponses;
    /**
     * @constructor
     * Constructor for the PublicClientApplication used to instantiate the PublicClientApplication object
     *
     * Important attributes in the Configuration object for auth are:
     * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
     * - authority: the authority URL for your application.
     * - redirect_uri: the uri of your application registered in the portal.
     *
     * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
     * It is of the form https://login.microsoftonline.com/{Enter_the_Tenant_Info_Here}
     * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
     * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
     * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
     * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
     *
     * In Azure B2C, authority is of the form https://{instance}/tfp/{tenant}/{policyName}/
     * Full B2C functionality will be available in this library in future versions.
     *
     * @param configuration Object for the MSAL PublicClientApplication instance
     */
    constructor(configuration: Configuration);
    /**
     * Event handler function which allows users to fire events after the PublicClientApplication object
     * has loaded during redirect flows. This should be invoked on all page loads involved in redirect
     * auth flows.
     * @param hash Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.
     * @returns Token response or null. If the return value is null, then no auth redirect was detected.
     */
    handleRedirectPromise(hash?: string): Promise<AuthenticationResult | null>;
    /**
     * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
     * the page, so any code that follows this function will not execute.
     *
     * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
     * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
     *
     * @param request
     */
    acquireTokenRedirect(request: RedirectRequest): Promise<void>;
    /**
     * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
     *
     * @param request
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    acquireTokenPopup(request: PopupRequest): Promise<AuthenticationResult>;
    /**
     * This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
     * - Any browser using a form of Intelligent Tracking Prevention
     * - If there is not an established session with the service
     *
     * In these cases, the request must be done inside a popup or full frame redirect.
     *
     * For the cases where interaction is required, you cannot send a request with prompt=none.
     *
     * If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
     * you session on the server still exists.
     * @param request {@link SsoSilentRequest}
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    ssoSilent(request: SsoSilentRequest): Promise<AuthenticationResult>;
    /**
     * This function redeems an authorization code (passed as code) from the eSTS token endpoint.
     * This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
     * This API is not indended for normal authorization code acquisition and redemption.
     *
     * Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
     *
     * @param request {@link AuthorizationCodeRequest}
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    acquireTokenByCode(request: AuthorizationCodeRequest): Promise<AuthenticationResult>;
    /**
     * Creates a SilentAuthCodeClient to redeem an authorization code.
     * @param request
     * @returns Result of the operation to redeem the authorization code
     */
    private acquireTokenByCodeAsync;
    /**
     * Use this function to obtain a token before every call to the API / resource provider
     *
     * MSAL return's a cached token when available
     * Or it send's a request to the STS to obtain a new token using a refresh token.
     *
     * @param {@link SilentRequest}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    protected acquireTokenByRefreshToken(request: CommonSilentFlowRequest): Promise<AuthenticationResult>;
    /**
     * Deprecated logout function. Use logoutRedirect or logoutPopup instead
     * @param logoutRequest
     * @deprecated
     */
    logout(logoutRequest?: EndSessionRequest): Promise<void>;
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    logoutRedirect(logoutRequest?: EndSessionRequest): Promise<void>;
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logoutPopup(logoutRequest?: EndSessionPopupRequest): Promise<void>;
    /**
     * Returns all accounts that MSAL currently has data for.
     * (the account object is created at the time of successful login)
     * or empty array when no accounts are found
     * @returns Array of account objects in cache
     */
    getAllAccounts(): AccountInfo[];
    /**
     * Returns the signed in account matching username.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found.
     * This API is provided for convenience but getAccountById should be used for best reliability
     * @param userName
     * @returns The account object stored in MSAL
     */
    getAccountByUsername(userName: string): AccountInfo | null;
    /**
     * Returns the signed in account matching homeAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param homeAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByHomeId(homeAccountId: string): AccountInfo | null;
    /**
     * Returns the signed in account matching localAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param localAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByLocalId(localAccountId: string): AccountInfo | null;
    /**
     * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
     * @param account
     */
    setActiveAccount(account: AccountInfo | null): void;
    /**
     * Gets the currently active account
     */
    getActiveAccount(): AccountInfo | null;
    /**
     * Helper to validate app environment before making an auth request
     * * @param interactionType
     */
    protected preflightBrowserEnvironmentCheck(interactionType: InteractionType): void;
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback: EventCallbackFunction): string | null;
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId: string): void;
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents(): void;
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents(): void;
    /**
     * Gets the token cache for the application.
     */
    getTokenCache(): ITokenCache;
    /**
     * Returns the logger instance
     */
    getLogger(): Logger;
    /**
     * Replaces the default logger set in configurations with new Logger with new configurations
     * @param logger Logger instance
     */
    setLogger(logger: Logger): void;
    /**
     * Called by wrapper libraries (Angular & React) to set SKU and Version passed down to telemetry, logger, etc.
     * @param sku
     * @param version
     */
    initializeWrapperLibrary(sku: WrapperSKU, version: string): void;
    /**
     * Sets navigation client
     * @param navigationClient
     */
    setNavigationClient(navigationClient: INavigationClient): void;
    /**
     * Returns the configuration object
     */
    getConfiguration(): BrowserConfiguration;
}
//# sourceMappingURL=ClientApplication.d.ts.map