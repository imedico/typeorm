"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const OrmUtils_1 = require("../../../src/util/OrmUtils");
describe("OrmUtils.mergeDeep", () => {
    it("should handle simple values.", () => {
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(1, 2)).to.equal(1);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(2, 1)).to.equal(2);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(2, 1, 1)).to.equal(2);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(1, 2, 1)).to.equal(1);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(1, 1, 2)).to.equal(1);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(2, 1, 2)).to.equal(2);
    });
    it("should handle ordering and indempotence.", () => {
        const a = { a: 1 };
        const b = { a: 2 };
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b)).to.deep.equal(b);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a, a)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b, a)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, a, b)).to.deep.equal(b);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a, b)).to.deep.equal(b);
        const c = { a: 3 };
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b, c)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, c, b)).to.deep.equal(b);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(c, a, a)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(c, b, a)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, c, b)).to.deep.equal(b);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a, c)).to.deep.equal(c);
    });
    it("should skip nested promises in sources.", () => {
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep({}, { p: Promise.resolve() })).to.deep.equal({});
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep({}, { p: { p: Promise.resolve() } })).to.deep.equal({ p: {} });
        const a = { p: Promise.resolve(0) };
        const b = { p: Promise.resolve(1) };
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, {})).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b)).to.deep.equal(a);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a)).to.deep.equal(b);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, {})).to.deep.equal(b);
    });
    it("should merge moderately deep objects correctly.", () => {
        const a = { a: { b: { c: { d: { e: 123, h: { i: 23 } } } } }, g: 19 };
        const b = { a: { b: { c: { d: { f: 99 } }, f: 31 } } };
        const c = {
            a: { b: { c: { d: { e: 123, f: 99, h: { i: 23 } } }, f: 31 } },
            g: 19,
        };
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a, a)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, b, a)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(a, a, b)).to.deep.equal(c);
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep(b, a, b)).to.deep.equal(c);
    });
    it("should merge recursively deep objects correctly", () => {
        let a = {};
        let b = {};
        a["b"] = b;
        a["a"] = a;
        b["a"] = a;
        (0, chai_1.expect)(OrmUtils_1.OrmUtils.mergeDeep({}, a));
    });
    it("should reference copy complex instances of classes.", () => {
        class Foo {
            constructor() {
                this.recursive = this;
            }
        }
        const foo = new Foo();
        const result = OrmUtils_1.OrmUtils.mergeDeep({}, { foo });
        (0, chai_1.expect)(result).to.have.property("foo");
        (0, chai_1.expect)(result.foo).to.equal(foo);
    });
});
//# sourceMappingURL=OrmUtils.js.map