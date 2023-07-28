"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1758 Synchronization bug in PostgreSQL bug occurs when we explicitly state the default schema as 'public'", () => {
    describe("postgres, cockroachdb", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [__dirname + "/entity/*{.js,.ts}"],
                enabledDrivers: ["postgres", "cockroachdb"],
                schema: "public",
                schemaCreate: true,
                dropSchema: true,
            });
        });
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly synchronize schema when we explicitly state the default schema as 'public'", () => Promise.all(connections.map(async (connection) => {
            await connection.synchronize();
        })));
    });
    describe("mssql", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [__dirname + "/entity/*{.js,.ts}"],
                enabledDrivers: ["mssql"],
                schema: "dbo",
                schemaCreate: true,
                dropSchema: true,
            });
        });
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly synchronize schema when we explicitly state the default schema as 'public'", () => Promise.all(connections.map(async (connection) => {
            await connection.synchronize();
        })));
    });
});
//# sourceMappingURL=issue-1758.js.map