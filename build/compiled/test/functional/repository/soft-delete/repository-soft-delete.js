"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("repository > soft-delete", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform soft deletion and restoration correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a new posts
        const newPost1 = postRepository.create({
            id: 1,
            name: "post#1",
        });
        const newPost2 = postRepository.create({
            id: 2,
            name: "post#2",
        });
        await postRepository.save(newPost1);
        await postRepository.save(newPost2);
        // soft-delete one
        await postRepository.softDelete({ id: 1, name: "post#1" });
        // load to check
        const loadedPosts = await postRepository.find({
            withDeleted: true,
        });
        // assert
        loadedPosts.length.should.be.equal(2);
        const loadedPost1 = loadedPosts.find((p) => p.id === 1);
        (0, chai_1.expect)(loadedPost1).to.exist;
        (0, chai_1.expect)(loadedPost1.deletedAt).to.be.instanceof(Date);
        (0, chai_1.expect)(loadedPost1.name).to.equals("post#1");
        const loadedPost2 = loadedPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(loadedPost2).to.exist;
        (0, chai_1.expect)(loadedPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost2.name).to.equals("post#2");
        // restore one
        await postRepository.restore({ id: 1, name: "post#1" });
        // load to check
        const restoredPosts = await postRepository.find({
            withDeleted: true,
        });
        // assert
        restoredPosts.length.should.be.equal(2);
        const restoredPost1 = restoredPosts.find((p) => p.id === 1);
        (0, chai_1.expect)(restoredPost1).to.exist;
        (0, chai_1.expect)(restoredPost1.deletedAt).to.equals(null);
        (0, chai_1.expect)(restoredPost1.name).to.equals("post#1");
        const restoredPost2 = restoredPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(restoredPost2).to.exist;
        (0, chai_1.expect)(restoredPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(restoredPost2.name).to.equals("post#2");
    })));
});
//# sourceMappingURL=repository-soft-delete.js.map