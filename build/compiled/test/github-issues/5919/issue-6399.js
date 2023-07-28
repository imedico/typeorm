"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const test_utils_1 = require("../../utils/test-utils");
const entities_1 = require("./entities");
describe("github issues > #5919 Caching won't work with replication enabled", () => {
    let connections;
    beforeEach(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [entities_1.Comment],
            schemaCreate: true,
            dropSchema: true,
            cache: true,
            enabledDrivers: ["postgres"],
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
    });
    afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not another queryRunner for cache with a given masterQueryRunner", () => Promise.all(connections.map(async (connection) => {
        const comment1 = new entities_1.Comment();
        comment1.text = "tata";
        await connection.manager.save(comment1);
        const masterQueryRunner = connection.createQueryRunner("master");
        const createQueryRunnerSpy = sinon_1.default.spy(connection, "createQueryRunner");
        const results1 = await connection
            .createQueryBuilder()
            .from(entities_1.Comment, "c")
            .cache(true)
            .setQueryRunner(masterQueryRunner)
            .getRawMany();
        (0, chai_1.expect)(results1.length).eq(1);
        (0, chai_1.expect)(createQueryRunnerSpy.notCalled);
        // add another one and ensure cache works
        const comment2 = new entities_1.Comment();
        comment2.text = "tata";
        await connection.manager.save(comment2);
        const results2 = await connection
            .createQueryBuilder()
            .from(entities_1.Comment, "c")
            .cache(true)
            .setQueryRunner(masterQueryRunner)
            .getRawMany();
        (0, chai_1.expect)(results2.length).eq(1);
    })));
    it("should create another queryRunner for cache with a given slaveQueryRunner", () => Promise.all(connections.map(async (connection) => {
        const comment1 = new entities_1.Comment();
        comment1.text = "tata";
        await connection.manager.save(comment1);
        const slaveQueryRunner = connection.createQueryRunner("slave");
        const createQueryRunnerSpy = sinon_1.default.spy(connection, "createQueryRunner");
        const results1 = await connection
            .createQueryBuilder()
            .from(entities_1.Comment, "c")
            .cache(true)
            .setQueryRunner(slaveQueryRunner)
            .getRawMany();
        (0, chai_1.expect)(results1.length).eq(1);
        (0, chai_1.expect)(createQueryRunnerSpy.calledOnce);
        // add another one and ensure cache works
        const comment2 = new entities_1.Comment();
        comment2.text = "tata";
        await connection.manager.save(comment2);
        const results2 = await connection
            .createQueryBuilder()
            .from(entities_1.Comment, "c")
            .cache(true)
            .setQueryRunner(slaveQueryRunner)
            .getRawMany();
        (0, chai_1.expect)(results2.length).eq(1);
    })));
});
//# sourceMappingURL=issue-6399.js.map