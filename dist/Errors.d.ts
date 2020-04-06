import { Token } from "./Token";
export declare class RuntimeError extends Error {
    operand: Token;
    constructor(operand: Token, ...params: any[]);
}
export declare class ParserError extends Error {
    token: Token;
    constructor(token: Token, ...params: any[]);
}
