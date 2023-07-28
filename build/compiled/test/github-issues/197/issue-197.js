"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const person_1 = require("./entity/person");
describe("github issues > #197 Fails to drop indexes when removing fields", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: false,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("it should drop the column and the referenced index", () => Promise.all(connections.map(async (connection) => {
        let entityMetadata = connection.getMetadata(person_1.Person);
        let idx = entityMetadata.columns.findIndex((x) => x.databaseName === "firstname");
        entityMetadata.columns.splice(idx, 1);
        entityMetadata.indices = []; // clear the referenced index from metadata too
        await connection.synchronize(false);
    })));
});
//# sourceMappingURL=issue-197.js.map