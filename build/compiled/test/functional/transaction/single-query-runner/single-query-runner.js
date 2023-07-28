"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const PostRepository_1 = require("./repository/PostRepository");
describe("transaction > single query runner", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should execute all operations in the method in a transaction", () => Promise.all(connections.map(async (connection) => {
        return connection.transaction(async (transactionalEntityManager) => {
            const originalQueryRunner = transactionalEntityManager.queryRunner;
            (0, chai_1.expect)(originalQueryRunner).to.exist;
            (0, chai_1.expect)(transactionalEntityManager.getRepository(Post_1.Post)
                .queryRunner).to.exist;
            transactionalEntityManager
                .getRepository(Post_1.Post)
                .queryRunner.should.be.equal(originalQueryRunner);
            transactionalEntityManager
                .getRepository(Post_1.Post)
                .manager.should.be.equal(transactionalEntityManager);
            transactionalEntityManager
                .getCustomRepository(PostRepository_1.PostRepository)
                .getManager()
                .should.be.equal(transactionalEntityManager);
        });
    })));
    it("should execute all operations in the method in a transaction (#804)", () => Promise.all(connections.map(async (connection) => {
        const entityManager = connection.createQueryRunner().manager;
        entityManager.should.not.be.equal(connection.manager);
        entityManager.queryRunner.should.be.equal(entityManager.queryRunner);
        await entityManager.save(new Post_1.Post(undefined, "Hello World"));
        await entityManager.queryRunner.startTransaction();
        const loadedPost1 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost1).to.be.eql({ id: 1, title: "Hello World" });
        await entityManager.remove(loadedPost1);
        const loadedPost2 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost2).to.be.null;
        await entityManager.queryRunner.rollbackTransaction();
        const loadedPost3 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost3).to.be.eql({ id: 1, title: "Hello World" });
        await entityManager.queryRunner.startTransaction();
        const loadedPost4 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost4).to.be.eql({ id: 1, title: "Hello World" });
        // in Spanner DELETE must have a WHERE clause
        if (connection.driver.options.type === "spanner") {
            await entityManager.query(`DELETE FROM ${connection.driver.escape("post")} WHERE true`);
        }
        else {
            await entityManager.query(`DELETE FROM ${connection.driver.escape("post")}`);
        }
        const loadedPost5 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost5).to.be.null;
        await entityManager.queryRunner.rollbackTransaction();
        const loadedPost6 = await entityManager.findOneBy(Post_1.Post, {
            title: "Hello World",
        });
        (0, chai_1.expect)(loadedPost6).to.be.eql({ id: 1, title: "Hello World" });
        await entityManager.queryRunner.release();
    })));
});
//# sourceMappingURL=single-query-runner.js.map