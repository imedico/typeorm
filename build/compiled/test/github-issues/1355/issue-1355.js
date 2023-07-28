"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
describe("github issues > #1355 Allow explicitly named primary keys, foreign keys, and indices", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => {
        return (0, test_utils_1.reloadTestingDatabases)(connections);
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set foreign keys their names to given names", () => Promise.all(connections.map(async (connection) => {
        await connection.getRepository(Animal_1.Animal).find();
        let metadata = connection.getMetadata(Animal_1.Animal);
        const joinTable = metadata.ownRelations[0];
        (0, chai_1.expect)(joinTable.foreignKeys[0].name).to.eq("fk_animal_category_categoryId");
        (0, chai_1.expect)(joinTable.foreignKeys[1].name).to.eq("fk_animal_category_animalId");
        (0, chai_1.expect)(metadata.foreignKeys[0].name).to.eq("fk_animal_breedId");
    })));
});
//# sourceMappingURL=issue-1355.js.map