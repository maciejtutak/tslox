import * as Expr from "./Expr";
export interface ExprVisitor<R> {
    visitBinaryExpr(expr: Expr.Binary): R;
    visitUnaryExpr(expr: Expr.Unary): R;
    visitGroupingExpr(expr: Expr.Grouping): R;
    visitLiteralExpr(expr: Expr.Literal): R;
}
export declare class AstPrinter implements ExprVisitor<string> {
    private parenthesize;
    print(expr: Expr.Expr): string;
    visitBinaryExpr(expr: Expr.Binary): string;
    visitUnaryExpr(expr: Expr.Unary): string;
    visitGroupingExpr(expr: Expr.Grouping): string;
    visitLiteralExpr(expr: Expr.Literal): string;
}
