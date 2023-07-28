"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const dummy_1 = require("./entity/dummy");
const dummy2_1 = require("./entity/dummy2");
describe("github issues > #2364 should generate id value if @Column generated:true is set", () => {
    let connections;
    it("should generate id value", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        await Promise.all(connections.map(async (connection) => {
            // Spanner does not support auto-increment columns
            if (connection.driver.options.type === "spanner")
                return;
            const repository1 = connection.getRepository(dummy_1.Dummy);
            const repository2 = connection.getRepository(dummy2_1.Dummy2);
            let dummyObj1 = new dummy_1.Dummy();
            let dummyObj2 = new dummy2_1.Dummy2();
            await repository1.insert(dummyObj1);
            await repository2.insert(dummyObj2);
            (0, chai_1.expect)(dummyObj1.id).to.not.be.eq(0);
            (0, chai_1.expect)(dummyObj2.id).to.not.be.eq(0);
        }));
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
});
//# sourceMappingURL=issue-2364.js.map