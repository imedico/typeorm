"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UniqueMetadata_1 = require("../../../src/metadata/UniqueMetadata");
const test_utils_1 = require("../../utils/test-utils");
const ForeignKeyMetadata_1 = require("../../../src/metadata/ForeignKeyMetadata");
describe("schema builder > create foreign key", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create foreign key", () => Promise.all(connections.map(async (connection) => {
        const categoryMetadata = connection.getMetadata("category");
        const postMetadata = connection.getMetadata("post");
        const columns = categoryMetadata.columns.filter((column) => ["postText", "postTag"].indexOf(column.propertyName) !==
            -1);
        const referencedColumns = postMetadata.columns.filter((column) => ["text", "tag"].indexOf(column.propertyName) !== -1);
        const fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
            entityMetadata: categoryMetadata,
            referencedEntityMetadata: postMetadata,
            columns: columns,
            referencedColumns: referencedColumns,
            namingStrategy: connection.namingStrategy,
        });
        categoryMetadata.foreignKeys.push(fkMetadata);
        // CockroachDB requires unique constraint for foreign key referenced columns
        if (connection.driver.options.type === "cockroachdb") {
            const uniqueConstraint = new UniqueMetadata_1.UniqueMetadata({
                entityMetadata: categoryMetadata,
                columns: fkMetadata.columns,
                args: {
                    name: connection.namingStrategy.relationConstraintName(categoryMetadata.tableName, fkMetadata.columns.map((c) => c.databaseName)),
                    target: categoryMetadata.target,
                },
            });
            categoryMetadata.uniques.push(uniqueConstraint);
        }
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("category");
        await queryRunner.release();
        table.foreignKeys.length.should.be.equal(1);
        table.indices.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=create-foreign-key.js.map