"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const PostEntity_1 = require("./entity/PostEntity");
const CategoryEntity_1 = require("./entity/CategoryEntity");
describe("entity schemas > basic functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [PostEntity_1.PostEntity, CategoryEntity_1.CategoryEntity],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform basic operations with entity using repository", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(PostEntity_1.PostEntity);
        const post = postRepository.create({
            id: 1,
            title: "First Post",
            text: "About first post",
        });
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({
            title: "First Post",
        });
        loadedPost.id.should.be.equal(post.id);
        loadedPost.title.should.be.equal("First Post");
        loadedPost.text.should.be.equal("About first post");
        await postRepository.remove(loadedPost);
        const loadedPostAfterRemove = await postRepository.findOneBy({
            title: "First Post",
        });
        (0, chai_1.expect)(loadedPostAfterRemove).to.be.null;
    })));
    it("should perform basic operations with entity using manager", () => Promise.all(connections.map(async (connection) => {
        const post = connection.manager.create(PostEntity_1.PostEntity, {
            id: 1,
            title: "First Post",
            text: "About first post",
        });
        await connection.manager.save(PostEntity_1.PostEntity, post);
        const loadedPost = await connection.manager.findOneBy(PostEntity_1.PostEntity, { title: "First Post" });
        loadedPost.id.should.be.equal(post.id);
        loadedPost.title.should.be.equal("First Post");
        loadedPost.text.should.be.equal("About first post");
        await connection.manager.remove(PostEntity_1.PostEntity, loadedPost);
        const loadedPostAfterRemove = await connection.manager.findOneBy(PostEntity_1.PostEntity, {
            title: "First Post",
        });
        (0, chai_1.expect)(loadedPostAfterRemove).to.be.null;
    })));
});
//# sourceMappingURL=entity-schema-basic.js.map