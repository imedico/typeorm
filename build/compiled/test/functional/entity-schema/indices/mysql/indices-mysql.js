"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Person_1 = require("./entity/Person");
describe("entity-schema > indices > mysql", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Person_1.PersonSchema],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create SPATIAL and FULLTEXT indices", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        const spatialIndex = table.indices.find((index) => !!index.isSpatial);
        spatialIndex.should.be.exist;
        const fulltextIndex = table.indices.find((index) => !!index.isFulltext);
        fulltextIndex.should.be.exist;
    })));
});
//# sourceMappingURL=indices-mysql.js.map