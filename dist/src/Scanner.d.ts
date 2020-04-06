import { Token } from "./Token";
import { Result } from "./Result";
export interface ScannerError {
    line: number;
    message: string;
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
    scanTokens(): Result<Token[], ScannerError[]>;
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
