#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lox_1 = __importDefault(require("./Lox"));
var lox = new Lox_1.default();
lox.main(process.argv);
//# sourceMappingURL=index.js.map