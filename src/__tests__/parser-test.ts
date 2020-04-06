import * as Expr from "../Expr";

import { AstPrinter } from "../AstPrinter";
import { Parser } from "../Parser";
import { Result } from "../Result";
import { Token } from "../Token";
import TokenType from "../TokenType";

// import { Scanner } from "../Scanner";

function getValueOrThrow<T, E>(result: Result<T, E>): T | never {
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

it('check primary expression', () => {
    const tokens: Token[] = [ new Token(TokenType.NUMBER, "", 1, "24") ];
    
    const parse: Expr.Expr = getValueOrThrow(Parser.parse(tokens));
    expect(AstPrinter.print(parse)).toBe('24');
});


it('check binary expression', () => {
    const tokens: Token[] = [ 
        new Token(TokenType.NUMBER, "", 1, "24"),
        new Token(TokenType.PLUS, "+", 1),
        new Token(TokenType.NUMBER, "", 1, "48")
    ];

    const parse: Expr.Expr = getValueOrThrow(Parser.parse(tokens));
    expect(AstPrinter.print(parse)).toBe('(+ 24 48)');
});


it('check empty input', () => {
    const tokens: Token[] = [ 
        new Token(TokenType.SLASH, "/", 1, ""),
        new Token(TokenType.SLASH, "/", 1, ""),
    ];

    expect(() => {
        getValueOrThrow(Parser.parse(tokens));
    }).toThrow();
});

it('check no matching )', () => {
    const tokens: Token[] = [ 
        new Token(TokenType.LEFT_PAREN, "(", 1, ""),
        new Token(TokenType.LEFT_PAREN, "(", 1, ""),
        new Token(TokenType.RIGHT_PAREN, ")", 1, ""),
    ];

    expect(() => {
        getValueOrThrow(Parser.parse(tokens));
    }).toThrow();
});

// it('check 2(', () => {
//     const tokens: Token[] = [ 
//         new Token(TokenType.NUMBER, "", 1, "2"),
//         new Token(TokenType.LEFT_PAREN, "(", 1, "")
//     ];
//     expect(() => {
//         getValueOrThrow(Parser.parse(tokens));
//     }).toThrow();
// });