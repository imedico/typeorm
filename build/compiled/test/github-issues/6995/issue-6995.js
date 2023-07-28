"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const default_update_date_1 = require("./entity/default-update-date");
describe("github issues > #6995 Generating migrations for UpdateDateColumn should generate on update clause", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        enabledDrivers: ["mysql", "mariadb"],
        schemaCreate: false,
        dropSchema: true,
        entities: [default_update_date_1.DefaultUpdateDate],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create migration with default ON UPDATE clause", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries
            .filter((i) => i.query.includes("ON UPDATE"))
            .length.should.be.greaterThan(0);
    })));
});
//# sourceMappingURL=issue-6995.js.map