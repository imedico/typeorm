"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("other issues > update relational column on relation change", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update relational column when relation is inserted", () => Promise.all(connections.map(async function (connection) {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        const category2 = new Category_1.Category();
        category2.name = "category #1";
        const post = new Post_1.Post();
        post.title = "about categories";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        category1.postId.should.be.equal(1);
        category2.postId.should.be.equal(1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #2";
        await connection.manager.save(post3);
        category1.post = post2;
        category2.post = post3;
        await connection.manager.save([category1, category2]);
        category1.postId.should.be.equal(2);
        category2.postId.should.be.equal(3);
    })));
});
//# sourceMappingURL=update-relational-column-on-relation-change.js.map