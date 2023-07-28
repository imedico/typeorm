"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Question_1 = require("./entity/Question");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("schema builder > update primary keys", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly update composite primary keys", () => Promise.all(connections.map(async (connection) => {
        // CockroachDB and Spanner does not support changing primary key constraint
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const metadata = connection.getMetadata(Category_1.Category);
        const nameColumn = metadata.findColumnWithPropertyName("name");
        nameColumn.isPrimary = true;
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("category");
        table.findColumnByName("id").isPrimary.should.be.true;
        table.findColumnByName("name").isPrimary.should.be.true;
        await queryRunner.release();
    })));
    it("should correctly update composite primary keys when table already have primary generated column", () => Promise.all(connections.map(async (connection) => {
        // Sqlite does not support AUTOINCREMENT on composite primary key
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver))
            return;
        // CockroachDB and Spanner does not support changing primary key constraint
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const metadata = connection.getMetadata(Question_1.Question);
        const nameColumn = metadata.findColumnWithPropertyName("name");
        nameColumn.isPrimary = true;
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("question");
        table.findColumnByName("id").isPrimary.should.be.true;
        table.findColumnByName("name").isPrimary.should.be.true;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=update-primary-keys.js.map