"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
describe("embedded > multiple-primary-column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert, load, update and remove entities with embeddeds when primary column defined in main and in embedded entities", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "About cars";
        post1.counters = new Counters_1.Counters();
        post1.counters.code = 1;
        post1.counters.comments = 1;
        post1.counters.favorites = 2;
        post1.counters.likes = 3;
        await connection.getRepository(Post_1.Post).save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "About airplanes";
        post2.counters = new Counters_1.Counters();
        post2.counters.code = 2;
        post2.counters.comments = 2;
        post2.counters.favorites = 3;
        post2.counters.likes = 4;
        await postRepository.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].title).to.be.equal("About cars");
        (0, chai_1.expect)(loadedPosts[0].counters.should.be.eql({
            code: 1,
            comments: 1,
            favorites: 2,
            likes: 3,
        }));
        (0, chai_1.expect)(loadedPosts[1].title).to.be.equal("About airplanes");
        (0, chai_1.expect)(loadedPosts[1].counters.should.be.eql({
            code: 2,
            comments: 2,
            favorites: 3,
            likes: 4,
        }));
        const loadedPost = (await postRepository.findOneBy({
            id: 1,
            counters: { code: 1 },
        }));
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About cars");
        (0, chai_1.expect)(loadedPost.counters.should.be.eql({
            code: 1,
            comments: 1,
            favorites: 2,
            likes: 3,
        }));
        loadedPost.counters.favorites += 1;
        await postRepository.save(loadedPost);
        const loadedPost2 = (await postRepository.findOneBy({
            id: 1,
            counters: { code: 1 },
        }));
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About cars");
        (0, chai_1.expect)(loadedPost.counters.should.be.eql({
            code: 1,
            comments: 1,
            favorites: 3,
            likes: 3,
        }));
        await postRepository.remove(loadedPost2);
        const loadedPosts2 = (await postRepository.find());
        (0, chai_1.expect)(loadedPosts2.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts2[0].title).to.be.equal("About airplanes");
    })));
});
//# sourceMappingURL=multiple-primary-columns.js.map