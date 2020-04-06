export declare abstract class Result<T, E> {
    value: T | E;
    static Ok<T, E>(value: T): Ok<T, E>;
    static Fail<T, E>(value: E): Fail<T, E>;
    constructor(value: T | E);
    isOk(): this is Ok<T, E>;
    isFail(): this is Fail<T, E>;
}
declare class Ok<T, E> extends Result<T, E> {
    value: T;
    constructor(value: T);
    isOk(): this is Ok<T, E>;
}
declare class Fail<T, E> extends Result<T, E> {
    value: E;
    constructor(value: E);
    isFail(): this is Fail<T, E>;
}
export {};
