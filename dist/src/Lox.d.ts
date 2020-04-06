import { Scanner } from "./Scanner";
export default class Lox {
    hadError: Boolean;
    scanner?: Scanner;
    main: (args: string[]) => void;
    private runFile;
    private runPrompt;
    private run;
    error(line: number, message: string): void;
    private report;
}
