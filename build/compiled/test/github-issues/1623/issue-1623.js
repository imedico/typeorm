"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const ColumnMetadata_1 = require("../../../src/metadata/ColumnMetadata");
const User_1 = require("./entity/User");
describe("github issues > #1623 NOT NULL constraint failed after a new column is added (SQLite)", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly add new column", () => Promise.all(connections.map(async (connection) => {
        // Spanner does not support adding new NOT NULL column to existing table
        if (connection.driver.options.type === "spanner")
            return;
        const userMetadata = connection.getMetadata(User_1.User);
        const columnMetadata = new ColumnMetadata_1.ColumnMetadata({
            connection: connection,
            entityMetadata: userMetadata,
            args: {
                target: User_1.User,
                propertyName: "userName",
                mode: "regular",
                options: {
                    type: "varchar",
                    name: "userName",
                },
            },
        });
        columnMetadata.build(connection);
        userMetadata.columns.push(columnMetadata);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("user");
        const column1 = table.findColumnByName("userName");
        await queryRunner.release();
        column1.should.be.exist;
    })));
});
//# sourceMappingURL=issue-1623.js.map