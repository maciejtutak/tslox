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
    // abstract isFail(): this is Fail<T, E>;
    // abstract match<U>({ fail }: { fail: (value: E) => U }): U;
    Result.prototype.onFail = function (_callback) {
        throw new Error();
    };
    ;
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
        return true;
    };
    // isFail(): this is Fail<T, E> {
    //     return false;
    // };
    Ok.prototype.onFail = function (_callback) {
        return this.value;
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
    Fail.prototype.isOk = function () {
        return false;
    };
    // isFail(): this is Fail<T, E> {
    //     return true;
    // };
    Fail.prototype.onFail = function (callback) {
        return callback(this.value);
    };
    return Fail;
}(Result));
//# sourceMappingURL=Result.js.map