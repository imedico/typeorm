"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("indices > fulltext index", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create fulltext indices", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        table.indices.length.should.be.equal(2);
        (0, chai_1.expect)(table.indices[0].isFulltext).to.be.true;
        (0, chai_1.expect)(table.indices[1].isFulltext).to.be.true;
        await queryRunner.release();
    })));
    it("with default parser", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const text = "This is text";
        const post = new Post_1.Post();
        post.default = text;
        post.ngram = text;
        await postRepository.save(post);
        const loadedPost1 = await postRepository
            .createQueryBuilder("post")
            .where("MATCH(post.default) AGAINST (:token)", {
            token: "text",
        })
            .getOne();
        (0, chai_1.expect)(loadedPost1).to.be.exist;
        const loadedPost2 = await postRepository
            .createQueryBuilder("post")
            .where("MATCH(post.default) AGAINST (:token)", {
            token: "te",
        })
            .getOne();
        (0, chai_1.expect)(loadedPost2).to.be.null;
    })));
    it("with ngram parser", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const text = "This is text";
        const post = new Post_1.Post();
        post.default = text;
        post.ngram = text;
        await postRepository.save(post);
        const loadedPost1 = await postRepository
            .createQueryBuilder("post")
            .where("MATCH(post.ngram) AGAINST (:token)", {
            token: "text",
        })
            .getOne();
        (0, chai_1.expect)(loadedPost1).to.be.exist;
        const loadedPost2 = await postRepository
            .createQueryBuilder("post")
            .where("MATCH(post.ngram) AGAINST (:token)", {
            token: "te",
        })
            .getOne();
        (0, chai_1.expect)(loadedPost2).to.be.exist;
    })));
});
//# sourceMappingURL=fulltext-index-test.js.map