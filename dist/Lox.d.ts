import { Token } from "./Token";
export default class Lox {
    static hadError: boolean;
    main: (args: string[]) => void;
    private runFile;
    private runPrompt;
    private throwErrors;
    private getValueOrThrow;
    private run;
    static report(line: number, where: string, message: string): void;
    static error(token: Token, message: string): void;
}
