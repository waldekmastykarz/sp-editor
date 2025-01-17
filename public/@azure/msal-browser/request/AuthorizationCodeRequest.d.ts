import { CommonAuthorizationCodeRequest } from "@azure/msal-common";
export declare type AuthorizationCodeRequest = Partial<Omit<CommonAuthorizationCodeRequest, "code" | "enableSpaAuthorizationCode" | "requestedClaimsHash">> & {
    code: string;
    cloudGraphHostName?: string;
    msGraphHost?: string;
    cloudInstanceHostName?: string;
};
//# sourceMappingURL=AuthorizationCodeRequest.d.ts.map