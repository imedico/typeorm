"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const EntityManager_1 = require("../../../src/entity-manager/EntityManager");
const test_utils_1 = require("../../utils/test-utils");
const ChildEntity_1 = require("./entity/ChildEntity");
const ParentEntity_1 = require("./entity/ParentEntity");
describe("github issues > #6815 RelationId() on nullable relation returns 'null' string", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: [
            "cockroachdb",
            "mariadb",
            "mssql",
            "mysql",
            "postgres",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return null as childId if child doesn't exist", () => Promise.all(connections.map(async (connection) => {
        const em = new EntityManager_1.EntityManager(connection);
        const parent = em.create(ParentEntity_1.ParentEntity);
        await em.save(parent);
        const loaded = await em.findOneOrFail(ParentEntity_1.ParentEntity, {
            where: {
                id: parent.id,
            },
        });
        (0, chai_1.expect)(loaded.childId).to.be.null;
    })));
    it("should return string as childId if child exists", () => Promise.all(connections.map(async (connection) => {
        const em = new EntityManager_1.EntityManager(connection);
        const child = em.create(ChildEntity_1.ChildEntity);
        await em.save(child);
        const parent = em.create(ParentEntity_1.ParentEntity);
        parent.child = child;
        await em.save(parent);
        const loaded = await em.findOneOrFail(ParentEntity_1.ParentEntity, {
            where: {
                id: parent.id,
            },
        });
        if (connection.name === "cockroachdb") {
            // CockroachDB returns id as a number.
            (0, chai_1.expect)(loaded.childId).to.equal(child.id.toString());
        }
        else {
            (0, chai_1.expect)(loaded.childId).to.equal(child.id);
        }
    })));
});
//# sourceMappingURL=issue-6815.js.map