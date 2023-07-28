"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Foo_1 = require("./entity/Foo");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #3534: store regexp", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("allows entities with regexp columns", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Foo_1.Foo);
        const foo = new Foo_1.Foo();
        foo.bar = /foo/i;
        const savedFoo = await repository.save(foo);
        (0, chai_1.expect)(savedFoo.bar).to.instanceOf(RegExp);
        (0, chai_1.expect)(savedFoo.bar.toString()).to.eq(/foo/i.toString());
        const storedFoo = await repository.findOneByOrFail({
            id: foo.id,
        });
        (0, chai_1.expect)(storedFoo.bar).to.instanceOf(RegExp);
        (0, chai_1.expect)(storedFoo.bar.toString()).to.eq(/foo/i.toString());
    })));
});
//# sourceMappingURL=issue-3534.js.map