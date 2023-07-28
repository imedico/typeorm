"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Simple_1 = require("./entity/Simple");
const Complex_1 = require("./entity/Complex");
describe("github issues > #2103 query builder regression", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("whereInIds should respect logical operator precedence > single simple primary key (in is used)", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Simple_1.Simple);
        const savedEntities = await repository.save([
            repository.create({ x: 1 }),
            repository.create({ x: 2 }),
            repository.create({ x: 1 }),
            repository.create({ x: 3 }),
        ]);
        savedEntities.length.should.be.equal(4); // check if they all are saved
        const ids = savedEntities.map((entity) => entity.id);
        const entities = await repository
            .createQueryBuilder("s")
            .whereInIds(ids)
            .andWhere("s.x = 1")
            .addOrderBy("s.id")
            .getMany();
        entities
            .map((entity) => entity.id)
            .should.be.eql(savedEntities
            .filter((entity) => entity.x === 1)
            .map((entity) => entity.id));
    })));
    it("whereInIds should respect logical operator precedence > multiple primary keys", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Complex_1.Complex);
        // sqlite does not support autoincrement for composite primary key, so we pass ids by ourselves here
        const savedEntities = await repository.save([
            repository.create({ id: 1, code: 1, x: 1 }),
            repository.create({ id: 2, code: 1, x: 2 }),
            repository.create({ id: 3, code: 1, x: 1 }),
            repository.create({ id: 4, code: 1, x: 3 }),
        ]);
        savedEntities.length.should.be.equal(4); // check if they all are saved
        const ids = savedEntities.map((entity) => entity.id);
        const entities = await repository
            .createQueryBuilder("s")
            .whereInIds(ids.map((id) => {
            return { id, code: 1 };
        }))
            .andWhere("s.x = 1")
            .addOrderBy("s.id")
            .getMany();
        entities
            .map((entity) => entity.id)
            .should.be.eql(savedEntities
            .filter((entity) => entity.x === 1)
            .map((entity) => entity.id));
    })));
});
//# sourceMappingURL=issue-2103.js.map