"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Parent_1 = require("./entity/Parent");
const Child_1 = require("./entity/Child");
const xfail_1 = require("../../utils/xfail");
const chai_1 = require("chai");
describe("github issues > #3105 Error with cascading saves using EntityManager in a transaction", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    xfail_1.xfail
        .unless(() => connections.length > 0)
        .it("error with cascading saves using EntityManager in a transaction", () => Promise.all(connections.map(async function (connection) {
        let findChildOne;
        let findChildTwo;
        await (0, chai_1.expect)(connection.manager.transaction(async (transactionalEntityManager) => {
            const parent = new Parent_1.Parent();
            parent.children = [
                new Child_1.Child(1),
                new Child_1.Child(2),
            ];
            let newParent = await transactionalEntityManager.save(parent);
            newParent.children = [
                new Child_1.Child(4),
                new Child_1.Child(5),
            ];
            newParent =
                await transactionalEntityManager.save(parent);
            // Check that the correct children are persisted with the parent.
            findChildOne = newParent.children.find((child) => {
                return child.data === 4;
            });
            findChildTwo = newParent.children.find((child) => {
                return child.data === 5;
            });
        })).not.to.be.rejected;
        (0, chai_1.expect)(findChildOne).to.not.be.undefined;
        (0, chai_1.expect)(findChildTwo).to.not.be.undefined;
    })));
});
//# sourceMappingURL=issue-3105.js.map