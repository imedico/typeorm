"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const test_utils_1 = require("../../../utils/test-utils");
const Subcounters_1 = require("../embedded-many-to-one-case2/entity/Subcounters");
describe("embedded > embedded-with-special-columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert, load, update and remove entities with embeddeds when embeds contains special columns (e.g. CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "About cars";
        post1.counters = new Counters_1.Counters();
        post1.counters.comments = 1;
        post1.counters.favorites = 2;
        post1.counters.likes = 3;
        post1.counters.subcounters = new Subcounters_1.Subcounters();
        post1.counters.subcounters.watches = 5;
        await connection.getRepository(Post_1.Post).save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "About airplanes";
        post2.counters = new Counters_1.Counters();
        post2.counters.comments = 2;
        post2.counters.favorites = 3;
        post2.counters.likes = 4;
        post2.counters.subcounters = new Subcounters_1.Subcounters();
        post2.counters.subcounters.watches = 10;
        await connection.getRepository(Post_1.Post).save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].counters.createdDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPosts[0].counters.updatedDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPosts[0].counters.deletedDate).to.be.null;
        (0, chai_1.expect)(loadedPosts[0].counters.subcounters.version.should.be.equal(1));
        (0, chai_1.expect)(loadedPosts[1].counters.createdDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPosts[1].counters.updatedDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPosts[1].counters.deletedDate).to.be.null;
        (0, chai_1.expect)(loadedPosts[1].counters.subcounters.version.should.be.equal(1));
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.id")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.counters.createdDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPost.counters.updatedDate.should.be.instanceof(Date));
        (0, chai_1.expect)(loadedPost.counters.deletedDate).to.be.null;
        (0, chai_1.expect)(loadedPost.counters.subcounters.version.should.be.equal(1));
        const prevUpdateDate = loadedPost.counters.updatedDate;
        loadedPost.title = "About cars #2";
        await (0, test_utils_1.sleep)(1000);
        await connection.getRepository(Post_1.Post).save(loadedPost);
        loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.counters.updatedDate
            .valueOf()
            .should.be.greaterThan(prevUpdateDate.valueOf()));
        (0, chai_1.expect)(loadedPost.counters.subcounters.version.should.be.equal(2));
    })));
});
//# sourceMappingURL=embedded-with-special-columns.js.map