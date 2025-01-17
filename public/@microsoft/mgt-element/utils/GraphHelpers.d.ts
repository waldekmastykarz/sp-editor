/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationHandlerOptions, Middleware } from '@microsoft/microsoft-graph-client';
/**
 * creates an AuthenticationHandlerOptions from scopes array that
 * can be used in the Graph sdk middleware chain
 *
 * @export
 * @param {...string[]} scopes
 * @returns
 */
export declare function prepScopes(...scopes: string[]): AuthenticationHandlerOptions[];
/**
 * Helper method to chain Middleware when instantiating new Client
 *
 * @param {...Middleware[]} middleware
 * @returns {Middleware}
 */
export declare function chainMiddleware(...middleware: Middleware[]): Middleware;
//# sourceMappingURL=GraphHelpers.d.ts.map