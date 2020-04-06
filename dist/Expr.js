"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binary = /** @class */ (function () {
    function Binary(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    Binary.prototype.accept = function (visitor) {
        return visitor.visitBinaryExpr(this);
    };
    return Binary;
}());
exports.Binary = Binary;
var Unary = /** @class */ (function () {
    function Unary(operator, right) {
        this.operator = operator;
        this.right = right;
    }
    Unary.prototype.accept = function (visitor) {
        return visitor.visitUnaryExpr(this);
    };
    return Unary;
}());
exports.Unary = Unary;
var Grouping = /** @class */ (function () {
    function Grouping(expr) {
        this.expr = expr;
    }
    Grouping.prototype.accept = function (visitor) {
        return visitor.visitGroupingExpr(this);
    };
    return Grouping;
}());
exports.Grouping = Grouping;
var Literal = /** @class */ (function () {
    function Literal(value) {
        this.value = value;
    }
    Literal.prototype.accept = function (visitor) {
        return visitor.visitLiteralExpr(this);
    };
    return Literal;
}());
exports.Literal = Literal;
exports.Expression = __importStar(require("./Expr"));
//# sourceMappingURL=Expr.js.map