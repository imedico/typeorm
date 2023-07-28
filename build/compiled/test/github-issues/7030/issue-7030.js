"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #7030", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert and fetch from the expected column", () => Promise.all(connections.map(async (connection) => {
        const id = "123e4567-e89b-12d3-a456-426614174000";
        const post = new Post_1.Post();
        post.id = id;
        let postRepository = connection.getRepository(Post_1.Post);
        await postRepository.save(post);
        const actualPost = await postRepository.findOneByOrFail({ id });
        (0, chai_1.expect)(actualPost.id).to.be.equal(id);
    })));
});
//# sourceMappingURL=issue-7030.js.map