"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(value) {
        this.value = value;
    }
    Result.Ok = function (value) {
        return new Ok(value);
    };
    Result.Fail = function (value) {
        return new Fail(value);
    };
    Result.prototype.isOk = function () {
        return this !== undefined;
    };
    Result.prototype.isFail = function () {
        return this !== undefined;
    };
    return Result;
}());
exports.Result = Result;
var Ok = /** @class */ (function (_super) {
    __extends(Ok, _super);
    function Ok(value) {
        var _this = _super.call(this, value) || this;
        _this.value = value;
        return _this;
    }
    Ok.prototype.isOk = function () {
        return this !== undefined;
    };
    return Ok;
}(Result));
var Fail = /** @class */ (function (_super) {
    __extends(Fail, _super);
    function Fail(value) {
        var _this = _super.call(this, value) || this;
        _this.value = value;
        return _this;
    }
    Fail.prototype.isFail = function () {
        return this !== undefined;
    };
    return Fail;
}(Result));
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
