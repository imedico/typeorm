"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("query runner > drop view", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/view/*{.js,.ts}"],
            enabledDrivers: ["postgres", "oracle"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop VIEW and revert dropping", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let postView = await queryRunner.getView("post_view");
        await queryRunner.dropView(postView);
        postView = await queryRunner.getView("post_view");
        (0, chai_1.expect)(postView).to.be.not.exist;
        await queryRunner.executeMemoryDownSql();
        postView = await queryRunner.getView("post_view");
        (0, chai_1.expect)(postView).to.be.exist;
        await queryRunner.release();
    })));
    it("should correctly drop MATERIALIZED VIEW and revert dropping", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let postMatView = await queryRunner.getView("post_materialized_view");
        await queryRunner.dropView(postMatView);
        postMatView = await queryRunner.getView("post_materialized_view");
        (0, chai_1.expect)(postMatView).to.be.not.exist;
        await queryRunner.executeMemoryDownSql();
        postMatView = await queryRunner.getView("post_materialized_view");
        (0, chai_1.expect)(postMatView).to.be.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-view.js.map