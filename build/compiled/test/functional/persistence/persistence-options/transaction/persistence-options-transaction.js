"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const chai_1 = require("chai");
describe("persistence > persistence options > transaction", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should disable transaction when option is specified", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Bakhrom";
        post.description = "Hello";
        const queryRunner = connection.createQueryRunner();
        const startTransactionFn = sinon_1.default.spy(queryRunner, "startTransaction");
        const commitTransactionFn = sinon_1.default.spy(queryRunner, "commitTransaction");
        await connection
            .createEntityManager(queryRunner)
            .getRepository(Post_1.Post)
            .save(post, { transaction: false });
        (0, chai_1.expect)(startTransactionFn.called).to.be.false;
        (0, chai_1.expect)(commitTransactionFn.called).to.be.false;
        // Cleanup
        await queryRunner.release();
        sinon_1.default.restore();
    })));
    it("should disable transaction when the drivers transactionSupport setting equals `none`", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Bakhrom";
        post.description = "Hello";
        // Storing initial driver setting of the `transactionSupport` property
        // in order to be able to restore it later
        const transactionSupportInitial = connection.driver.transactionSupport;
        connection.driver.transactionSupport = "none";
        const queryRunner = connection.createQueryRunner();
        const startTransactionFn = sinon_1.default.spy(queryRunner, "startTransaction");
        const commitTransactionFn = sinon_1.default.spy(queryRunner, "commitTransaction");
        await connection
            .createEntityManager(queryRunner)
            .getRepository(Post_1.Post)
            .save(post);
        (0, chai_1.expect)(startTransactionFn.called).to.be.false;
        (0, chai_1.expect)(commitTransactionFn.called).to.be.false;
        // Cleanup
        await queryRunner.release();
        sinon_1.default.restore();
        connection.driver.transactionSupport = transactionSupportInitial;
    })));
});
//# sourceMappingURL=persistence-options-transaction.js.map