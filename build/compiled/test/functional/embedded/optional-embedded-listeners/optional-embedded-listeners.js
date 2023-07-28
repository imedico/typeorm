"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const PostInformation_1 = require("./entity/PostInformation");
const PostCounter_1 = require("./entity/PostCounter");
describe("other issues > entity listeners must work in optional embeddeds as well", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("getters and setters should work correctly", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "First title";
        post1.text = "About this post";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Second title";
        post2.text = "About this post";
        post2.information = new PostInformation_1.PostInformation();
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "Third title";
        post3.text = "About this post";
        post3.information = new PostInformation_1.PostInformation();
        post3.information.counters = new PostCounter_1.PostCounter();
        await connection.manager.save(post3);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0]).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].title).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].text).not.to.be.undefined;
        loadedPosts[0].title.should.be.equal("First title");
        loadedPosts[0].text.should.be.equal("About this post");
        (0, chai_1.expect)(loadedPosts[1]).not.to.be.undefined;
        loadedPosts[1].title.should.be.equal("Second title");
        loadedPosts[1].information.description.should.be.equal("default post description");
        (0, chai_1.expect)(loadedPosts[2]).not.to.be.undefined;
        loadedPosts[2].title.should.be.equal("Third title");
        loadedPosts[2].information.counters.likes.should.be.equal(0);
    })));
});
//# sourceMappingURL=optional-embedded-listeners.js.map