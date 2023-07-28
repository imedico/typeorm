"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const Category_1 = require("./entity/Category");
const Tag_1 = require("./entity/Tag");
describe("github issues > #234 and #223 lazy loading does not work correctly from one-to-many and many-to-many sides", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"], // we can properly test lazy-relations only on one platform
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly load from one-to-many and many-to-one sides", () => Promise.all(connections.map(async (connection) => {
        // pre-populate database first
        for (let i = 1; i <= 10; i++) {
            const post = new Post_1.Post();
            post.title = "fake post # " + i;
            if (i > 5) {
                const category = new Category_1.Category();
                category.name = "fake category!";
                post.category = Promise.resolve(category);
            }
            await connection.manager.save(post);
        }
        // create objects to save
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        const post1 = new Post_1.Post();
        post1.title = "Hello Post #1";
        post1.category = Promise.resolve(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        const post2 = new Post_1.Post();
        post2.title = "Hello Post #2";
        post2.category = Promise.resolve(category2);
        // persist
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        // check that all persisted objects exist
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.title = :firstTitle OR post.title = :secondTitle", {
            firstTitle: "Hello Post #1",
            secondTitle: "Hello Post #2",
        })
            .getMany();
        const loadedCategory1 = await loadedPosts[0].category;
        (0, chai_1.expect)(loadedCategory1).not.to.be.null;
        loadedCategory1.name.should.equal("category #1");
        const loadedCategory2 = await loadedPosts[1].category;
        (0, chai_1.expect)(loadedCategory2).not.to.be.null;
        loadedCategory2.name.should.equal("category #2");
        const loadedPosts1 = await loadedCategory1.posts;
        (0, chai_1.expect)(loadedPosts1).not.to.be.undefined;
        loadedPosts1[0].title.should.equal("Hello Post #1");
        const loadedPosts2 = await loadedCategory2.posts;
        (0, chai_1.expect)(loadedPosts2).not.to.be.undefined;
        loadedPosts2[0].title.should.equal("Hello Post #2");
    })));
    it("should correctly load from both many-to-many sides", () => Promise.all(connections.map(async (connection) => {
        // pre-populate database first
        for (let i = 1; i <= 10; i++) {
            const post = new Post_1.Post();
            post.title = "fake post # " + i;
            for (let j = 1; j <= i; j++) {
                const tag = new Tag_1.Tag();
                tag.name = "fake tag!";
                post.tags = Promise.resolve((await post.tags).concat([tag]));
            }
            await connection.manager.save(post);
        }
        // create objects to save
        const tag1_1 = new Tag_1.Tag();
        tag1_1.name = "tag #1_1";
        const tag1_2 = new Tag_1.Tag();
        tag1_2.name = "tag #1_2";
        const post1 = new Post_1.Post();
        post1.title = "Hello Post #1";
        post1.tags = Promise.resolve([tag1_1, tag1_2]);
        const tag2_1 = new Tag_1.Tag();
        tag2_1.name = "tag #2_1";
        const tag2_2 = new Tag_1.Tag();
        tag2_2.name = "tag #2_2";
        const tag2_3 = new Tag_1.Tag();
        tag2_3.name = "tag #2_3";
        const post2 = new Post_1.Post();
        post2.title = "Hello Post #2";
        post2.tags = Promise.resolve([tag2_1, tag2_2, tag2_3]);
        // persist
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        // check that all persisted objects exist
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.title = :firstTitle OR post.title = :secondTitle", {
            firstTitle: "Hello Post #1",
            secondTitle: "Hello Post #2",
        })
            .getMany();
        // check owner side
        const loadedTags1 = await loadedPosts[0].tags;
        (0, chai_1.expect)(loadedTags1).not.to.be.undefined;
        loadedTags1.length.should.be.equal(2);
        loadedTags1[0].name.should.equal("tag #1_1");
        loadedTags1[1].name.should.equal("tag #1_2");
        const loadedTags2 = await loadedPosts[1].tags;
        (0, chai_1.expect)(loadedTags2).not.to.be.undefined;
        loadedTags2.length.should.be.equal(3);
        loadedTags2[0].name.should.equal("tag #2_1");
        loadedTags2[1].name.should.equal("tag #2_2");
        loadedTags2[2].name.should.equal("tag #2_3");
        // check inverse side
        const loadedPosts1 = await loadedTags1[0].posts;
        (0, chai_1.expect)(loadedPosts1).not.to.be.undefined;
        loadedPosts1.length.should.be.equal(1);
        loadedPosts1[0].title.should.equal("Hello Post #1");
        const loadedPosts2 = await loadedTags2[0].posts;
        (0, chai_1.expect)(loadedPosts2).not.to.be.undefined;
        loadedPosts2.length.should.be.equal(1);
        loadedPosts2[0].title.should.equal("Hello Post #2");
    })));
});
//# sourceMappingURL=issue-234.js.map