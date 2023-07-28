"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const test_1 = require("./entity/test");
describe("github issues > #6833 Entities with JSON key columns are incorrectly grouped", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [test_1.JSONBKeyTest],
        dropSchema: true,
        schemaCreate: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("jsonB keys are correctly resolved", () => Promise.all(connections.map(async (connection) => {
        await connection.transaction(async (manager) => {
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 1, second: 2 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 1, second: 3 },
            }));
            const entities = await manager
                .createQueryBuilder(test_1.JSONBKeyTest, "json_test")
                .select()
                .getMany();
            (0, chai_1.expect)(entities.length).to.equal(2);
        });
    })));
    it("jsonB keys can be found", () => Promise.all(connections.map(async (connection) => {
        await connection.transaction(async (manager) => {
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 3, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 4, second: 3 },
            }));
            const entities = await manager.find(test_1.JSONBKeyTest, {
                where: { id: { first: 3, second: 3 } },
            });
            (0, chai_1.expect)(entities.length).to.equal(1);
            (0, chai_1.expect)(entities[0].id).to.deep.equal({
                first: 3,
                second: 3,
            });
        });
    })));
    it("jsonB keys can be found with IN", () => Promise.all(connections.map(async (connection) => {
        await connection.transaction(async (manager) => {
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 3, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 4, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 5, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 6, second: 4 },
            }));
            const entities = await manager
                .createQueryBuilder(test_1.JSONBKeyTest, "json_test")
                .select()
                .where("id IN (:...ids)", {
                ids: [
                    { first: 5, second: 3 },
                    { first: 6, second: 4 },
                ],
            })
                .getMany();
            (0, chai_1.expect)(entities.length).to.equal(2);
            (0, chai_1.expect)(entities[0].id).to.deep.equal({
                first: 5,
                second: 3,
            });
            (0, chai_1.expect)(entities[1].id).to.deep.equal({
                first: 6,
                second: 4,
            });
        });
    })));
    it("jsonB keys can be found regardless of order", () => Promise.all(connections.map(async (connection) => {
        await connection.transaction(async (manager) => {
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 3, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 4, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 5, second: 3 },
            }));
            await manager.save(manager.create(test_1.JSONBKeyTest, {
                id: { first: 6, second: 4 },
            }));
            const payload = { second: 2, first: 1 };
            await manager.save(manager.create(test_1.JSONBKeyTest, { id: payload }));
            const entities = await manager.find(test_1.JSONBKeyTest, {
                where: { id: payload },
            });
            (0, chai_1.expect)(entities.length).to.equal(1);
            (0, chai_1.expect)(entities[0].id).to.deep.equal({
                first: 1,
                second: 2,
            });
            const entitiesOtherOrder = await manager.find(test_1.JSONBKeyTest, { where: { id: { first: 1, second: 2 } } });
            (0, chai_1.expect)(entitiesOtherOrder.length).to.equal(1);
            (0, chai_1.expect)(entitiesOtherOrder[0].id).to.deep.equal({
                first: 1,
                second: 2,
            });
        });
    })));
});
//# sourceMappingURL=issue-6833.js.map