"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TestEntity_1 = require("./entity/TestEntity");
const chai_1 = require("chai");
describe("github issues > #1014 Transaction doesn't rollback", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should rollback transaction if some operation failed in it", () => Promise.all(connections.map(async (connection) => {
        const testEntity = new TestEntity_1.TestEntity();
        testEntity.name = "Hello Test";
        await connection.manager.save(testEntity, { reload: true });
        let error;
        try {
            await connection.transaction(async (manager) => {
                await manager.remove(testEntity);
                throw new Error();
            });
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.instanceof(Error);
        const loadedTestEntity = await connection.manager.findOneBy(TestEntity_1.TestEntity, {
            id: 1,
        });
        (0, chai_1.expect)(loadedTestEntity).not.to.be.null;
        loadedTestEntity.should.be.eql({ id: 1, name: "Hello Test" });
    })));
});
//# sourceMappingURL=issue-1014.js.map