"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
describe("mssql -> add column to existing table", () => {
    let connections;
    beforeEach(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mssql"],
            entities: [__dirname + "/entity/Post{.js,.ts}"],
        });
        await Promise.all(connections.map(async (connection) => {
            await connection.synchronize(true);
            await connection
                .getRepository("Post")
                .insert({ title: "test" });
            await connection.close();
        }));
    });
    afterEach(async () => {
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    it("should fail to add column", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mssql"],
            entities: [__dirname + "/entity/Post-Fail{.js,.ts}"],
        });
        await Promise.all(connections.map(async (connection) => {
            await connection
                .synchronize()
                .should.eventually.rejectedWith("Error: ALTER TABLE only allows columns to be added that can contain nulls, or have a DEFAULT definition specified, or the column being added is an identity or timestamp column, or alternatively if none of the previous conditions are satisfied the table must be empty to allow addition of this column. Column 'addedField' cannot be added to non-empty table 'post' because it does not satisfy these conditions.");
        }));
    });
    it("should succeed to add column", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mssql"],
            entities: [__dirname + "/entity/Post-Succeed{.js,.ts}"],
        });
        await Promise.all(connections.map(async (connection) => {
            await connection.synchronize().should.eventually.eq(undefined);
            const post = await connection
                .getRepository("Post")
                .findOneByOrFail({
                id: 1,
            });
            post.should.exist;
            post.id.should.be.eq(1);
            post.title.should.be.eq("test");
            post.addedField.should.be.eq("default value");
        }));
    });
});
//# sourceMappingURL=mssql-add-column-with-default-value.js.map