import * as Expr from "./Expr";
import { Literal } from "./Token";
import { ExprVisitor } from "./AstPrinter";
declare type LoxObject = Literal;
export declare class Interpreter implements ExprVisitor<LoxObject> {
    interpret(expr: Expr.Expr): void;
    visitLiteralExpr(expr: Expr.Literal): LoxObject;
    visitGroupingExpr(expr: Expr.Grouping): LoxObject;
    visitUnaryExpr(expr: Expr.Unary): LoxObject;
    visitBinaryExpr(expr: Expr.Binary): LoxObject;
    private isTruthy;
    private isEqual;
    private evaluate;
    private checkNumberOperand;
    private checkNumberOperands;
}
export {};
