"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const dummy_1 = require("./entity/dummy");
const transformer_1 = require("./transformer");
describe("github issues > #2557 object looses its prototype before transformer.to()", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should give correct object in transformer.to", () => Promise.all(connections.map(async (connection) => {
        const dummy = new dummy_1.Dummy();
        dummy.id = 1;
        dummy.num = new transformer_1.WrappedNumber(3);
        await connection.getRepository(dummy_1.Dummy).save(dummy);
        (0, chai_1.expect)(transformer_1.transformer.lastValue).to.be.instanceOf(transformer_1.WrappedNumber);
    })));
    // you can add additional tests if needed
});
//# sourceMappingURL=issue-2557.js.map