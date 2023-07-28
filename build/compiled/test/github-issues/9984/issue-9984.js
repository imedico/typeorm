"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Post_js_1 = require("./entity/Post.js");
const chai_1 = require("chai");
describe("github issues > #9984 TransactionRetryWithProtoRefreshError should be handled by TypeORM", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_js_1.Post],
            enabledDrivers: ["cockroachdb"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should retry transaction on 40001 error with 'inject_retry_errors_enabled=true'", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        await dataSource.query("SET inject_retry_errors_enabled = true");
        await queryRunner.startTransaction();
        const post = new Post_js_1.Post();
        post.name = `post`;
        await queryRunner.manager.save(post);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        await dataSource.query("SET inject_retry_errors_enabled = false");
        const loadedPost = await dataSource.manager.findOneBy(Post_js_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost).to.be.not.undefined;
    })));
    it("should retry transaction on 40001 error", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        const post = new Post_js_1.Post();
        post.name = "post";
        await queryRunner.manager.save(post);
        await queryRunner.release();
        const query = async (name) => {
            const queryRunner = dataSource.createQueryRunner();
            await queryRunner.startTransaction();
            const updatedPost = new Post_js_1.Post();
            updatedPost.id = post.id;
            updatedPost.name = name;
            await queryRunner.manager.save(updatedPost);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        };
        await Promise.all([1, 2, 3].map((i) => query(`changed_${i}`)));
        const loadedPost = await dataSource.manager.findOneByOrFail(Post_js_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost.name).to.not.equal("post");
    })));
});
//# sourceMappingURL=issue-9984.js.map