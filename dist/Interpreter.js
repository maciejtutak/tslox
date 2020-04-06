"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lox_1 = __importDefault(require("./Lox"));
var Errors_1 = require("./Errors");
var TokenType_1 = __importDefault(require("./TokenType"));
var Interpreter = /** @class */ (function () {
    function Interpreter() {
    }
    Interpreter.prototype.interpret = function (expr) {
        try {
            var value = this.evaluate(expr);
            console.log(value);
        }
        catch (e) {
            Lox_1.default.runtimeError(e);
        }
    };
    Interpreter.prototype.visitLiteralExpr = function (expr) {
        return expr.value;
    };
    Interpreter.prototype.visitGroupingExpr = function (expr) {
        return this.evaluate(expr.expr);
    };
    Interpreter.prototype.visitUnaryExpr = function (expr) {
        var right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType_1.default.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -right;
            case TokenType_1.default.BANG:
                return !this.isTruthy(right);
        }
        return null;
    };
    Interpreter.prototype.visitBinaryExpr = function (expr) {
        var left = this.evaluate(expr.left);
        var right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType_1.default.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return left - right;
            case TokenType_1.default.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                if (right === 0) {
                    throw new Errors_1.RuntimeError(expr.operator, "Division by 0 is not allowed.");
                }
                return left / right;
            case TokenType_1.default.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return left * right;
            case TokenType_1.default.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return left + right;
                }
                throw new Errors_1.RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
            case TokenType_1.default.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return left > right;
            case TokenType_1.default.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left >= right;
            case TokenType_1.default.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return left < right;
            case TokenType_1.default.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left <= right;
            case TokenType_1.default.BANG_EQUAL:
                return !this.isEqual(left, right);
            case TokenType_1.default.EQUAL_EQUAL:
                return this.isEqual(left, right);
        }
        // temp
        throw new Errors_1.RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
    };
    Interpreter.prototype.isTruthy = function (value) {
        if (value === "nil") {
            return false;
        }
        if (typeof value === 'boolean') {
            return value === true;
        }
        return true;
    };
    Interpreter.prototype.isEqual = function (a, b) {
        if (a === null && b === null) {
            return true;
        }
        if (a === null) {
            return false;
        }
        return a === b;
    };
    Interpreter.prototype.evaluate = function (expr) {
        return expr.accept(this);
    };
    Interpreter.prototype.checkNumberOperand = function (operator, operand) {
        if (typeof operand === 'number') {
            return;
        }
        throw new Errors_1.RuntimeError(operator, "Operand must be a number.");
    };
    Interpreter.prototype.checkNumberOperands = function (operator, left, right) {
        if (typeof left === 'number' && typeof right === 'number') {
            return;
        }
        throw new Errors_1.RuntimeError(operator, "Operands must be numbers.");
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=Interpreter.js.map