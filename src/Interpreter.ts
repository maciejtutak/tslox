import * as Expr from "./Expr";

import { Literal, Token } from "./Token";

import { ExprVisitor } from "./AstPrinter";
import Lox from "./Lox";
import { RuntimeError } from "./Errors";
import TokenType from "./TokenType";

type LoxObject = Literal

export class Interpreter implements ExprVisitor<LoxObject> {

    interpret(expr: Expr.Expr) {
        try {
            const value: LoxObject = this.evaluate(expr);
            console.log(value);
        } catch (e) {
            Lox.runtimeError(e);
        }
    }

    visitLiteralExpr(expr: Expr.Literal): LoxObject {
        return expr.value;
    }

    visitGroupingExpr(expr: Expr.Grouping): LoxObject {
        return this.evaluate(expr.expr);
    }

    visitUnaryExpr(expr: Expr.Unary): LoxObject {
        const right: LoxObject = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -(right as number);
            case TokenType.BANG:
                return !this.isTruthy(right);
        }

        return null;
    }

    visitBinaryExpr(expr: Expr.Binary): LoxObject {
        const left: LoxObject = this.evaluate(expr.left);
        const right: LoxObject = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right)
                return (left as number) - (right as number);
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right)
                if ((right as number) === 0) { throw new RuntimeError(expr.operator, "Division by 0 is not allowed.") }
                return (left as number) / (right as number);
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right)
                return (left as number) * (right as number);
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return (left as number) + (right as number);
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return (left as string) + (right as string);
                }
                throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
            
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) > (right as number);
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) >= (right as number);
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) < (right as number);
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) <= (right as number);

            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
            }
        
            // temp
        throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
    }

    private isTruthy(value: LoxObject): boolean {
        if (value === "nil") { return false }
        if (typeof value === 'boolean') { return value === true }
        return true;
    }

    private isEqual(a: LoxObject, b: LoxObject): boolean {
        if (a === null && b === null) { return true }
        if (a === null) { return false }
        return a === b;
    }

    private evaluate(expr: Expr.Expr): LoxObject {
        return expr.accept(this);
    }
    
    private checkNumberOperand(operator: Token, operand: LoxObject): void {
        if (typeof operand === 'number') { return }
        throw new RuntimeError(operator, "Operand must be a number.")
    }

    private checkNumberOperands(operator: Token, left: LoxObject, right: LoxObject) {
        if (typeof left === 'number' && typeof right === 'number') { return; }
        throw new RuntimeError(operator, "Operands must be numbers.")
    }
}