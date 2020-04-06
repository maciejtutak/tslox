"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = require("./Token");
var Result_1 = require("./Result");
var TokenType_1 = __importDefault(require("./TokenType"));
var Scanner = /** @class */ (function () {
    function Scanner(source) {
        this.tokens = [];
        this.errors = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;
        this.keywords = {
            and: TokenType_1.default.AND,
            class: TokenType_1.default.CLASS,
            else: TokenType_1.default.ELSE,
            false: TokenType_1.default.FALSE,
            for: TokenType_1.default.FOR,
            fun: TokenType_1.default.FUN,
            if: TokenType_1.default.IF,
            nil: TokenType_1.default.NIL,
            or: TokenType_1.default.OR,
            print: TokenType_1.default.PRINT,
            return: TokenType_1.default.RETURN,
            super: TokenType_1.default.SUPER,
            this: TokenType_1.default.THIS,
            true: TokenType_1.default.TRUE,
            var: TokenType_1.default.VAR,
            while: TokenType_1.default.WHILE
        };
        this.source = source;
    }
    Scanner.prototype.scanTokens = function () {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token_1.Token(TokenType_1.default.EOF, "", this.line));
        if (this.errors.length === 0) {
            return Result_1.Result.Ok(this.tokens);
        }
        return Result_1.Result.Fail(this.errors);
    };
    Scanner.prototype.isAtEnd = function () {
        return this.current >= this.source.length;
    };
    Scanner.prototype.scanToken = function () {
        var c = this.advance();
        switch (c) {
            case '(':
                this.addToken(TokenType_1.default.LEFT_PAREN);
                break;
            case ')':
                this.addToken(TokenType_1.default.RIGHT_PAREN);
                break;
            case '{':
                this.addToken(TokenType_1.default.LEFT_BRACE);
                break;
            case '}':
                this.addToken(TokenType_1.default.RIGHT_BRACE);
                break;
            case ',':
                this.addToken(TokenType_1.default.COMMA);
                break;
            case '.':
                this.addToken(TokenType_1.default.DOT);
                break;
            case '-':
                this.addToken(TokenType_1.default.MINUS);
                break;
            case '+':
                this.addToken(TokenType_1.default.PLUS);
                break;
            case ';':
                this.addToken(TokenType_1.default.SEMICOLON);
                break;
            case '*':
                this.addToken(TokenType_1.default.STAR);
                break;
            case '!':
                this.addToken(this.match('=') ? TokenType_1.default.BANG_EQUAL : TokenType_1.default.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType_1.default.EQUAL_EQUAL : TokenType_1.default.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? TokenType_1.default.LESS_EQUAL : TokenType_1.default.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType_1.default.GREATER_EQUAL : TokenType_1.default.GREATER);
                break;
            /* /* ksad
            sadsd */
            case '/':
                if (this.match('/')) {
                    // A comment that goes until the end of the line
                    while (this.peek() != '\n' && !this.isAtEnd()) {
                        this.advance();
                    }
                }
                else if (this.match('*')) {
                    // a multi line comment
                    while ((this.peek() != '*' && this.peekNext() != '/') || (this.peek() != '*' && this.peekNext() === '/') || (this.peek() === '*' && this.peekNext() != '/')) {
                        this.advance();
                    }
                    // consume */
                    if (!this.isAtEnd()) {
                        this.advance();
                        this.advance();
                    }
                }
                else {
                    this.addToken(TokenType_1.default.SLASH);
                }
                break;
            // Ignore whitespace
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++;
                break;
            case '"':
                this.scanString();
                break;
            default:
                if (this.isDigit(c)) {
                    this.scanNumber();
                }
                else if (this.isAlpha(c)) {
                    this.identifier();
                }
                // else { this.errors.push(new ScannerError(this.line, 'Unexpected character.')); }
                else {
                    this.errors.push({ line: this.line, message: 'Unexpected character.' });
                }
                break;
        }
    };
    Scanner.prototype.advance = function () {
        this.current++;
        return this.source.charAt(this.current - 1);
    };
    Scanner.prototype.addToken = function (type, literal) {
        var text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token_1.Token(type, text, this.line, literal));
    };
    Scanner.prototype.match = function (expected) {
        if (this.isAtEnd()) {
            return false;
        }
        if (this.source.charAt(this.current) != expected) {
            return false;
        }
        this.current++;
        return true;
    };
    Scanner.prototype.peek = function () {
        if (this.isAtEnd()) {
            return undefined;
        }
        return this.source.charAt(this.current);
    };
    Scanner.prototype.scanString = function () {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') {
                this.line++;
            }
            this.advance();
        }
        // Unterminated string
        if (this.isAtEnd()) {
            // this.errors.push(new ScannerError(this.line, 'Unexpected string.'));
            this.errors.push(({ line: this.line, message: 'Unexpected string.' }));
            return;
        }
        // Closing "
        this.advance();
        var value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType_1.default.STRING, value);
    };
    Scanner.prototype.isDigit = function (c) {
        if (c === undefined) {
            return false;
        }
        return (c >= '0' && c <= '9');
    };
    Scanner.prototype.scanNumber = function () {
        while (this.isDigit(this.peek())) {
            this.advance();
        }
        if (this.peek() === "." && this.isDigit(this.peekNext())) {
            this.advance();
            while (this.isDigit(this.peek())) {
                this.advance();
            }
        }
        this.addToken(TokenType_1.default.NUMBER, Number.parseFloat(this.source.substring(this.start, this.current)));
    };
    Scanner.prototype.peekNext = function () {
        if (this.current + 1 >= this.source.length) {
            return undefined;
        }
        return this.source.charAt(this.current + 1);
    };
    Scanner.prototype.identifier = function () {
        while (this.isAlphaNumeric(this.peek())) {
            this.advance();
        }
        var identifier = this.source.substring(this.start, this.current);
        var type = this.keywords[identifier];
        if (type === undefined) {
            type = TokenType_1.default.IDENTIFIER;
        }
        this.addToken(type);
    };
    Scanner.prototype.isAlpha = function (c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    };
    Scanner.prototype.isAlphaNumeric = function (c) {
        if (c === undefined) {
            return false;
        }
        return this.isAlpha(c) || this.isDigit(c);
    };
    return Scanner;
}());
exports.Scanner = Scanner;
//# sourceMappingURL=Scanner.js.map