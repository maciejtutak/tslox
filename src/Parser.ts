import * as Expr from "./Expr";

import { Result } from "./Result";
import { Token } from "./Token";
import TokenType from "./TokenType";

export class ParserError extends Error {
    token: Token;

    constructor(token: Token, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParserError)
          }

          this.name = 'ParserError'

          
        this.token = token;
    }
}

export class Parser {
    private tokens: Token[] = []
    private current: number = 0;
    private errors: ParserError[] = [];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    static parse(tokens: Token[]): Result<Expr.Expr, ParserError[]> {
        const parser: Parser = new Parser(tokens);
        
        return parser.parse();
    }

    private parse(): Result<Expr.Expr, ParserError[]> {
        // try {
            const expr = this.expression();

            if (this.errors.length === 0) { return Result.Ok(expr) }
            return Result.Fail(this.errors);
            // return Result.Ok(this.expression());
        // } catch (e) {
        //     console.error('ERROR')
        //     return Result.Fail(this.errors);
        // }
    }
    
    private expression(): Expr.Expr {
        // console.log('expression')
        return this.equality();
    }
    
    private equality(): Expr.Expr {
        // console.log('equality')
        let expr: Expr.Expr = this.comparison();

        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator: Token = this.previous();
            const right: Expr.Expr = this.comparison();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private comparison(): Expr.Expr {
        // console.log('comparison')
        let expr: Expr.Expr = this.addition();

        while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator: Token = this.previous();
            const right: Expr.Expr = this.addition();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private addition(): Expr.Expr {
        // console.log('addition')
        let expr: Expr.Expr = this.multiplication();

        while (this.match(TokenType.PLUS, TokenType.MINUS)) {
            const operator: Token = this.previous();
            const right: Expr.Expr = this.multiplication();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private multiplication(): Expr.Expr {
        // console.log('multiplication')
        let expr: Expr.Expr = this.unary();

        while (this.match(TokenType.STAR, TokenType.SLASH)) {
            const operator: Token = this.previous();
            const right: Expr.Expr = this.unary();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private unary(): Expr.Expr {
        // console.log('unary')
        if (this.match(TokenType.MINUS, TokenType.BANG)) {
            const operator: Token = this.previous();
            const right: Expr.Expr = this.unary();
            return new Expr.Unary(operator, right);
        } 

        return this.primary();
    }

    private primary(): Expr.Expr | never {
        // console.log('primary')
        if (this.match(TokenType.FALSE)) { return new Expr.Literal(false); }
        if (this.match(TokenType.TRUE)) { return new Expr.Literal(true); }
        if (this.match(TokenType.NIL)) { return new Expr.Literal(undefined); }

        if (this.match(TokenType.NUMBER, TokenType.STRING)) {
            return new Expr.Literal(this.previous().literal);
        }

        if (this.match(TokenType.LEFT_PAREN)) {
            let expr: Expr.Expr = this.expression();
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new Expr.Grouping(expr);
        }

        //TODO: for now
        throw new ParserError(this.peek(), "Expect expression.");
        // throw Error;
    }

    /* utilities functios */

    private match(...types: TokenType[]): boolean {
        for (let type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
    
        return false;
    }

    private consume(type: TokenType, message: string): Token | void {
        if (this.check(type)) { return this.advance() }

        this.errors.push(new ParserError(this.peek(), message));
    }

    private check(type: TokenType): boolean {
        if (this.isAtEnd()) { return false; }
        return this.peek().type == type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) { this.current++; }
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.current === this.tokens.length;
    }

    private peek(): Token {
        return this.tokens[this.current];
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }

    // private synchronize(): void {
    //     this.advance();

    //     while (!this.isAtEnd()) {
    //         if (this.previous().type === TokenType.SEMICOLON) { return; }

    //         switch (this.peek().type) {
    //             case TokenType.CLASS:
    //             case TokenType.FUN:
    //             case TokenType.VAR:
    //             case TokenType.FOR:
    //             case TokenType.IF:
    //             case TokenType.WHILE:
    //             case TokenType.PRINT:
    //             case TokenType.RETURN:
    //                 return;
    //         }

    //         this.advance();
    //     }
    // }
}
//     private error(token: Token, message: string): ParserError {

//         return new ParserError();
//     }
// } 