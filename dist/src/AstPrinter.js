"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AstPrinter = /** @class */ (function () {
    function AstPrinter() {
    }
    AstPrinter.prototype.parenthesize = function (name) {
        var exprs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            exprs[_i - 1] = arguments[_i];
        }
        var result = "(" + name;
        for (var _a = 0, exprs_1 = exprs; _a < exprs_1.length; _a++) {
            var expr = exprs_1[_a];
            result += " ";
            result += expr.accept(this);
            console.log('parethnesize', expr);
            console.log('parenthesize accept', expr.accept(this));
        }
        result += ")";
        return result;
    };
    AstPrinter.prototype.print = function (expr) {
        return expr.accept(this);
    };
    AstPrinter.prototype.visitBinaryExpr = function (expr) {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    };
    AstPrinter.prototype.visitUnaryExpr = function (expr) {
        return this.parenthesize(expr.left.lexeme, expr.right);
    };
    AstPrinter.prototype.visitGroupingExpr = function (expr) {
        return this.parenthesize("group", expr.expr);
    };
    AstPrinter.prototype.visitLiteralExpr = function (expr) {
        if (expr.value === undefined)
            return "nil";
        return expr.value.toString();
    };
    return AstPrinter;
}());
exports.AstPrinter = AstPrinter;
//# sourceMappingURL=AstPrinter.js.map