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
var Expr = __importStar(require("./Expr"));
var Errors_1 = require("./Errors");
var Result_1 = require("./Result");
var TokenType_1 = __importDefault(require("./TokenType"));
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = [];
        this.current = 0;
        this.errors = [];
        this.tokens = tokens;
    }
    Parser.parse = function (tokens) {
        var parser = new Parser(tokens);
        return parser.parse();
    };
    Parser.prototype.parse = function () {
        // try {
        var expr = this.expression();
        if (this.errors.length === 0) {
            return Result_1.Result.Ok(expr);
        }
        return Result_1.Result.Fail(this.errors);
        // return Result.Ok(this.expression());
        // } catch (e) {
        //     console.error('ERROR')
        //     return Result.Fail(this.errors);
        // }
    };
    Parser.prototype.expression = function () {
        // console.log('expression')
        return this.equality();
    };
    Parser.prototype.equality = function () {
        // console.log('equality')
        var expr = this.comparison();
        while (this.match(TokenType_1.default.BANG_EQUAL, TokenType_1.default.EQUAL_EQUAL)) {
            var operator = this.previous();
            var right = this.comparison();
            expr = new Expr.Binary(expr, operator, right);
        }
        return expr;
    };
    Parser.prototype.comparison = function () {
        // console.log('comparison')
        var expr = this.addition();
        while (this.match(TokenType_1.default.GREATER, TokenType_1.default.GREATER_EQUAL, TokenType_1.default.LESS, TokenType_1.default.LESS_EQUAL)) {
            var operator = this.previous();
            var right = this.addition();
            expr = new Expr.Binary(expr, operator, right);
        }
        return expr;
    };
    Parser.prototype.addition = function () {
        // console.log('addition')
        var expr = this.multiplication();
        while (this.match(TokenType_1.default.PLUS, TokenType_1.default.MINUS)) {
            var operator = this.previous();
            var right = this.multiplication();
            expr = new Expr.Binary(expr, operator, right);
        }
        return expr;
    };
    Parser.prototype.multiplication = function () {
        // console.log('multiplication')
        var expr = this.unary();
        while (this.match(TokenType_1.default.STAR, TokenType_1.default.SLASH)) {
            var operator = this.previous();
            var right = this.unary();
            expr = new Expr.Binary(expr, operator, right);
        }
        return expr;
    };
    Parser.prototype.unary = function () {
        // console.log('unary')
        if (this.match(TokenType_1.default.MINUS, TokenType_1.default.BANG)) {
            var operator = this.previous();
            var right = this.unary();
            return new Expr.Unary(operator, right);
        }
        return this.primary();
    };
    Parser.prototype.primary = function () {
        // console.log('primary')
        if (this.match(TokenType_1.default.FALSE)) {
            return new Expr.Literal(false);
        }
        if (this.match(TokenType_1.default.TRUE)) {
            return new Expr.Literal(true);
        }
        if (this.match(TokenType_1.default.NIL)) {
            return new Expr.Literal(null);
        }
        if (this.match(TokenType_1.default.NUMBER, TokenType_1.default.STRING)) {
            return new Expr.Literal(this.previous().literal);
        }
        if (this.match(TokenType_1.default.LEFT_PAREN)) {
            var expr = this.expression();
            this.consume(TokenType_1.default.RIGHT_PAREN, "Expect ')' after expression.");
            return new Expr.Grouping(expr);
        }
        //TODO: for now
        throw new Errors_1.ParserError(this.peek(), "Expect expression.");
        // throw Error;
    };
    /* utilities functios */
    Parser.prototype.match = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
            var type = types_1[_a];
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    };
    Parser.prototype.consume = function (type, message) {
        if (this.check(type)) {
            return this.advance();
        }
        this.errors.push(new Errors_1.ParserError(this.peek(), message));
    };
    Parser.prototype.check = function (type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type == type;
    };
    Parser.prototype.advance = function () {
        if (!this.isAtEnd()) {
            this.current++;
        }
        return this.previous();
    };
    Parser.prototype.isAtEnd = function () {
        return this.current === this.tokens.length;
    };
    Parser.prototype.peek = function () {
        return this.tokens[this.current];
    };
    Parser.prototype.previous = function () {
        return this.tokens[this.current - 1];
    };
    return Parser;
}());
exports.Parser = Parser;
//     private error(token: Token, message: string): ParserError {
//         return new ParserError();
//     }
// } 
//# sourceMappingURL=Parser.js.map