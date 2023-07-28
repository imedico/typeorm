"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Document_1 = require("./entity/Document");
const chai_1 = require("chai");
describe("github issues > #85 - Column option insert: false, update: false", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should ignore value of non-inserted column", () => Promise.all(connections.map(async (connection) => {
        // Skip because test relies on DEFAULT values and Spanner does not support it
        if (connection.driver.options.type === "spanner")
            return;
        const doc1 = new Document_1.Document();
        doc1.id = 1;
        doc1.version = 42;
        await connection.manager.save(doc1);
        const docs = connection.getRepository(Document_1.Document);
        const doc2 = await docs.findOneBy({ id: 1 });
        (0, chai_1.expect)(doc2.version).to.be.equal(1);
    })));
    it("should be able to create an entity with column entirely missing", () => Promise.all(connections.map(async (connection) => {
        // Skip because test relies on DEFAULT values and Spanner does not support it
        if (connection.driver.options.type === "spanner")
            return;
        // We delete the non-inserted column entirely, so that any use of it will throw an error.
        let queryRunner = connection.createQueryRunner();
        await queryRunner.dropColumn("document", "permission");
        await queryRunner.release();
        const doc1 = new Document_1.Document();
        doc1.id = 1;
        await connection.manager.save(doc1);
        const docs = connection.getRepository(Document_1.Document);
        // We got here without throwing an error, which is good news.
        (0, chai_1.expect)(await docs.count()).to.eql(1);
        // And just to confirm that the above test is meaningful, we drop a regular column
        // and see that creating an entity does throw an error.
        queryRunner = connection.createQueryRunner();
        await queryRunner.dropColumn("document", "name");
        await queryRunner.release();
        const doc2 = new Document_1.Document();
        doc2.id = 2;
        return connection.manager.save(doc2).should.be.rejected;
    })));
});
//# sourceMappingURL=issue-85.js.map