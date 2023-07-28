"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const TestCreate_1 = require("./entity/TestCreate");
describe("entity-metadata > create", () => {
    describe("without entitySkipConstructor", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["sqlite"],
            entities: [TestCreate_1.TestCreate],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should call the constructor when creating an object", () => Promise.all(connections.map(async (connection) => {
            const entity = connection.manager.create(TestCreate_1.TestCreate);
            (0, chai_1.expect)(entity.hasCalledConstructor).to.be.true;
        })));
        it("should set the default property values", () => Promise.all(connections.map(async (connection) => {
            const entity = connection.manager.create(TestCreate_1.TestCreate);
            (0, chai_1.expect)(entity.foo).to.be.equal("bar");
        })));
        it("should call the constructor when retrieving an object", () => Promise.all(connections.map(async (connection) => {
            const repo = connection.manager.getRepository(TestCreate_1.TestCreate);
            const { id } = await repo.save({ foo: "baz" });
            const entity = await repo.findOneByOrFail({ id });
            (0, chai_1.expect)(entity.hasCalledConstructor).to.be.true;
        })));
    });
    describe("with entitySkipConstructor", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["sqlite"],
            entities: [TestCreate_1.TestCreate],
            driverSpecific: {
                entitySkipConstructor: true,
            },
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should call the constructor when creating an object", () => Promise.all(connections.map(async (connection) => {
            const entity = connection.manager.create(TestCreate_1.TestCreate);
            (0, chai_1.expect)(entity.hasCalledConstructor).to.be.true;
        })));
        it("should set the default property values when creating an object", () => Promise.all(connections.map(async (connection) => {
            const entity = connection.manager.create(TestCreate_1.TestCreate);
            (0, chai_1.expect)(entity.foo).to.be.equal("bar");
        })));
        it("should not call the constructor when retrieving an object", () => Promise.all(connections.map(async (connection) => {
            const repo = connection.manager.getRepository(TestCreate_1.TestCreate);
            const { id } = await repo.save({ foo: "baz" });
            const entity = await repo.findOneByOrFail({ id });
            (0, chai_1.expect)(entity.hasCalledConstructor).not.to.be.true;
        })));
    });
});
//# sourceMappingURL=entity-metadata-create.js.map