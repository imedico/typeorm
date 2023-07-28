"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Example_1 = require("./entity/Example");
const ExampleText_1 = require("./entity/ExampleText");
describe("github issues > #7882  .findOne reduces relations to an empty array", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["sqlite"],
            entities: [Example_1.Example, ExampleText_1.ExampleText],
            schemaCreate: false,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should delete all documents related to search pattern", () => Promise.all(connections.map(async (connection) => {
        const relations = { exampleText: true };
        const repo = connection.getRepository(Example_1.Example);
        await repo.find({ relations });
        (0, chai_1.expect)(relations).to.be.eql({ exampleText: true });
    })));
});
//# sourceMappingURL=issue-7882.js.map