"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shim = void 0;
let _Shim;
try {
    // We're in /test
    _Shim = require("../../../../extra/typeorm-class-transformer-shim");
}
catch (e) {
    // We're in /build/compiled/test
    _Shim = require("../../../../../extra/typeorm-class-transformer-shim");
}
exports.Shim = _Shim;
//# sourceMappingURL=shim.js.map