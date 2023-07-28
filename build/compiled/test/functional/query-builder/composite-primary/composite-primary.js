"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
const Bar_1 = require("./entity/Bar");
const chai_1 = require("chai");
describe("query builder > composite primary", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Foo_1.Foo, Bar_1.Bar],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should find entity by another entity with a composite key", () => Promise.all(connections.map(async (connection) => {
        const foo = new Foo_1.Foo();
        foo.id1 = 1;
        foo.id2 = 2;
        await connection.manager.save(foo);
        const bar = new Bar_1.Bar();
        bar.id = 1;
        bar.foo = foo;
        await connection.manager.save(bar);
        const loadedBar = await connection.manager
            .getRepository(Bar_1.Bar)
            .findOne({
            where: {
                foo,
            },
        });
        (0, chai_1.expect)(loadedBar.id).to.be.equal(bar.id);
    })));
});
//# sourceMappingURL=composite-primary.js.map