"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
describe("database schema > column length > postgres", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("all types should create with correct size", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("characterVarying").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("character").length).to.be.equal("50");
        (0, chai_1.expect)(table.findColumnByName("char").length).to.be.equal("50");
    })));
    it("all types should update their size", () => Promise.all(connections.map(async (connection) => {
        let metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("characterVarying").length = "100";
        metadata.findColumnWithPropertyName("varchar").length = "100";
        metadata.findColumnWithPropertyName("character").length = "100";
        metadata.findColumnWithPropertyName("char").length = "100";
        await connection.synchronize(false);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("characterVarying").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("varchar").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("character").length).to.be.equal("100");
        (0, chai_1.expect)(table.findColumnByName("char").length).to.be.equal("100");
    })));
});
//# sourceMappingURL=column-length-postgres.js.map