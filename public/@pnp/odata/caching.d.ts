import { IODataParser } from "./parsers.js";
import { IPnPClientStore } from "@pnp/common";
export interface ICachingOptions {
    expiration?: Date;
    storeName?: "session" | "local";
    key: string;
}
export declare class CachingOptions implements ICachingOptions {
    key: string;
    storeName?: "session" | "local";
    expiration?: Date;
    constructor(key: string, storeName?: "session" | "local", expiration?: Date);
    get store(): IPnPClientStore;
}
export declare class CachingParserWrapper<T> implements IODataParser<T> {
    parser: IODataParser<T>;
    cacheOptions: CachingOptions;
    constructor(parser: IODataParser<T>, cacheOptions: CachingOptions);
    parse(response: Response): Promise<T>;
    protected cacheData(data: any): any;
}
//# sourceMappingURL=caching.d.ts.map