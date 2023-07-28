"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #1901 The correct way of adding `ON UPDATE CURRENT_TIMESTAMP` clause to timestamp column", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create and change column with ON UPDATE expression", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table
            .findColumnByName("updateAt")
            .onUpdate.should.be.equal("CURRENT_TIMESTAMP(3)");
        const metadata = connection.getMetadata(Post_1.Post);
        metadata.findColumnWithPropertyName("updateAt").onUpdate =
            undefined;
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table.findColumnByName("updateAt").onUpdate).to.be
            .undefined;
    })));
});
//# sourceMappingURL=issue-1901.js.map