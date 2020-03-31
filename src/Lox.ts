// import * as fs from 'fs';
import { Scanner, ScannerError } from "./Scanner";

import { Result } from "./Result";
import { Token } from "./Token";
import readline from "readline";

export default class Lox {

    hadError: Boolean = false
    scanner?: Scanner;
        
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
        if (this.hadError) { process.exit(65) }
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
    
    private run(source: string): void {
        this.scanner = new Scanner(source);
        const result: Result<Token[], ScannerError[]> = this.scanner.scanTokens();
        if (result.isOk()) {
            for (let token of result.value) { console.log(token) }
        } else if (result.isFail()) {
            for (let error of result.value) { this.error(error.line, error.message) }
        }
    }

    public error(line: number, message: string): void {
        this.report(line, "", message);
    }

    private report = (line: number, where: string, message: string): void => {
        console.error(`[line: ${line}] Error ${where}: ${message}`);
        this.hadError = true;
    }
}
