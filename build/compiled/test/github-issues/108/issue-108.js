"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #108 Error with constraint names on postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should sync even when there unqiue constraints placed on similarly named columns", () => Promise.all(connections.map(async (connection) => {
        // By virtue that we got here means that it must have worked.
        (0, chai_1.expect)(true).is.true;
    })));
});
//# sourceMappingURL=issue-108.js.map