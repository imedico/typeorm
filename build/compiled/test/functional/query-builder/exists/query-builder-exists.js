"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Test_1 = require("./entity/Test");
describe("query builder > exist", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Exists query of empty table should be false", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        const exist = await repo.exist();
        (0, chai_1.expect)(exist).to.be.equal(false);
    })));
    it("Exists query of non empty table should be true", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        await repo.save({ id: "ok" });
        await repo.save({ id: "nok" });
        const exist = await repo.exist();
        (0, chai_1.expect)(exist).to.be.equal(true);
    })));
});
//# sourceMappingURL=query-builder-exists.js.map