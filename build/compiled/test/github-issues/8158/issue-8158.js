"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const UserMeta_1 = require("./entity/UserMeta");
const User_1 = require("./entity/User");
describe("github issues > #8158 Typeorm creates migration that creates already existing unique constraint", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        schemaCreate: false,
        dropSchema: true,
        entities: [UserMeta_1.UserMeta, User_1.User],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should recognize model changes", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.greaterThan(0);
        sqlInMemory.downQueries.length.should.be.greaterThan(0);
    })));
    it("should not generate queries when no model changes", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
        sqlInMemory.downQueries.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=issue-8158.js.map