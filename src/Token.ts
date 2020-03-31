import TokenType from "./TokenType";

export type Literal = number | string | boolean

export class Token {
    type: TokenType;
    lexeme: string;
    literal?: Literal;
    line: number;

    constructor(type: TokenType, lexeme: string, line: number, literal?: Literal) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
        this.literal = literal;
    }

    public toString(): string {
        return `${TokenType[this.type]} ${this.lexeme} ${this.literal}`;
    }
}