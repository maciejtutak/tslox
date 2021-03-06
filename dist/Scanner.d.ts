import { Token } from "./Token";
import { Result } from "./Result";
export declare class ScannerError extends Error {
    line: number;
    constructor(line: number, ...params: any[]);
}
export declare class Scanner {
    private readonly source;
    private tokens;
    private errors;
    private start;
    private current;
    private line;
    private readonly keywords;
    constructor(source: string);
    static scan(source: string): Result<Token[], ScannerError[]>;
    private scanTokens;
    private isAtEnd;
    private scanToken;
    private advance;
    private addToken;
    private match;
    private peek;
    private scanString;
    private isDigit;
    private scanNumber;
    private peekNext;
    private identifier;
    private isAlpha;
    private isAlphaNumeric;
}
