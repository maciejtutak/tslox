import { Literal, Token } from "./Token";

import { Result } from "./Result";
import TokenType from "./TokenType";

// export class ScannerError extends Error {
//     line: number;
//     message: string;

//     constructor(line: number, message: string) {
//         super('ScannerError');
//         this.line = line;
//         this.message = message;
//     }
// }

export class ScannerError extends Error {
    line: number;

    constructor(line: number, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ScannerError)
          }

          this.name = 'ScannerError'

          
        this.line = line;
    }
}

export class Scanner {
    private readonly source: string;
    private tokens: Token[] = [];
    private errors: ScannerError[] = [];

    private start: number = 0;
    private current: number = 0;
    private line: number = 1;

    private readonly keywords: Record<string, TokenType> = {
        and: TokenType.AND,
        class: TokenType.CLASS,
        else: TokenType.ELSE,
        false: TokenType.FALSE,
        for: TokenType.FOR,
        fun: TokenType.FUN,
        if: TokenType.IF,
        nil: TokenType.NIL,
        or: TokenType.OR,
        print: TokenType.PRINT,
        return: TokenType.RETURN,
        super: TokenType.SUPER,
        this: TokenType.THIS,
        true: TokenType.TRUE,
        var: TokenType.VAR,
        while: TokenType.WHILE
    };

    constructor(source: string) {
        this.source = source;
    }

    static scan(source: string): Result<Token[], ScannerError[]> {
        const scanner: Scanner = new Scanner(source);

        return scanner.scanTokens();
    }

    private scanTokens(): Result<Token[], ScannerError[]> {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token(TokenType.EOF, "", this.line, null))
        
        this.errors.forEach(e => console.log(e instanceof ScannerError))

        if (this.errors.length === 0) {
            return Result.Ok(this.tokens);
        }
        return Result.Fail(this.errors);
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }

    private scanToken(): void {
        const c: string = this.advance();
        switch (c) {
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;

            case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;
            case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;
            case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;
            case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;

            case '/':
                if (this.match('/')) {
                    // A comment that goes until the end of the line
                    while (this.peek() != '\n' && !this.isAtEnd()) { this.advance() }
                } else if (this.match('*')) {
                    // a multi line comment
                    // console.log('currently watching', this.peek(), this.peekNext());
                    while ((this.peek() != '*' && this.peekNext() != '/') || (this.peek() != '*' && this.peekNext() === '/') || (this.peek() === '*' && this.peekNext() != '/')) {
                        // console.log('in loop', this.peek(), this.peekNext());
                        if (this.isAtEnd()) {
                            this.errors.push(new ScannerError(this.line, 'Multi-line comment termination "*/" expected.'));
                            break;
                        }
                        this.advance();
                    }
                    // consume */
                    if (!this.isAtEnd()) {
                        this.advance();
                        this.advance();
                    }
                }
                else { this.addToken(TokenType.SLASH) }
                break;

            // Ignore whitespace
            case ' ':
            case '\r':
            case '\t':
                break;

            case '\n': this.line++; break;

            case '"': this.scanString(); break;

            default:
                if (this.isDigit(c)) { this.scanNumber(); }
                else if (this.isAlpha(c)) { this.identifier(); }
                // else { this.errors.push(new ScannerError(this.line, 'Unexpected character.')); }
                else { this.errors.push(new ScannerError(this.line, 'Unexpected character.')); }

                break;
        }
    }

    private advance(): string {
        this.current++;
        return this.source.charAt(this.current - 1);
    }

    private addToken(type: TokenType, literal: Literal = null) {
        const text: string = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, this.line, literal));
    }

    private match(expected: string): boolean {
        if (this.isAtEnd()) { return false; }
        if (this.source.charAt(this.current) != expected) { return false; }

        this.current++;
        return true;
    }

    private peek(): string | undefined {
        if (this.isAtEnd()) { return undefined; }
        return this.source.charAt(this.current);
    }


    private scanString(): void {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') { this.line++; }
            this.advance();
        }

        // Unterminated string
        if (this.isAtEnd()) {
            // this.errors.push(new ScannerError(this.line, 'Unexpected string.'));
            this.errors.push(new ScannerError(this.line, 'Unexpected string.'));
            return;
        }

        // Closing "
        this.advance();

        const value: string = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    private isDigit(c?: string): boolean {
        if (c === undefined) { return false; }
        return (c >= '0' && c <= '9');
    }

    private scanNumber(): void {
        while (this.isDigit(this.peek())) { this.advance() }

        if (this.peek() === "." && this.isDigit(this.peekNext())) {
            this.advance();

            while (this.isDigit(this.peek())) { this.advance() }
        }

        this.addToken(TokenType.NUMBER, Number.parseFloat(this.source.substring(this.start, this.current)))
    }

    private peekNext(): string | undefined {
        if (this.current + 1 >= this.source.length) { return undefined; }

        return this.source.charAt(this.current + 1)
    }

    private identifier(): void {
        while (this.isAlphaNumeric(this.peek())) { this.advance() }

        const identifier: string = this.source.substring(this.start, this.current);
        
        let type: TokenType = this.keywords[identifier];
        if (type === undefined) { type = TokenType.IDENTIFIER }

        this.addToken(type);
    }

    private isAlpha(c: string): boolean {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    }

    private isAlphaNumeric(c?: string): boolean {
        if (c === undefined) { return false; }
        return this.isAlpha(c) || this.isDigit(c);
    }

}