"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = /** @class */ (function () {
    function Token(type, lexeme, line, literal) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
        this.literal = literal;
    }
    Token.prototype.toString = function () {
        return this.type + " " + this.lexeme + " " + this.literal;
    };
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=Token.js.map