"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
describe("database schema > column width", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            enabledDrivers: ["mysql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("all types should be created with correct width", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("int").width).to.be.equal(10);
        (0, chai_1.expect)(table.findColumnByName("tinyint").width).to.be.equal(2);
        (0, chai_1.expect)(table.findColumnByName("smallint").width).to.be.equal(3);
        (0, chai_1.expect)(table.findColumnByName("mediumint").width).to.be.equal(9);
        (0, chai_1.expect)(table.findColumnByName("bigint").width).to.be.equal(10);
    })));
    it("should update data type display width", () => Promise.all(connections.map(async (connection) => {
        let metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("int").width = 5;
        metadata.findColumnWithPropertyName("tinyint").width = 3;
        metadata.findColumnWithPropertyName("smallint").width = 4;
        metadata.findColumnWithPropertyName("mediumint").width = 10;
        metadata.findColumnWithPropertyName("bigint").width = 11;
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("int").width).to.be.equal(5);
        (0, chai_1.expect)(table.findColumnByName("tinyint").width).to.be.equal(3);
        (0, chai_1.expect)(table.findColumnByName("smallint").width).to.be.equal(4);
        (0, chai_1.expect)(table.findColumnByName("mediumint").width).to.be.equal(10);
        (0, chai_1.expect)(table.findColumnByName("bigint").width).to.be.equal(11);
    })));
});
//# sourceMappingURL=column-width.js.map