"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as fs from 'fs';
var Scanner_1 = require("./Scanner");
var readline_1 = __importDefault(require("readline"));
var Lox = /** @class */ (function () {
    function Lox() {
        var _this = this;
        this.hadError = false;
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
            if (_this.hadError) {
                process.exit(65);
            }
        };
        this.report = function (line, where, message) {
            console.error("[line: " + line + "] Error " + where + ": " + message);
            _this.hadError = true;
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
    Lox.prototype.run = function (source) {
        this.scanner = new Scanner_1.Scanner(source);
        var result = this.scanner.scanTokens();
        if (result.isOk()) {
            for (var _i = 0, _a = result.value; _i < _a.length; _i++) {
                var token = _a[_i];
                console.log(token);
            }
        }
        else if (result.isFail()) {
            for (var _b = 0, _c = result.value; _b < _c.length; _b++) {
                var error = _c[_b];
                this.error(error.line, error.message);
            }
        }
    };
    Lox.prototype.error = function (line, message) {
        this.report(line, "", message);
    };
    return Lox;
}());
exports.default = Lox;
