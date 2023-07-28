"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1139 mysql primary generated uuid ER_TOO_LONG_KEY", () => {
    let connections;
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("correctly create primary generated uuid column", async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
        schemaCreate: true,
        dropSchema: true,
    })));
});
//# sourceMappingURL=issue-1139.js.map