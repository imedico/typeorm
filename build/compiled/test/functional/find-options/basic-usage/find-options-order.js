"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const src_1 = require("../../../../src");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const find_options_test_utils_1 = require("./find-options-test-utils");
const chai_1 = require("chai");
describe("find options > order", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("order by id DESC", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts2.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        const posts3 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: 1,
            },
        })
            .getMany();
        posts3.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        const posts4 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: {
                    direction: "asc",
                },
            },
        })
            .getMany();
        posts4.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        const posts5 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: "DESC",
            },
        })
            .getMany();
        posts5.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
        const posts6 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: "desc",
            },
        })
            .getMany();
        posts6.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
        const posts7 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: -1,
            },
        })
            .getMany();
        posts7.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
        const posts8 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: {
                    direction: "DESC",
                },
            },
        })
            .getMany();
        posts8.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("order by title", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                title: "desc",
            },
        })
            .getMany();
        posts.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("where two criteria", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                title: "desc",
                text: "asc",
            },
        })
            .getMany();
        posts.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("order by relation", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                author: {
                    id: "desc",
                },
            },
        })
            .getMany();
        posts.should.have.deep.members([
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
        ]);
        (0, chai_1.expect)(posts[0].id).to.be.eql(3);
        (0, chai_1.expect)(posts[1].id).to.be.oneOf([1, 2, 4]);
        (0, chai_1.expect)(posts[2].id).to.be.oneOf([1, 2, 4]);
        (0, chai_1.expect)(posts[1].id).to.not.be.eql(posts[2].id);
    })));
    it("order by relation with where relation applied", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                author: {
                    id: 1,
                },
            },
            order: {
                id: "asc",
                author: {
                    id: "desc",
                },
            },
        })
            .getMany();
        posts.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("order by nested relations", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                text: (0, src_1.Not)("About post #1"),
            },
            order: {
                author: {
                    photos: {
                        filename: "asc",
                    },
                },
            },
        })
            .getMany();
        // exact row order depends of settings like NULLS FIRST and NULLS LAST
        posts.should.have.deep.members([
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("order by complex nested relations", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                author: {
                    photos: {
                        filename: "desc",
                    },
                },
                tags: {
                    name: "asc",
                },
            },
        })
            .getMany();
        // exact row order depends of settings like NULLS FIRST and NULLS LAST
        posts.should.have.deep.members([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
        ]);
        (0, chai_1.expect)(posts[0].id).to.be.oneOf([4, 3]);
        (0, chai_1.expect)(posts[1].id).to.be.oneOf([2, 1]);
        (0, chai_1.expect)(posts[2].id).to.be.oneOf([2, 1]);
        (0, chai_1.expect)(posts[3].id).to.be.oneOf([3, 4]);
    })));
    it("order by column in embed", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                counters: {
                    likes: "desc",
                },
                id: "asc",
            },
        })
            .getMany();
        posts.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
    })));
    it("order by relation in embed", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                text: (0, src_1.Not)("About post #2"),
            },
            order: {
                counters: {
                    likedUsers: {
                        firstName: "asc",
                    },
                },
            },
        })
            .getMany();
        posts.should.have.deep.members([
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
                counters: { likes: 1 },
            },
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        (0, chai_1.expect)(posts[0].id).to.be.eql(3);
        (0, chai_1.expect)(posts[1].id).to.be.oneOf([1, 4]);
        (0, chai_1.expect)(posts[2].id).to.be.oneOf([1, 4]);
        (0, chai_1.expect)(posts[1].id).to.not.be.eql(posts[2].id);
    })));
});
//# sourceMappingURL=find-options-order.js.map