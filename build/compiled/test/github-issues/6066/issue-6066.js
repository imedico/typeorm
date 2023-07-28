"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Session_1 = require("./entity/Session");
const chai_1 = require("chai");
describe("github issues > #6066 Column comment string is not escaped during synchronization", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Session_1.Session],
        enabledDrivers: ["mysql", "mariadb"],
        schemaCreate: false,
        dropSchema: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should synchronize", () => Promise.all(connections.map((connection) => {
        return (0, chai_1.expect)(connection.synchronize()).to.not.be.rejectedWith(src_1.QueryFailedError);
    })));
});
//# sourceMappingURL=issue-6066.js.map