"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const InsertValuesMissingError_1 = require("../../../src/error/InsertValuesMissingError");
const Test_1 = require("./entity/Test");
describe("github issues > #3111 Inserting with query builder attempts to insert a default row when values is empty array", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not insert with default values on .values([])", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        await repo.createQueryBuilder().insert().values([]).execute();
        const rowsWithDefaultValue = await repo.find({
            where: { value: Test_1.DEFAULT_VALUE },
        });
        (0, chai_1.expect)(rowsWithDefaultValue).to.have.lengthOf(0);
    })));
    it("should still error on missing .values()", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        await repo
            .createQueryBuilder()
            .insert()
            .execute()
            .should.be.rejectedWith(InsertValuesMissingError_1.InsertValuesMissingError);
    })));
});
//# sourceMappingURL=issue-3111.js.map