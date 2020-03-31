export abstract class Result<T, E> {
    static Ok<T, E>(value: T): Ok<T, E> {
        return new Ok(value);
    }
  
    static Fail<T, E>(value: E): Fail<T, E> {
        return new Fail(value);
    }
  
    constructor(public value: T | E) {}

    isOk(): this is Ok<T, E> {
        return (this as Ok<T, E>) !== undefined;
    }

    isFail(): this is Fail<T, E> {
        return (this as Fail<T, E>) !== undefined;
    }

    // match<K, U>({ ok, fail }: { ok: (v: T) => K; fail: (e: E) => U }): K | U {
    //     throw new Error()
    // }
}
  
class Ok<T, E> extends Result<T, E> {
    constructor(public value: T) {
        super(value);
    }

    isOk(): this is Ok<T, E> {
        return (this as Ok<T, E>) !== undefined;
    }

    // match<K, U>({ ok, fail }: { ok: (v: T) => K; fail: (e: E) => U }): K | U {
    //     return ok(this.value)
    // }
}

class Fail<T, E> extends Result<T, E> {
    constructor(public value: E) {
        super(value);
    }

    isFail(): this is Fail<T, E> {
        return (this as Fail<T, E>) !== undefined;
    }

    // match<K, U>({ ok, fail }: { ok: (v: T) => K; fail: (e: E) => U }): K | U {
    //     return fail(this.value)
    // }
}


// export type Result<T, E> = Ok<T, E> | Err<T, E>

// export const ok = <T, E>(value: T): Result<T, E> => new Ok(value);
// export const err = <T, E>(value: E): Result<T, E> => new Err(value);
    
// class Ok<T, E> {
//     constructor(readonly value: T) {}

//     isOk(): this is Ok<T, E> {
//         return true;
//     }

//     getValue(): T {
//         return this.value;
//     }
// }
    
// class Err<T, E> {
//     constructor(readonly value: E) {}

//     isOk(): this is Ok<T, E> {
//         return false;
//     }

//     getValue(): E {
//         return this.value;
//     }
// }

// export type Result<T, E> = Ok<T, E> | Err<T, E>

// export const ok = <T, E>(value: T): Result<T, E> => new Ok(value);
// export const err = <T, E>(value: E): Result<T, E> => new Err(value);
    
// class Ok<T, E> {
//     constructor(readonly value: T) {}

//     isOk(): this is Ok<T, E> {
//         return (this as Ok<T, E>) !== undefined;
//     }

//     getValue(): T {
//         return this.value;
//     }
// }
    
// class Err<T, E> {
//     constructor(readonly value: E) {}

//     isErr(): this is Err<T, E> {
//         return (this as Err<T, E>) !== undefined;
//     }

//     getValue(): E {
//         return this.value;
//     }
// }