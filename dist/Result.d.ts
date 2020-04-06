export declare abstract class Result<T, E> {
    value: T | E;
    static Ok<T, E>(value: T): Ok<T, E>;
    static Fail<T, E>(value: E): Fail<T, E>;
    constructor(value: T | E);
    abstract isOk(): this is Ok<T, E>;
    onFail(_callback: (value: E) => never): T;
}
declare class Ok<T, E> extends Result<T, E> {
    value: T;
    constructor(value: T);
    isOk(): this is Ok<T, E>;
    onFail(_callback: (value: E) => never): T;
}
declare class Fail<T, E> extends Result<T, E> {
    value: E;
    constructor(value: E);
    isOk(): this is Ok<T, E>;
    onFail(callback: (value: E) => never): T;
}
export {};
