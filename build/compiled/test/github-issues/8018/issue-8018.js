"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Child_1 = require("./entity/Child");
const Grandchild_1 = require("./entity/Grandchild");
const Parent_1 = require("./entity/Parent");
describe("github issues > #8018 Non-unique relation property names causes entity mixup in query results", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Parent_1.Parent, Child_1.Child, Grandchild_1.Grandchild],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(async () => await (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create child entities of the correct type", async () => await Promise.all(connections.map(async (connection) => {
        const parent = new Parent_1.Parent();
        parent.name = "parent";
        const child1 = new Child_1.Child();
        child1.name = "child1";
        child1.parent = parent;
        const child2 = new Child_1.Child();
        child2.name = "child2";
        child2.parent = parent;
        await connection.manager.save([parent, child1, child2]);
        const result = await connection.manager.find(Parent_1.Parent, {
            relations: { children: true },
        });
        (0, chai_1.expect)(result).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].children).to.have.lengthOf(2);
        (0, chai_1.expect)(result[0].children[0]).to.be.instanceOf(Child_1.Child);
        (0, chai_1.expect)(result[0].children[1]).to.be.instanceOf(Child_1.Child);
    })));
});
//# sourceMappingURL=issue-8018.js.map