"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("columns > readonly functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not update columns marked with readonly property", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorName = "Umed";
        await postRepository.save(post);
        // then update all its properties and save again
        post.title = "About columns1";
        post.text = "Some text about columns1";
        post.authorName = "Umed1";
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository.findOneBy({
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns1");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns1");
        (0, chai_1.expect)(loadedPost.authorName).to.be.equal("Umed"); // blocked by readonly
    })));
});
//# sourceMappingURL=columns-readonly.js.map