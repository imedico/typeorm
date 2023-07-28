"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #1377 Add support for `GENERATED ALWAYS AS` in MySQL", () => {
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
    it("should correctly create table with generated columns", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table
            .findColumnByName("virtualFullName")
            .asExpression.should.be.equal("concat(`firstName`,' ',`lastName`)");
        table
            .findColumnByName("virtualFullName")
            .generatedType.should.be.equal("VIRTUAL");
        table
            .findColumnByName("storedFullName")
            .asExpression.should.be.equal("concat(`firstName`,' ',`lastName`)");
        table
            .findColumnByName("storedFullName")
            .generatedType.should.be.equal("STORED");
        const metadata = connection.getMetadata(Post_1.Post);
        const virtualFullNameColumn = metadata.findColumnWithPropertyName("virtualFullName");
        virtualFullNameColumn.generatedType = "STORED";
        const storedFullNameColumn = metadata.findColumnWithPropertyName("storedFullName");
        storedFullNameColumn.asExpression =
            "concat('Mr. ',`firstName`,' ',`lastName`)";
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        table
            .findColumnByName("virtualFullName")
            .generatedType.should.be.equal("STORED");
        table
            .findColumnByName("storedFullName")
            .asExpression.should.be.equal("concat('Mr. ',`firstName`,' ',`lastName`)");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1377.js.map