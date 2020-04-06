import { Literal as TLiteral, Token } from "./Token";
import { ExprVisitor } from "./AstPrinter";
export interface Expr {
    accept<R>(visitor: ExprVisitor<R>): R;
}
export declare class Binary implements Expr {
    left: Expr;
    operator: Token;
    right: Expr;
    constructor(left: Expr, operator: Token, right: Expr);
    accept<R>(visitor: ExprVisitor<R>): R;
}
export declare class Unary implements Expr {
    left: Token;
    right: Expr;
    constructor(left: Token, right: Expr);
    accept<R>(visitor: ExprVisitor<R>): R;
}
export declare class Grouping implements Expr {
    expr: Expr;
    constructor(expr: Expr);
    accept<R>(visitor: ExprVisitor<R>): R;
}
export declare class Literal implements Expr {
    value: TLiteral;
    constructor(value: TLiteral);
    accept<R>(visitor: ExprVisitor<R>): R;
}
export * as Expression from "./Expr";
