"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../utils/test-utils");
describe("json > defaults", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["postgres"], // because only postgres supports jsonb type
        // logging: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert default values properly", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "Post #1";
        await connection.manager.save(post1);
        const loadedPost1 = await connection.manager.findBy(Post_1.Post, {
            title: "Post #1",
        });
        loadedPost1.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                authors: ["Dmitry", "Olimjon"],
                category: { name: "TypeScript" },
                categories: [{ name: "TypeScript" }],
            },
        ]);
        const post2 = new Post_1.Post();
        post2.title = "Post #2";
        post2.authors = [`Umed`, `Dmitry`];
        post2.category = { name: "JavaScript" };
        post2.categories = [
            { name: "JavaScript" },
            { name: "ECMAScript" },
        ];
        await connection.manager.save(post2);
        const loadedPost2 = await connection.manager.findBy(Post_1.Post, {
            title: "Post #2",
        });
        loadedPost2.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                authors: ["Umed", "Dmitry"],
                category: { name: "JavaScript" },
                categories: [
                    { name: "JavaScript" },
                    { name: "ECMAScript" },
                ],
            },
        ]);
    })));
});
//# sourceMappingURL=jsonb-defaults.test.js.map