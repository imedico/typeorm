"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #438 how can i define unsigned column?", () => {
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
    it("should correctly create and change column with UNSIGNED and ZEROFILL attributes", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const metadata = connection.getMetadata(Post_1.Post);
        const idColumnMetadata = metadata.findColumnWithPropertyName("id");
        const numColumnMetadata = metadata.findColumnWithPropertyName("num");
        let table = await queryRunner.getTable("post");
        table.findColumnByName("id").unsigned.should.be.true;
        table.findColumnByName("num").zerofill.should.be.true;
        table.findColumnByName("num").unsigned.should.be.true;
        idColumnMetadata.unsigned = false;
        numColumnMetadata.zerofill = false;
        numColumnMetadata.unsigned = false;
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").unsigned.should.be.false;
        table.findColumnByName("num").zerofill.should.be.false;
        table.findColumnByName("num").unsigned.should.be.false;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-438.js.map