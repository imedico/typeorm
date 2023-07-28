"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("../../functional/query-builder/update/entity/User");
const EntityPropertyNotFoundError_1 = require("../../../src/error/EntityPropertyNotFoundError");
describe("github issues > #3416 Unknown fields are stripped from WHERE clause", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("should throw FindCriteriaNotFoundError when supplying unknown property in where criteria", () => {
        it("find", () => Promise.all(connections.map(async (connection) => {
            let error;
            try {
                await connection.manager.findOneBy(User_1.User, {
                    // @ts-expect-error
                    unknownProp: "John Doe",
                });
            }
            catch (err) {
                error = err;
            }
            (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
        })));
        it("update", () => Promise.all(connections.map(async (connection) => {
            let error;
            try {
                await connection.manager.update(User_1.User, { unknownProp: "Something" }, { name: "John doe " });
            }
            catch (err) {
                error = err;
            }
            (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
        })));
        it("delete", () => Promise.all(connections.map(async (connection) => {
            let error;
            try {
                await connection.manager.delete(User_1.User, {
                    unknownProp: "Something",
                });
            }
            catch (err) {
                error = err;
            }
            (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
        })));
    });
});
//# sourceMappingURL=issue-3416.js.map