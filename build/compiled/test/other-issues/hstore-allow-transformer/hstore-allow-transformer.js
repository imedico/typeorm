"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const hstore_entity_1 = require("./entity/hstore-entity");
describe("other issues > allow HSTORE column type to use transformers", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should use the transformer set in the column options", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(hstore_entity_1.DummyHSTOREEntity);
        const translation = {
            en_US: "hello",
            fr_FR: "salut",
        };
        const dummy = repository.create({
            translation,
        });
        await repository.save(dummy);
        const dummyEntity = await repository.findOneByOrFail({
            id: dummy.id,
        });
        (0, chai_1.expect)(dummyEntity.translation).to.equal("hello");
    })));
});
//# sourceMappingURL=hstore-allow-transformer.js.map