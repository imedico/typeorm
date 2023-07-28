"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
const src_1 = require("../../../src");
const chai_1 = require("chai");
describe("github issues > #2464 - ManyToMany onDelete option not working", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not delete when onDelete is 'NO ACTION'", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Foo_1.Foo);
        await repo.save({ id: 1, bars: [{ description: "test1" }] });
        try {
            await repo.delete(1);
            chai_1.expect.fail();
        }
        catch (e) {
            e.should.be.instanceOf(src_1.QueryFailedError);
        }
    })));
    it("should delete when onDelete is not set", () => Promise.all(connections.map(async (connection) => {
        // Spanner support only NO ACTION clause
        if (connection.driver.options.type === "spanner")
            return;
        const repo = connection.getRepository(Foo_1.Foo);
        await repo.save({
            id: 1,
            otherBars: [{ description: "test1" }],
        });
        await repo.delete(1);
        const foo = await repo.findOneBy({ id: 1 });
        (0, chai_1.expect)(foo).to.be.null;
    })));
});
//# sourceMappingURL=issue-2464.js.map