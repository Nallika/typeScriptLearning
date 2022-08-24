"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatuses = exports.httpMethods = void 0;
var httpMethods;
(function (httpMethods) {
    httpMethods[httpMethods["HTTP_GET_METHOD"] = 0] = "HTTP_GET_METHOD";
    httpMethods[httpMethods["HTTP_POST_METHOD"] = 1] = "HTTP_POST_METHOD";
})(httpMethods = exports.httpMethods || (exports.httpMethods = {}));
var httpStatuses;
(function (httpStatuses) {
    httpStatuses[httpStatuses["HTTP_STATUS_OK"] = 0] = "HTTP_STATUS_OK";
    httpStatuses[httpStatuses["HTTP_STATUS_INTERNAL_SERVER_ERROR"] = 1] = "HTTP_STATUS_INTERNAL_SERVER_ERROR";
})(httpStatuses = exports.httpStatuses || (exports.httpStatuses = {}));
;
