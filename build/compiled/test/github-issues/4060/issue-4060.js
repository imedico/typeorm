"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
const Bar_1 = require("./entity/Bar");
describe("github issues > #4060 Fail to insert entity with Buffer type of primary column under some circumstances.", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql", "mariadb"],
            entities: [Foo_1.Foo, Bar_1.Bar],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entities", () => Promise.all(connections.map(async (connection) => {
        const id = Buffer.from("foobar");
        const foo = new Foo_1.Foo();
        foo.id = id;
        foo.name = "foo";
        await connection.manager.save(foo);
        const bar = new Bar_1.Bar();
        bar.id = id;
        bar.name = "bar";
        await connection.manager.save(bar);
        (0, chai_1.expect)(foo).to.exist;
        (0, chai_1.expect)(bar).to.exist;
    })));
});
//# sourceMappingURL=issue-4060.js.map