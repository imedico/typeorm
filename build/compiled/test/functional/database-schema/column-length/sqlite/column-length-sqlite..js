"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
describe("database schema > column length > sqlite", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            enabledDrivers: ["sqlite", "better-sqlite3"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("all types should create with correct size", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("character").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("nchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("nvarchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("varying_character").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("native_character").length).to.be.equal("50");
    })));
    it("all types should update their size", () => Promise.all(connections.map(async (connection) => {
        let metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("character").length = "100";
        metadata.findColumnWithPropertyName("varchar").length = "100";
        metadata.findColumnWithPropertyName("nchar").length = "100";
        metadata.findColumnWithPropertyName("nvarchar").length = "100";
        metadata.findColumnWithPropertyName("varying_character").length = "100";
        metadata.findColumnWithPropertyName("native_character").length = "100";
        await connection.synchronize(false);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("character").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("nchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("nvarchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("varying_character").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("native_character").length).to.be.equal("100");
        await connection.synchronize(false);
    })));
});
//# sourceMappingURL=column-length-sqlite..js.map