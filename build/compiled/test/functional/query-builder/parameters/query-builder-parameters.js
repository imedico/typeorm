"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Example_1 = require("./entity/Example");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
describe("query builder > parameters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Example_1.Example],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should replace basic parameters when executing", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Example_1.Example);
        await repo.save({ id: "bar" });
        const example = await repo
            .createQueryBuilder()
            .setParameter("foo", "bar")
            .where("example.id = :foo")
            .getOne();
        (0, chai_1.expect)(example === null || example === void 0 ? void 0 : example.id).to.be.equal("bar");
    })));
    it("should prevent invalid characters from being used as identifiers", () => Promise.all(connections.map(async (connection) => {
        const b = connection.createQueryBuilder();
        (0, chai_1.expect)(() => b.setParameter(":foo", "bar")).to.throw();
        (0, chai_1.expect)(() => b.setParameter("@foo", "bar")).to.throw();
        (0, chai_1.expect)(() => b.setParameter("😋", "bar")).to.throw();
        (0, chai_1.expect)(() => b.setParameter("foo bar", "bar")).to.throw();
    })));
    it("should allow periods in parameters", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Example_1.Example);
        await repo.save({ id: "bar" });
        const example = await repo
            .createQueryBuilder()
            .setParameter("f.o.o", "bar")
            .where("example.id = :f.o.o")
            .getOne();
        (0, chai_1.expect)(example === null || example === void 0 ? void 0 : example.id).to.be.equal("bar");
    })));
});
//# sourceMappingURL=query-builder-parameters.js.map