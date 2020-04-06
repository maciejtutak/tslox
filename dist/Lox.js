"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AstPrinter_1 = require("./AstPrinter");
var Interpreter_1 = require("./Interpreter");
var Parser_1 = require("./Parser");
// import * as fs from 'fs';
var Scanner_1 = require("./Scanner");
var TokenType_1 = __importDefault(require("./TokenType"));
var readline_1 = __importDefault(require("readline"));
var Lox = /** @class */ (function () {
    function Lox() {
        var _this = this;
        this.main = function (args) {
            console.log(args);
            if (args.length < 2) {
                console.log("Usage: ts-lox [script]");
                return;
            }
            else if (args.length == 3) {
                _this.runFile(args[2]);
            }
            else {
                _this.runPrompt();
            }
        };
        this.runFile = function (fileName) {
            console.log(fileName);
            if (Lox.hadError) {
                process.exit(65);
            }
            if (Lox.hadRuntimeError) {
                process.exit(70);
            }
        };
    }
    Lox.prototype.runPrompt = function () {
        var _this = this;
        var rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>',
        });
        rl.on('line', function (input) {
            _this.run(input);
        });
    };
    // private throwErrors<E>(value: E): never {
    //     if (value instanceof Array) {
    //         for (let v of value) { 
    //                 throw v; 
    //         }
    //     }
    //     throw new Error();
    // }
    Lox.prototype.getValueOrThrow = function (result) {
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
    };
    Lox.prototype.run = function (source) {
        try {
            var tokens = this.getValueOrThrow(Scanner_1.Scanner.scan(source));
            var parse = this.getValueOrThrow(Parser_1.Parser.parse(tokens));
            console.log(AstPrinter_1.AstPrinter.print(parse));
            Lox.interpreter.interpret(parse);
        }
        catch (e) {
            if (e.name === 'ScannerError') {
                console.error('scannerError');
                Lox.report(e.line, "", e.message);
            }
            else if (e.name === 'ParserError') {
                console.error('parserError');
                Lox.report(e.token.line, e.token.lexeme, e.message);
            }
        }
        // if (result.isOk()) {
        //     for (let token of result.value) { console.log(token) }
        // } else if (result.isFail()) {
        //     for (let error of result.value) { Lox.report(error.line, "", error.message) }
        // }
        if (Lox.hadError) {
            return;
        }
        if (Lox.hadRuntimeError) {
            return;
        }
        // if (parse.isOk()) {
        //     // console.log(parse);
        //     console.log(AstPrinter.print(parse.value));
        // } else if (parse.isFail()) {
        //     for (let error of parse.value) { Lox.report(error.token.line, error.token.lexeme, error.message) }
        // }
        // if (result.isOk()) {
        //     astPrinter.print();
        // }
    };
    Lox.report = function (line, where, message) {
        console.error("[line: " + line + "] Error " + where + ": " + message);
        Lox.hadError = true;
    };
    Lox.error = function (token, message) {
        if (token.type === TokenType_1.default.EOF) {
            Lox.report(token.line, " at the end", message);
        }
        else {
            Lox.report(token.line, " at '" + token.lexeme + "'", message);
        }
    };
    Lox.runtimeError = function (error) {
        console.error("[line: " + error.operand.line + "] " + error.message);
        Lox.hadRuntimeError = true;
    };
    // hadError: boolean = false
    Lox.hadError = false;
    Lox.hadRuntimeError = false;
    Lox.interpreter = new Interpreter_1.Interpreter();
    return Lox;
}());
exports.default = Lox;
//# sourceMappingURL=Lox.js.map