"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const PostEntity_1 = require("./entity/PostEntity");
const Post_1 = require("./model/Post");
describe("entity schemas > target option", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [PostEntity_1.PostEntity],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create instance of the target", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = postRepository.create({
            title: "First Post",
            text: "About first post",
        });
        post.should.be.instanceof(Post_1.Post);
    })));
    it("should find instances of the target", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.title = "First Post";
        post.text = "About first post";
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({
            title: "First Post",
        });
        loadedPost.should.be.instanceof(Post_1.Post);
    })));
});
//# sourceMappingURL=entity-schema-target.js.map