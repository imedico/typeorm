"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("other issues > bulk save in sqlite", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entities in bulk", () => Promise.all(connections.map(async function (connection) {
        // insert few posts first
        const posts = [];
        for (let i = 1; i <= 10000; i++) {
            posts.push(new Post_1.Post(i, "Post #" + i));
        }
        // console.log(`saving...`)
        await connection.manager.save(posts);
    })));
});
//# sourceMappingURL=sqlite-bulk-save.js.map