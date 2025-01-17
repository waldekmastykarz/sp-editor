/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * @module GraphError
 */
/**
 * @class
 * Class for GraphError
 * @NOTE: This is NOT what is returned from the Graph
 * GraphError is created from parsing JSON errors returned from the graph
 * Some fields are renamed ie, "request-id" => requestId so you can use dot notation
 */
export declare class GraphError extends Error {
    /**
     * @public
     * A member holding status code of the error
     */
    statusCode: number;
    /**
     * @public
     * A member holding code i.e name of the error
     */
    code: string | null;
    /**
     * @public
     * A member holding request-id i.e identifier of the request
     */
    requestId: string | null;
    /**
     * @public
     * A member holding processed date and time of the request
     */
    date: Date;
    /**
     * @public
     * A member holding original error response by the graph service
     */
    body: any;
    /**
     * @public
     * @constructor
     * Creates an instance of GraphError
     * @param {number} [statusCode = -1] - The status code of the error
     * @param {string} [message] - The message of the error
     * @param {Error} [baseError] - The base error
     * @returns An instance of GraphError
     */
    constructor(statusCode?: number, message?: string, baseError?: Error);
}
