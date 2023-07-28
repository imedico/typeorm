"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const src_1 = require("../../../src");
describe("github issues > #1510 entity schema does not support mode=objectId", () => {
    const UserEntity = new src_1.EntitySchema({
        name: "User",
        tableName: "test_1510_users",
        columns: {
            _id: {
                type: "int",
                objectId: true,
                primary: true,
                generated: true,
            },
            name: {
                type: String,
            },
        },
    });
    const UserWithoutObjectIdEntity = new src_1.EntitySchema({
        name: "UserWithoutObjectId",
        tableName: "test_1510_users2",
        columns: {
            _id: {
                type: "int",
                primary: true,
                generated: true,
            },
            name: {
                type: String,
            },
        },
    });
    let connections;
    before(async () => {
        return (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [
                __dirname + "/entity/*{.js,.ts}",
                UserEntity,
                UserWithoutObjectIdEntity,
            ],
            enabledDrivers: ["mongodb"],
        }));
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("throws an error because there is no object id defined", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(UserWithoutObjectIdEntity);
        try {
            await repo.insert({
                name: "Dotan",
            });
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (e) {
            (0, chai_1.expect)(e.message).to.contain("createValueMap");
        }
    })));
    it("should create entities without throwing an error when objectId is defined", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(UserEntity);
        const result = await repo.insert({
            name: "Dotan",
        });
        const insertedId = result.identifiers[0];
        (0, chai_1.expect)(insertedId).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-1510.js.map