"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Question_1 = require("./entity/Question");
const Post_1 = require("./entity/Post");
describe("uuid-mssql", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist uuid correctly when it is generated non primary column", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const questionRepository = connection.getRepository(Question_1.Question);
        const queryRunner = connection.createQueryRunner();
        const postTable = await queryRunner.getTable("post");
        const questionTable = await queryRunner.getTable("question");
        await queryRunner.release();
        const post = new Post_1.Post();
        await postRepository.save(post);
        const loadedPost = await postRepository.findOne({
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedPost.uuid).to.be.exist;
        postTable
            .findColumnByName("uuid")
            .type.should.be.equal("uniqueidentifier");
        const post2 = new Post_1.Post();
        post2.uuid = "FD357B8F-8838-42F6-B7A2-AE027444E895";
        await postRepository.save(post2);
        const loadedPost2 = await postRepository.findOne({
            where: {
                id: 2,
            },
        });
        (0, chai_1.expect)(loadedPost2.uuid).to.equal("FD357B8F-8838-42F6-B7A2-AE027444E895");
        const question = new Question_1.Question();
        const savedQuestion = await questionRepository.save(question);
        const loadedQuestion = await questionRepository.findOne({
            where: {
                id: savedQuestion.id,
            },
        });
        (0, chai_1.expect)(loadedQuestion.id).to.be.exist;
        (0, chai_1.expect)(loadedQuestion.uuid).to.be.exist;
        (0, chai_1.expect)(loadedQuestion.uuid2).to.be.null;
        (0, chai_1.expect)(loadedQuestion.uuid3).to.be.exist;
        questionTable
            .findColumnByName("id")
            .type.should.be.equal("uniqueidentifier");
        questionTable
            .findColumnByName("uuid")
            .type.should.be.equal("uniqueidentifier");
        questionTable
            .findColumnByName("uuid2")
            .type.should.be.equal("uniqueidentifier");
        questionTable
            .findColumnByName("uuid3")
            .type.should.be.equal("uniqueidentifier");
        const question2 = new Question_1.Question();
        question2.id = "1ECAD7F6-23EE-453E-BB44-16ECA26D5189";
        question2.uuid = "35B44650-B2CD-44EC-AA54-137FBDF1C373";
        question2.uuid2 = null;
        question2.uuid3 = null;
        await questionRepository.save(question2);
        const loadedQuestion2 = await questionRepository.findOne({
            where: {
                id: "1ECAD7F6-23EE-453E-BB44-16ECA26D5189",
            },
        });
        (0, chai_1.expect)(loadedQuestion2.id).to.equal("1ECAD7F6-23EE-453E-BB44-16ECA26D5189");
        (0, chai_1.expect)(loadedQuestion2.uuid).to.equal("35B44650-B2CD-44EC-AA54-137FBDF1C373");
        (0, chai_1.expect)(loadedQuestion2.uuid2).to.be.null;
        (0, chai_1.expect)(loadedQuestion2.uuid3).to.be.null;
    })));
});
//# sourceMappingURL=uuid-mssql.js.map