import TokenType from "./TokenType";
export declare type Literal = number | string | boolean | null;
export declare class Token {
    type: TokenType;
    lexeme: string;
    line: number;
    literal: Literal;
    constructor(type: TokenType, lexeme: string, line: number, literal: Literal);
    toString(): string;
}
