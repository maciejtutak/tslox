"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AstPrinter_1 = require("../AstPrinter");
var Parser_1 = require("../Parser");
var Token_1 = require("../Token");
var TokenType_1 = __importDefault(require("../TokenType"));
// import { Scanner } from "../Scanner";
function getValueOrThrow(result) {
    if (result.isOk()) {
        return result.value;
    }
    else {
        if (result.value instanceof Array) {
            for (var _i = 0, _a = result.value; _i < _a.length; _i++) {
                var v = _a[_i];
                throw v;
            }
        }
    }
    throw new Error();
}
it('check primary expression', function () {
    var tokens = [new Token_1.Token(TokenType_1.default.NUMBER, "", 1, "24")];
    var parse = getValueOrThrow(Parser_1.Parser.parse(tokens));
    expect(AstPrinter_1.AstPrinter.print(parse)).toBe('24');
});
it('check binary expression', function () {
    var tokens = [
        new Token_1.Token(TokenType_1.default.NUMBER, "", 1, "24"),
        new Token_1.Token(TokenType_1.default.PLUS, "+", 1, null),
        new Token_1.Token(TokenType_1.default.NUMBER, "", 1, "48")
    ];
    var parse = getValueOrThrow(Parser_1.Parser.parse(tokens));
    expect(AstPrinter_1.AstPrinter.print(parse)).toBe('(+ 24 48)');
});
it('check empty input', function () {
    var tokens = [
        new Token_1.Token(TokenType_1.default.SLASH, "/", 1, ""),
        new Token_1.Token(TokenType_1.default.SLASH, "/", 1, ""),
    ];
    expect(function () {
        getValueOrThrow(Parser_1.Parser.parse(tokens));
    }).toThrow();
});
it('check no matching )', function () {
    var tokens = [
        new Token_1.Token(TokenType_1.default.LEFT_PAREN, "(", 1, ""),
        new Token_1.Token(TokenType_1.default.LEFT_PAREN, "(", 1, ""),
        new Token_1.Token(TokenType_1.default.RIGHT_PAREN, ")", 1, ""),
    ];
    expect(function () {
        getValueOrThrow(Parser_1.Parser.parse(tokens));
    }).toThrow();
});
// it('check 2(', () => {
//     const tokens: Token[] = [ 
//         new Token(TokenType.NUMBER, "", 1, "2"),
//         new Token(TokenType.LEFT_PAREN, "(", 1, "")
//     ];
//     expect(() => {
//         getValueOrThrow(Parser.parse(tokens));
//     }).toThrow();
// });
//# sourceMappingURL=parser-test.js.map