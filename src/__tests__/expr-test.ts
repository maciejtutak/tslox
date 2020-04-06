import * as Expr from "../Expr";

import { AstPrinter } from "../AstPrinter";
import { Token } from "../Token";
import TokenType from "../TokenType";

it('check simple multiplication expression', () => {
    const expression: Expr.Expr = new Expr.Binary(
            new Expr.Literal(1),
        new Token(TokenType.STAR, "*", 1, null),
            new Expr.Literal(2));

    expect(AstPrinter.print(expression)).toBe('(* 1 2)');
})

it('check binary expression', () => {
    const expression: Expr.Expr = new Expr.Binary(
        new Expr.Unary(
            new Token(TokenType.MINUS, "-", 1, null),
            new Expr.Literal(123)),
        new Token(TokenType.STAR, "*", 1, null),
        new Expr.Grouping(
            new Expr.Literal(45.67)));

    expect(AstPrinter.print(expression)).toBe('(* (- 123) (group 45.67))');
})

// it('check multi-line comment', () => {
//     const expression: Expr.Expr = new Expr.
// })