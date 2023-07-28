"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Error_1 = require("./entity/Error");
describe("github issues > #1887 Having problems with UNIQUEIDENTIFIERS", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly insert data", () => Promise.all(connections.map(async (connection) => {
        const errorRepository = connection.getRepository(Error_1.Error);
        const err = new Error_1.Error();
        err.errorDate = new Date();
        err.errorDescription = "test insert error";
        err.errorNumber = 505;
        err.executionGuid = "82E66316-AC4C-4EE2-8F98-66694FA38261";
        await errorRepository.insert(err);
    })));
});
//# sourceMappingURL=issue-1887.js.map