import { Interpreter } from "./Interpreter";
import { RuntimeError } from "./Errors";
import { Token } from "./Token";
export default class Lox {
    static hadError: boolean;
    static hadRuntimeError: boolean;
    static interpreter: Interpreter;
    main: (args: string[]) => void;
    private runFile;
    private runPrompt;
    private getValueOrThrow;
    private run;
    static report(line: number, where: string, message: string): void;
    static error(token: Token, message: string): void;
    static runtimeError(error: RuntimeError): void;
}
