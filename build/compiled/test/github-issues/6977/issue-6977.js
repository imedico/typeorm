"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Embedded_1 = require("./entity/Embedded");
const User_1 = require("./entity/User");
describe("github issues > #6977 Relation columns in embedded entities are not prefixed", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User, Embedded_1.Embedded],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly assign foreign key columns in embedded entity", () => Promise.all(connections.map(async (connection) => {
        const columns = connection.entityMetadatas.find((entity) => entity.name === "User").columns;
        (0, chai_1.expect)(columns.length).to.equal(3); // id, embeddedRelationuser1id, embeddedRelationuser2id
        (0, chai_1.expect)(columns.some((column) => column.databaseName === "id"))
            .to.be.true;
        (0, chai_1.expect)(columns.some((column) => column.databaseName === "embeddedRelationuser1id")).to.be.true;
        (0, chai_1.expect)(columns.some((column) => column.databaseName === "embeddedRelationuser2id")).to.be.true;
    })));
});
//# sourceMappingURL=issue-6977.js.map