import TokenType from "./TokenType";
export declare type Literal = number | string | boolean;
export declare class Token {
    type: TokenType;
    lexeme: string;
    literal?: Literal;
    line: number;
    constructor(type: TokenType, lexeme: string, line: number, literal?: Literal);
    toString(): string;
}
