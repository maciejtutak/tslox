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
var RuntimeError = /** @class */ (function (_super) {
    __extends(RuntimeError, _super);
    function RuntimeError(operand) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ParserError);
        }
        _this.operand = operand;
        return _this;
    }
    return RuntimeError;
}(Error));
exports.RuntimeError = RuntimeError;
var ParserError = /** @class */ (function (_super) {
    __extends(ParserError, _super);
    function ParserError(token) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ParserError);
        }
        _this.name = 'ParserError';
        _this.token = token;
        return _this;
    }
    return ParserError;
}(Error));
exports.ParserError = ParserError;
//# sourceMappingURL=Errors.js.map