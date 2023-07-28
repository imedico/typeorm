"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const TestChild_1 = require("./entity/TestChild");
const TestParent_1 = require("./entity/TestParent");
describe("github issues > #5520 save does not return generated id if object to save contains a many to one relationship with an undefined id", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate parents and childs uuid and return them", () => Promise.all(connections.map(async (connection) => {
        let entity = new TestParent_1.TestParent();
        let entityChild = new TestChild_1.TestChild();
        entityChild.value = "test";
        entity.child = entityChild;
        let response = await connection
            .getRepository(TestParent_1.TestParent)
            .save(entity);
        (0, chai_1.assert)(response.uuid, "parent uuid should be generated and set");
        (0, chai_1.assert)(response.child.uuid, "child uuid should be generated and set");
    })));
});
//# sourceMappingURL=issue-5520.js.map