"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../utils/test-utils");
describe("repository > deleteById methods", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("remove using deleteById method should delete successfully", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a new posts
        const newPost1 = postRepository.create();
        newPost1.title = "Super post #1";
        const newPost2 = postRepository.create();
        newPost2.title = "Super post #2";
        const newPost3 = postRepository.create();
        newPost3.title = "Super post #3";
        const newPost4 = postRepository.create();
        newPost4.title = "Super post #4";
        await postRepository.save(newPost1);
        await postRepository.save(newPost2);
        await postRepository.save(newPost3);
        await postRepository.save(newPost4);
        // remove one
        await postRepository.delete(1);
        // load to check
        const loadedPosts = await postRepository.find();
        // assert
        loadedPosts.length.should.be.equal(3);
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 1)).to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 2)).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 3)).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 4)).not.to.be.undefined;
    })));
    it("remove using removeByIds method should delete successfully", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a new posts
        const newPost1 = postRepository.create();
        newPost1.title = "Super post #1";
        const newPost2 = postRepository.create();
        newPost2.title = "Super post #2";
        const newPost3 = postRepository.create();
        newPost3.title = "Super post #3";
        const newPost4 = postRepository.create();
        newPost4.title = "Super post #4";
        await postRepository.save(newPost1);
        await postRepository.save(newPost2);
        await postRepository.save(newPost3);
        await postRepository.save(newPost4);
        // remove multiple
        await postRepository.delete([2, 3]);
        // load to check
        const loadedPosts = await postRepository.find();
        // assert
        loadedPosts.length.should.be.equal(2);
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 1)).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 2)).to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 3)).to.be.undefined;
        (0, chai_1.expect)(loadedPosts.find((p) => p.id === 4)).not.to.be.undefined;
    })));
});
//# sourceMappingURL=repository-remove-by-id-and-ids.js.map