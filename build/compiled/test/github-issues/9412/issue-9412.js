"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #9365 ", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work with conflict path", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post1 = new Post_1.Post();
        post1.title = "Test1";
        post1.author = "Test1";
        await postRepository.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Test";
        post2.author = "Test2";
        await postRepository.upsert(post2, {
            conflictPaths: { author: true },
            skipUpdateIfNoValuesChanged: true,
        });
        const allPostsAfterUpsert1 = await postRepository.find();
        (0, chai_1.expect)(allPostsAfterUpsert1.length).equal(2);
        await postRepository.upsert(post2, {
            conflictPaths: { title: true },
            skipUpdateIfNoValuesChanged: true,
        });
        const allPostsAfterUpsert2 = await postRepository.find();
        (0, chai_1.expect)(allPostsAfterUpsert2.length).equal(2);
    })));
});
//# sourceMappingURL=issue-9412.js.map