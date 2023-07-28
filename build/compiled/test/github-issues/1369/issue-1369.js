"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const ConcreteEntity_1 = require("./entity/ConcreteEntity");
describe("github issues > #1369 EntitySubscriber not firing events on abstract class entity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should fire the given event for an abstract entity", () => Promise.all(connections.map(async (connection) => {
        const entity = new ConcreteEntity_1.ConcreteEntity();
        entity.firstname = "Michael";
        entity.lastname = "Scott";
        entity.position = "Regional Manager";
        await connection.manager.save(entity);
        const foundEntity = await connection.manager.findOne(ConcreteEntity_1.ConcreteEntity, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(foundEntity).to.not.be.undefined;
        const assertObject = Object.assign({}, foundEntity);
        assertObject.should.be.eql({
            id: 1,
            firstname: "Michael",
            lastname: "Scott",
            fullname: "Michael Scott",
            position: "Regional Manager",
        });
    })));
});
//# sourceMappingURL=issue-1369.js.map