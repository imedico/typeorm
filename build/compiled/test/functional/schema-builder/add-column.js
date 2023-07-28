"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ColumnMetadata_1 = require("../../../src/metadata/ColumnMetadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("schema builder > add column", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly add column", () => Promise.all(connections.map(async (connection) => {
        const postMetadata = connection.getMetadata("post");
        let numericType = "int";
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            numericType = "integer";
        }
        else if (connection.driver.options.type === "spanner") {
            numericType = "int64";
        }
        let stringType = "varchar";
        if (connection.driver.options.type === "spanner") {
            stringType = "string";
        }
        const columnMetadata1 = new ColumnMetadata_1.ColumnMetadata({
            connection: connection,
            entityMetadata: postMetadata,
            args: {
                target: Post_1.Post,
                propertyName: "secondId",
                mode: "regular",
                options: {
                    type: numericType,
                    name: "secondId",
                    nullable: connection.driver.options.type === "spanner"
                        ? true
                        : false,
                },
            },
        });
        columnMetadata1.build(connection);
        const columnMetadata2 = new ColumnMetadata_1.ColumnMetadata({
            connection: connection,
            entityMetadata: postMetadata,
            args: {
                target: Post_1.Post,
                propertyName: "description",
                mode: "regular",
                options: {
                    type: stringType,
                    name: "description",
                    length: 100,
                    nullable: connection.driver.options.type === "spanner"
                        ? true
                        : false,
                },
            },
        });
        columnMetadata2.build(connection);
        postMetadata.columns.push(...[columnMetadata1, columnMetadata2]);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        const column1 = table.findColumnByName("secondId");
        column1.should.be.exist;
        if (connection.driver.options.type === "spanner") {
            column1.isNullable.should.be.true;
        }
        else {
            column1.isNullable.should.be.false;
        }
        const column2 = table.findColumnByName("description");
        column2.should.be.exist;
        column2.length.should.be.equal("100");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=add-column.js.map