import * as Expr from "./Expr";

import { AstPrinter } from "./AstPrinter";
import { Interpreter } from "./Interpreter";
import { Parser } from "./Parser";
import { Result } from "./Result";
import { RuntimeError } from "./Errors";
// import * as fs from 'fs';
import { Scanner } from "./Scanner";
import { Token } from "./Token";
import TokenType from "./TokenType";
import readline from "readline";

export default class Lox {
    // hadError: boolean = false
    static hadError: boolean = false;
    static hadRuntimeError: boolean = false;
        
    static interpreter = new Interpreter();
    
    public main = (args: string[]): void => {
        console.log(args);
        if (args.length < 2) {
            console.log("Usage: ts-lox [script]");
            return;
        } else if (args.length == 3) {
            this.runFile(args[2]);
        } else {
            this.runPrompt();
        }
    }

    private runFile = (fileName: string): void => {
        console.log(fileName)
        if (Lox.hadError) { process.exit(65) }
        if (Lox.hadRuntimeError) { process.exit(70) }
    }

    private runPrompt(): void  {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>',
        });

        rl.on('line', (input) => {
            this.run(input);
        })

    }
    
    // private throwErrors<E>(value: E): never {
    //     if (value instanceof Array) {
    //         for (let v of value) { 
    //                 throw v; 
    //         }
    //     }
    //     throw new Error();
    // }

    private getValueOrThrow<T, E>(result: Result<T, E>): T | never {
        if (result.isOk()) {
            return result.value;
        } else {
            if (result.value instanceof Array) {
                for (let v of result.value) { 
                        throw v; 
                }
            }
        }
        throw new Error();
    }

    private run(source: string): void {
        try {
            const tokens: Token[] = this.getValueOrThrow(Scanner.scan(source));
            const parse: Expr.Expr = this.getValueOrThrow(Parser.parse(tokens));
            console.log(AstPrinter.print(parse));
            Lox.interpreter.interpret(parse);
        } catch (e) {
            if (e.name === 'ScannerError') {
                console.error('scannerError')
                Lox.report(e.line, "", e.message);
            } else if (e.name === 'ParserError') {
                console.error('parserError')
                Lox.report(e.token.line, e.token.lexeme, e.message);
            }
        }
        // if (result.isOk()) {
        //     for (let token of result.value) { console.log(token) }
        // } else if (result.isFail()) {
        //     for (let error of result.value) { Lox.report(error.line, "", error.message) }
        // }

            if (Lox.hadError) { return }
            if (Lox.hadRuntimeError) { return }
            // if (parse.isOk()) {
            //     // console.log(parse);
            //     console.log(AstPrinter.print(parse.value));
            // } else if (parse.isFail()) {
            //     for (let error of parse.value) { Lox.report(error.token.line, error.token.lexeme, error.message) }
            // }
        
        
        // if (result.isOk()) {
        //     astPrinter.print();
        // }
    }

    static report(line: number, where: string, message: string): void {
        console.error(`[line: ${line}] Error ${where}: ${message}`);
        Lox.hadError = true;
    }

    static error(token: Token, message: string): void {
        if (token.type === TokenType.EOF) {
            Lox.report(token.line, " at the end", message);
        } else {
            Lox.report(token.line, " at '" + token.lexeme + "'", message)
        }
    }

    static runtimeError(error: RuntimeError): void {
        console.error(`[line: ${error.operand.line}] ${error.message}`);
        Lox.hadRuntimeError = true;
    }
}
