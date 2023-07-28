"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #3803 column option unique sqlite error", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [new src_1.EntitySchema(Post_1.PostSchema)],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create unique constraints defined in EntitySchema", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        // MySQL stores unique constraints as unique indices
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            (0, chai_1.expect)(table.indices.length).to.be.equal(1);
            (0, chai_1.expect)(table.indices[0].isUnique).to.be.true;
            (0, chai_1.expect)(table.indices[0].columnNames[0]).to.be.equal("name");
        }
        else {
            (0, chai_1.expect)(table.uniques.length).to.be.equal(1);
            (0, chai_1.expect)(table.uniques[0].columnNames[0]).to.be.equal("name");
        }
    })));
});
//# sourceMappingURL=issue-3803.js.map