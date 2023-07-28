"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #3374 Synchronize issue with UUID (MySQL)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not drop primary column again", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.id = 1;
        post.name = "hello world";
        await connection.manager.save(post);
        await connection.synchronize();
        const loadedPost = await connection.manager.findBy(Post_1.Post, {
            name: "hello world",
        });
        (0, chai_1.expect)(loadedPost).to.be.not.empty;
    })));
});
//# sourceMappingURL=issue-3374.js.map