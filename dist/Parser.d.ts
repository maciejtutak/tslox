import * as Expr from "./Expr";
import { ParserError } from "./Errors";
import { Result } from "./Result";
import { Token } from "./Token";
export declare class Parser {
    private tokens;
    private current;
    private errors;
    constructor(tokens: Token[]);
    static parse(tokens: Token[]): Result<Expr.Expr, ParserError[]>;
    private parse;
    private expression;
    private equality;
    private comparison;
    private addition;
    private multiplication;
    private unary;
    private primary;
    private match;
    private consume;
    private check;
    private advance;
    private isAtEnd;
    private peek;
    private previous;
}
