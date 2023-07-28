"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Bar_1 = require("./entity/Bar");
const Foo_1 = require("./entity/Foo");
describe("github issues > #2251 - Unexpected behavior when passing duplicate entities to repository.save()", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update all entities", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Bar_1.Bar);
        await repo.save([
            { description: "test1" },
            { description: "test2" },
        ]);
        let bars = await repo.find();
        await repo.save([
            { id: 1, description: "test1a" },
            { id: 2, description: "test2a" },
            { id: 1, description: "test1a" },
            { id: 2, description: "test2a" },
        ]);
        bars = await repo.find();
        (0, chai_1.expect)(bars.length).to.equal(2);
    })));
    it("should handle cascade updates", () => Promise.all(connections.map(async (connection) => {
        const barRepo = connection.getRepository(Bar_1.Bar);
        const fooRepo = connection.getRepository(Foo_1.Foo);
        await fooRepo.save({
            bars: [
                { description: "test2a" },
                { description: "test2b" },
            ],
        });
        await fooRepo.save({
            id: 1,
            bars: [
                { id: 1, description: "test2a-1" },
                { description: "test2c" },
                { id: 1, description: "test2a-2" },
            ],
        });
        const bars = await barRepo.find();
        // We saved two bars originally. The above save should update the description of one,
        // remove the reference of another and insert a 3rd.
        (0, chai_1.expect)(bars.length).to.equal(3);
        const bar = await barRepo.findOneBy({ id: 1 });
        (0, chai_1.expect)(bar).not.to.be.null;
        // Did not observe the same behavior with unwanted inserts. Current behavior is
        // that the first duplicate goes through and the rest are ignored.
        (0, chai_1.expect)(bar.description).to.equal("test2a-1");
    })));
});
//# sourceMappingURL=issue-2251.js.map