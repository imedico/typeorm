"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Bar_1 = require("./entity/Bar");
const Foo_1 = require("./entity/Foo");
// TODO: this test was broken after removing primary: true from relation decorators
//  due to complexity of cascades, it was skipped fow now
describe.skip("github issues > #7002 cascade save fails if the child entity has CreateDateColumn and PK as JoinColumn", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mysql", "postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("save an entity having a child entity with shared PK and CreatedDateColumn by cascade", () => Promise.all(connections.map(async (connection) => {
        const foo = new Foo_1.Foo();
        foo.text = "This is a feature post";
        await connection.manager.save(connection.getRepository(Bar_1.Bar).create({
            title: "Feature Post",
            foo,
        }));
    })));
});
//# sourceMappingURL=issue-7002.js.map