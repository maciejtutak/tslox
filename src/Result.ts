
export abstract class Result<T, E> {
    static Ok<T, E>(value: T): Ok<T, E> {
        return new Ok(value);
    }
  
    static Fail<T, E>(value: E): Fail<T, E> {
        return new Fail(value);
    }
  
    constructor(public value: T | E) {}

    abstract isOk(): this is Ok<T, E>;

    // abstract isFail(): this is Fail<T, E>;


    // abstract match<U>({ fail }: { fail: (value: E) => U }): U;

    onFail(_callback: (value: E) => never): T {
        throw new Error();
    };
}
  
class Ok<T, E> extends Result<T, E> {
    constructor(public value: T) {
        super(value);
    }

    isOk(): this is Ok<T, E> {
        return true;
    }

    // isFail(): this is Fail<T, E> {
    //     return false;
    // };

    onFail(_callback: (value: E) => never): T {
        return this.value;
    }

    // match<U>({ fail }: { fail: (e: E) => U }): U {
    //     return this.value;
    // }
}

class Fail<T, E> extends Result<T, E> {
    constructor(public value: E) {
        super(value);
    }

    isOk(): this is Ok<T, E> {
        return false;
    }

    // isFail(): this is Fail<T, E> {
    //     return true;
    // };

    onFail(callback: (value: E) => never): T {
        return callback(this.value);
    }

    // match<K, U>({ ok, fail }: { ok: (v: T) => K; fail: (e: E) => U }): K | U {
    //     return fail(this.value);
    // }
}
