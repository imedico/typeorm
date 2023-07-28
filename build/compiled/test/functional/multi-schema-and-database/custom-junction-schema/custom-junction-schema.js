"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("multi-schema-and-database > custom-junction-schema", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post, Category_1.Category],
            enabledDrivers: ["mssql", "postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create tables when custom table schema used", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postTable = await queryRunner.getTable("yoman.post");
        const categoryTable = await queryRunner.getTable("yoman.category");
        const junctionMetadata = connection.getManyToManyMetadata(Post_1.Post, "categories");
        const junctionTable = await queryRunner.getTable("yoman." + junctionMetadata.tableName);
        await queryRunner.release();
        (0, chai_1.expect)(postTable).not.to.be.undefined;
        postTable.name.should.be.equal("yoman.post");
        (0, chai_1.expect)(categoryTable).not.to.be.undefined;
        categoryTable.name.should.be.equal("yoman.category");
        (0, chai_1.expect)(junctionTable).not.to.be.undefined;
        junctionTable.name.should.be.equal("yoman." + junctionMetadata.tableName);
    })));
});
//# sourceMappingURL=custom-junction-schema.js.map