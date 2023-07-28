"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const Foo_1 = require("./entity/Foo");
describe("github issues > #5004 expireAfterSeconds 0 can't be passed to Index decorator", () => {
    it("should allow expireAfterSeconds 0 to be passed to Index decorator", () => {
        const metadataArgsStorage = (0, src_1.getMetadataArgsStorage)();
        const fooIndices = metadataArgsStorage.indices.filter((indice) => indice.target === Foo_1.Foo);
        (0, chai_1.expect)(fooIndices.length).to.eql(1);
        (0, chai_1.expect)(fooIndices[0].expireAfterSeconds).to.eql(0);
    });
});
//# sourceMappingURL=issue-5004.js.map