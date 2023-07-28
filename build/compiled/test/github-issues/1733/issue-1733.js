"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #1733 Postgresql driver does not detect/support varying without length specified", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly synchronize schema when varchar column length is not specified", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.findColumnByName("name").length.should.be.empty;
        table.findColumnByName("name2").length.should.be.equal("255");
        const postMetadata = connection.getMetadata(Post_1.Post);
        const column1 = postMetadata.findColumnWithPropertyName("name");
        const column2 = postMetadata.findColumnWithPropertyName("name2");
        column1.length = "500";
        column2.length = "";
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        table.findColumnByName("name").length.should.be.equal("500");
        table.findColumnByName("name2").length.should.be.empty;
        column1.length = "";
        column2.length = "255";
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        table.findColumnByName("name").length.should.be.empty;
        table.findColumnByName("name2").length.should.be.equal("255");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1733.js.map