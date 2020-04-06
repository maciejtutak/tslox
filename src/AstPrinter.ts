import * as Expr from "./Expr";

export interface ExprVisitor<R> {
    visitBinaryExpr(expr: Expr.Binary): R;
    visitUnaryExpr(expr: Expr.Unary): R;
    visitGroupingExpr(expr: Expr.Grouping): R;
    visitLiteralExpr(expr: Expr.Literal): R;
}

export class AstPrinter implements ExprVisitor<string> {
    public static print(expr: Expr.Expr): string {
        const astPrinter = new AstPrinter();

        return astPrinter.print(expr);
    }

    private print(expr: Expr.Expr): string {
        return expr.accept(this);
    }

    private parenthesize(name: string, ...exprs: Expr.Expr[]) {
        let result = `(${name}`;
        for (let expr of exprs) {
            result += " ";
            result += expr.accept(this);
        }
        result += ")";

        return result;
    }

    /* visits */
    public visitBinaryExpr(expr: Expr.Binary): string {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }

    public visitUnaryExpr(expr: Expr.Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right)
    }
    
    public visitGroupingExpr(expr: Expr.Grouping): string {
        return this.parenthesize("group", expr.expr);
    }

    public visitLiteralExpr(expr: Expr.Literal): string {
        if (expr.value === null) return "nil";
        return expr.value.toString();
    }
}
