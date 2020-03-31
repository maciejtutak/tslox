"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType_1 = __importDefault(require("./TokenType"));
var Token = /** @class */ (function () {
    function Token(type, lexeme, line, literal) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
        this.literal = literal;
    }
    Token.prototype.toString = function () {
        return TokenType_1.default[this.type] + " " + this.lexeme + " " + this.literal;
    };
    return Token;
}());
exports.Token = Token;
