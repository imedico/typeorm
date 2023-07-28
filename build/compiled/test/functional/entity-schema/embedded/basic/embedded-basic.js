"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("entity-schema > embedded - class-instance", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.UserEntitySchema],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create an table", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("user");
        await queryRunner.release();
        (0, chai_1.expect)(table).exist;
    })));
    it("should not create table with embedded", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("name");
        await queryRunner.release();
        (0, chai_1.expect)(table).not.exist;
    })));
    it("should create embedded column name with prefix", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("user");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("name_First")).exist;
        (0, chai_1.expect)(table.findColumnByName("name_Last")).exist;
    })));
    it("should create index for embedded", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("user");
        await queryRunner.release();
        (0, chai_1.expect)(table.indices.length).to.be.equal(1);
        (0, chai_1.expect)(table.indices[0].columnNames).to.deep.include.members([
            "name_First",
        ]);
    })));
});
//# sourceMappingURL=embedded-basic.js.map