"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const json_entity_1 = require("./entity/json-entity");
const jsonb_entity_1 = require("./entity/jsonb-entity");
describe("other issues > correctly compute change for transformed json / jsonb columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not update entity if transformed JSON column did not change", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(json_entity_1.DummyJSONEntity);
        const dummy = repository.create({
            value: {
                secretProperty: "hello",
            },
        });
        await repository.save(dummy);
        await repository.save(dummy);
        const dummyEntity = await repository.findOneByOrFail({
            id: dummy.id,
        });
        (0, chai_1.expect)(dummyEntity.version).to.equal(1);
    })));
    it("should not update entity if transformed JSONB column did not change", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(jsonb_entity_1.DummyJSONBEntity);
        const dummy = repository.create({
            value: {
                secretProperty: "hello",
            },
        });
        await repository.save(dummy);
        await repository.save(dummy);
        const dummyEntity = await repository.findOneByOrFail({
            id: dummy.id,
        });
        (0, chai_1.expect)(dummyEntity.version).to.equal(1);
    })));
});
//# sourceMappingURL=transformed-json-column-update-compute.js.map