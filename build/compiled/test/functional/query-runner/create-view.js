"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const View_1 = require("../../../src/schema-builder/view/View");
const chai_1 = require("chai");
describe("query runner > create view", () => {
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
    it("should correctly create VIEW and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const view = new View_1.View({
            name: "new_post_view",
            expression: `SELECT * from "post"`,
        });
        await queryRunner.createView(view, true);
        let postView = await queryRunner.getView("new_post_view");
        (0, chai_1.expect)(postView).to.be.exist;
        await queryRunner.executeMemoryDownSql();
        postView = await queryRunner.getView("new_post_view");
        (0, chai_1.expect)(postView).to.be.not.exist;
        await queryRunner.release();
    })));
    it("should correctly create MATERIALIZED VIEW and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const view = new View_1.View({
            name: "new_post_materialized_view",
            expression: `SELECT * from "post"`,
            materialized: true,
        });
        await queryRunner.createView(view, true);
        let postMatView = await queryRunner.getView("new_post_materialized_view");
        (0, chai_1.expect)(postMatView).to.be.exist;
        (0, chai_1.expect)(postMatView.materialized).to.be.true;
        await queryRunner.executeMemoryDownSql();
        postMatView = await queryRunner.getView("new_post_materialized_view");
        (0, chai_1.expect)(postMatView).to.be.not.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-view.js.map