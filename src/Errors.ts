import { Token } from "./Token";

export class RuntimeError extends Error {
    operand: Token;
    
    constructor(operand: Token, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParserError)
          }
          
        this.operand = operand;
    }
}

export class ParserError extends Error {
    token: Token;

    constructor(token: Token, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParserError)
          }

          this.name = 'ParserError'

          
        this.token = token;
    }
}
