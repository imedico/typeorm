"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xfail = void 0;
const chai_1 = require("chai");
const wrap = (fn, condition) => {
    return function Wrapped() {
        if (typeof condition === "function") {
            if (!condition()) {
                return Promise.resolve();
            }
        }
        else if (condition === false) {
            return Promise.resolve();
        }
        return new Promise((ok, fail) => {
            if (fn.length > 1) {
                fn.call(context, (err) => (err ? fail(err) : ok()));
            }
            else {
                ok(fn.call(context));
            }
        }).then((e) => chai_1.assert.fail("Expected this test to fail"), (e) => {
            if (!(e instanceof chai_1.AssertionError)) {
                throw e;
            }
        });
    };
};
function unless(condition) {
    const xfailIt = (fnOrTitle, fn) => {
        if (typeof fnOrTitle === "string") {
            return it(fnOrTitle, wrap(fn, condition));
        }
        else {
            return it(wrap(fnOrTitle, condition));
        }
    };
    xfailIt.only = (fnOrTitle, fn) => {
        if (typeof fnOrTitle === "string") {
            return it.skip(fnOrTitle, wrap(fn, condition));
        }
        else {
            return it.skip(wrap(fnOrTitle, condition));
        }
    };
    xfailIt.skip = (fnOrTitle, fn) => {
        if (typeof fnOrTitle === "string") {
            return it.skip(fnOrTitle, wrap(fn, condition));
        }
        else {
            return it.skip(wrap(fnOrTitle, condition));
        }
    };
    xfailIt.retries = (n) => {
        it.retries(n);
    };
    return { it: xfailIt };
}
const xfail = {
    ...unless(true),
    unless,
};
exports.xfail = xfail;
//# sourceMappingURL=xfail.js.map