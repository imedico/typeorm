"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const Question_1 = require("./entity/Question");
describe("github issues > #778 TypeORM is ignoring the `type` field when set on a PrimaryGeneratedColumn", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly parse type from PrimaryGeneratedColumn options", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postTable = await queryRunner.getTable("post");
        const categoryTable = await queryRunner.getTable("category");
        const questionTable = await queryRunner.getTable("question");
        await queryRunner.release();
        const post = new Post_1.Post();
        post.name = "Post #1";
        await connection.getRepository(Post_1.Post).save(post);
        const category = new Category_1.Category();
        category.name = "Category #1";
        await connection.getRepository(Category_1.Category).save(category);
        const question = new Question_1.Question();
        question.name = "Question #1";
        await connection.getRepository(Question_1.Question).save(question);
        postTable
            .findColumnByName("id")
            .type.should.be.equal("integer");
        categoryTable
            .findColumnByName("id")
            .type.should.be.equal("bigint");
        questionTable
            .findColumnByName("id")
            .type.should.be.equal("smallint");
    })));
});
//# sourceMappingURL=issue-778.js.map