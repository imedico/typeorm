"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
describe("github issues > #1863 createTable.uniques doesn't work when the columnNames only has one item", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create table with unique constraint", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createTable(new src_1.Table({
            name: "post",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
            ],
            uniques: [
                {
                    name: "table_unique",
                    columnNames: ["name"],
                },
            ],
        }));
        const table = await queryRunner.getTable("post");
        table.indices.length.should.be.equal(1);
        table.indices[0].name.should.be.equal("table_unique");
    })));
});
//# sourceMappingURL=issue-1863.js.map