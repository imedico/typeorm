"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Parent_1 = require("./entity/Parent");
const Child_1 = require("./entity/Child");
const chai_1 = require("chai");
describe("github issues > #1055 ind with relations not working, correct syntax causes type error", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"], // only one driver is enabled because this example uses lazy relations
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to find by object reference", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.manager;
        const parent = new Parent_1.Parent();
        parent.name = "Parent";
        await manager.save(parent);
        const loadedParent = await manager.findOne(Parent_1.Parent, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedParent).not.to.be.null;
        if (!loadedParent)
            return;
        const child = connection.manager.create(Child_1.Child, {
            // use alternative way of creating (to fix #1180 at the same time as well)
            name: "Child",
            parent: loadedParent,
        });
        await manager.save(child);
        // console.log("loadedParent", loadedParent)
        const foundChild = await manager.findOne(Child_1.Child, {
            where: {
                parent: {
                    id: loadedParent.id,
                    name: loadedParent.name,
                },
            },
        });
        (0, chai_1.expect)(foundChild).not.to.be.null;
    })));
    it("should not have type errors with the primary key type", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.manager;
        const parent = new Parent_1.Parent();
        parent.name = "Parent";
        await manager.save(parent);
        const loadedParent = await manager.findOne(Parent_1.Parent, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedParent).not.to.be.null;
        if (!loadedParent)
            return;
        const child = new Child_1.Child();
        child.name = "Child";
        child.parent = Promise.resolve(loadedParent);
        await manager.save(child);
        const foundChild = await manager.findOneBy(Child_1.Child, {
            parent: {
                id: loadedParent.id,
            },
        });
        (0, chai_1.expect)(foundChild).not.to.be.null;
    })));
});
//# sourceMappingURL=issue-1055.js.map