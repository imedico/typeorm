"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
describe("database schema > column length > mssql", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            enabledDrivers: ["mssql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("all types should create with correct size", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("char").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("nchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("nvarchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("binary").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("varbinary").length).to.be.equal("50");
    })));
    it("all types should update their size", () => Promise.all(connections.map(async (connection) => {
        let metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("char").length = "100";
        metadata.findColumnWithPropertyName("varchar").length = "100";
        metadata.findColumnWithPropertyName("nchar").length = "100";
        metadata.findColumnWithPropertyName("nvarchar").length = "100";
        metadata.findColumnWithPropertyName("binary").length = "100";
        metadata.findColumnWithPropertyName("varbinary").length = "100";
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("char").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("nchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("nvarchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("binary").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("varbinary").length).to.be.equal("100");
    })));
    it("all relevant types should update their size to max", () => Promise.all(connections.map(async (connection) => {
        let metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("varchar").length = "MAX";
        metadata.findColumnWithPropertyName("nvarchar").length = "MAX";
        metadata.findColumnWithPropertyName("varbinary").length = "MAX";
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("MAX");
        (0, chai_1.expect)(table.findColumnByName("nvarchar").length).to.be.equal("MAX");
        (0, chai_1.expect)(table.findColumnByName("varbinary").length).to.be.equal("MAX");
    })));
});
//# sourceMappingURL=column-length-mssql.js.map