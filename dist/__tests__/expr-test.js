"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Expr = __importStar(require("../Expr"));
var AstPrinter_1 = require("../AstPrinter");
var Token_1 = require("../Token");
var TokenType_1 = __importDefault(require("../TokenType"));
it('check simple multiplication expression', function () {
    var expression = new Expr.Binary(new Expr.Literal(1), new Token_1.Token(TokenType_1.default.STAR, "*", 1, null), new Expr.Literal(2));
    expect(AstPrinter_1.AstPrinter.print(expression)).toBe('(* 1 2)');
});
it('check binary expression', function () {
    var expression = new Expr.Binary(new Expr.Unary(new Token_1.Token(TokenType_1.default.MINUS, "-", 1, null), new Expr.Literal(123)), new Token_1.Token(TokenType_1.default.STAR, "*", 1, null), new Expr.Grouping(new Expr.Literal(45.67)));
    expect(AstPrinter_1.AstPrinter.print(expression)).toBe('(* (- 123) (group 45.67))');
});
// it('check multi-line comment', () => {
//     const expression: Expr.Expr = new Expr.
// })
//# sourceMappingURL=expr-test.js.map