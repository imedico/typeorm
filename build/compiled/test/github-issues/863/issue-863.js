"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const master_1 = require("./entities/master");
const detail_1 = require("./entities/detail");
describe("github issues > #863 indices > create schema", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [master_1.Master, detail_1.Detail],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("build schema", function () {
        it("it should just work, creating the index", () => Promise.all(connections.map(async (connection) => {
            await connection.synchronize(true);
        })));
    });
});
//# sourceMappingURL=issue-863.js.map