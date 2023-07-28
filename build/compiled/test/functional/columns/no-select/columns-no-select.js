"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("columns > no-selection functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not select columns marked with select: false option", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorName = "Umed";
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository.findOneBy({
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns");
        (0, chai_1.expect)(loadedPost.authorName).to.be.undefined;
    })));
    it("should not select columns with QueryBuilder marked with select: false option", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorName = "Umed";
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository
            .createQueryBuilder("post")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns");
        (0, chai_1.expect)(loadedPost.authorName).to.be.undefined;
    })));
    it("should select columns with select: false even columns were implicitly selected", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorName = "Umed";
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository
            .createQueryBuilder("post")
            .addSelect("post.authorName")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns");
        (0, chai_1.expect)(loadedPost.authorName).to.be.equal("Umed");
    })));
});
//# sourceMappingURL=columns-no-select.js.map