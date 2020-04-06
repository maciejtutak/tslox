import TokenType from "./TokenType";

export type Literal = number | string | boolean | undefined

export class Token {
    type: TokenType;
    lexeme: string;
    line: number;
    literal?: Literal;

    constructor(type: TokenType, lexeme: string, line: number, literal?: Literal) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
        this.literal = literal;
    }

    public toString(): string {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}