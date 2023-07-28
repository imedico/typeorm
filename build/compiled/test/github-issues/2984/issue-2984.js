"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #2984 Discriminator conflict reported even for non-inherited tables", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/**/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load entities even with the same discriminator", () => Promise.all(connections.map(async (connection) => {
        connection.entityMetadatas.should.have.length(5);
        connection.entityMetadatas.forEach((metadata) => metadata.discriminatorValue.should.be.oneOf([
            "Note",
            "OwnerNote",
        ]));
    })));
});
//# sourceMappingURL=issue-2984.js.map