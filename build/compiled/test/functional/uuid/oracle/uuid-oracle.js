"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Question_1 = require("./entity/Question");
describe("uuid-oracle", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["oracle"],
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
        const loadedPost = await postRepository.findOneBy({ id: 1 });
        (0, chai_1.expect)(loadedPost.uuid).to.be.exist;
        postTable
            .findColumnByName("uuid")
            .type.should.be.equal("varchar2");
        const post2 = new Post_1.Post();
        post2.uuid = "fd357b8f-8838-42f6-b7a2-ae027444e895";
        await postRepository.save(post2);
        const loadedPost2 = await postRepository.findOneBy({ id: 2 });
        (0, chai_1.expect)(loadedPost2.uuid).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
        const question = new Question_1.Question();
        question.uuid2 = "fd357b8f-8838-42f6-b7a2-ae027444e895";
        const savedQuestion = await questionRepository.save(question);
        const loadedQuestion = await questionRepository.findOne({
            where: {
                id: savedQuestion.id,
            },
        });
        (0, chai_1.expect)(loadedQuestion.id).to.be.exist;
        (0, chai_1.expect)(loadedQuestion.uuid).to.be.exist;
        (0, chai_1.expect)(loadedQuestion.uuid2).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
        (0, chai_1.expect)(loadedQuestion.uuid3).to.be.null;
        (0, chai_1.expect)(loadedQuestion.uuid4).to.be.exist;
        questionTable
            .findColumnByName("id")
            .type.should.be.equal("varchar2");
        questionTable
            .findColumnByName("uuid")
            .type.should.be.equal("varchar2");
        questionTable
            .findColumnByName("uuid2")
            .type.should.be.equal("varchar2");
        questionTable
            .findColumnByName("uuid3")
            .type.should.be.equal("varchar2");
        const question2 = new Question_1.Question();
        question2.id = "1ecad7f6-23ee-453e-bb44-16eca26d5189";
        question2.uuid = "35b44650-b2cd-44ec-aa54-137fbdf1c373";
        question2.uuid2 = "fd357b8f-8838-42f6-b7a2-ae027444e895";
        question2.uuid3 = null;
        question2.uuid4 = null;
        await questionRepository.save(question2);
        const loadedQuestion2 = await questionRepository.findOne({
            where: {
                id: "1ecad7f6-23ee-453e-bb44-16eca26d5189",
            },
        });
        (0, chai_1.expect)(loadedQuestion2.id).to.equal("1ecad7f6-23ee-453e-bb44-16eca26d5189");
        (0, chai_1.expect)(loadedQuestion2.uuid).to.equal("35b44650-b2cd-44ec-aa54-137fbdf1c373");
        (0, chai_1.expect)(loadedQuestion2.uuid2).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
        (0, chai_1.expect)(loadedQuestion2.uuid3).to.be.null;
        (0, chai_1.expect)(loadedQuestion2.uuid4).to.be.null;
    })));
});
//# sourceMappingURL=uuid-oracle.js.map