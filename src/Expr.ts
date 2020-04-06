import { Literal as TLiteral, Token } from "./Token";

import { ExprVisitor } from "./AstPrinter";

export interface Expr {
    // accept(visitor: ExprVisitor<R>): R;
    // this is much cleaner with:
    accept<R>(visitor: ExprVisitor<R>): R;
}

export class Binary implements Expr {
    left: Expr;
    operator: Token;
    right: Expr;

    constructor(left: Expr, operator: Token, right: Expr) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitBinaryExpr(this);
    }
}

export class Unary implements Expr {
    operator: Token;
    right: Expr;

    constructor(operator: Token, right: Expr) {
        this.operator = operator;
        this.right = right;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitUnaryExpr(this);
    }
}

export class Grouping implements Expr {
    expr: Expr;

    constructor(expr: Expr) {
        this.expr = expr;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitGroupingExpr(this);
    }
}

export class Literal implements Expr {
    value: TLiteral;

    constructor(value: TLiteral) {
        this.value = value;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitLiteralExpr(this);
    }   
}

export * as Expression from "./Expr";
