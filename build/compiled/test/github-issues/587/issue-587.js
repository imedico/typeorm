"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #587 Ordering of fields in composite indexes defined using Index decorator", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // this test only works for fields specified as string[]
    it("should preserve field ordering when fields are specified as string[]", () => Promise.all(connections.map(async (connection) => {
        connection.entityMetadatas.forEach((entityMetadata) => {
            entityMetadata.indices.forEach((index) => {
                if (index.givenColumnNames &&
                    Array.isArray(index.givenColumnNames)) {
                    for (let i = 0; i < index.columns.length; i++) {
                        const givenColumn = index.givenColumnNames[i];
                        const actualColumn = index.columns[i];
                        actualColumn.propertyName.should.equal(givenColumn);
                    }
                }
            });
        });
    })));
});
//# sourceMappingURL=issue-587.js.map