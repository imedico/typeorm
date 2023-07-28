"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
const issue_8890_utils_1 = require("./issue-8890-utils");
describe("github issues > #8890 it should be possible to query IS NULL on ManyToOne relations", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("where IsNull", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataManyToOne)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                author: (0, src_1.IsNull)(),
            },
        })
            .orderBy("post.id", "ASC")
            .getMany();
        posts.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
            },
        ]);
    })));
    it("where In", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataManyToOne)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                author: (0, src_1.In)([2, 3]),
            },
        })
            .orderBy("post.id", "ASC")
            .getMany();
        posts.should.be.eql([
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
            },
            {
                id: 5,
                title: "Post #5",
                text: "About post #5",
            },
        ]);
    })));
    it("where IsNull OR In", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataManyToOne)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: [
                {
                    author: (0, src_1.In)([2, 3]),
                },
                {
                    author: (0, src_1.IsNull)(),
                },
            ],
        })
            .orderBy("post.id", "ASC")
            .getMany();
        posts.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
            },
            {
                id: 3,
                title: "Post #3",
                text: "About post #3",
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
            },
            {
                id: 5,
                title: "Post #5",
                text: "About post #5",
            },
        ]);
    })));
});
describe("github issues > #8890 it should be possible to query IS NULL on OneToOne relations on owner side", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("where IsNull", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataOneToOne)(connection.manager);
        const users = await connection
            .createQueryBuilder(User_1.User, "user")
            .setFindOptions({
            where: {
                profile: (0, src_1.IsNull)(),
            },
        })
            .orderBy("user.id", "ASC")
            .getMany();
        users.should.be.eql([
            {
                id: 4,
                username: "user #4",
            },
        ]);
    })));
    it("where In", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataOneToOne)(connection.manager);
        const users = await connection
            .createQueryBuilder(User_1.User, "user")
            .setFindOptions({
            where: {
                profile: (0, src_1.In)([1, 2]),
            },
        })
            .orderBy("user.id", "ASC")
            .getMany();
        users.should.be.eql([
            {
                id: 1,
                username: "user #1",
            },
            {
                id: 2,
                username: "user #2",
            },
        ]);
    })));
    it("where IsNull OR In", () => Promise.all(dataSources.map(async (connection) => {
        await (0, issue_8890_utils_1.prepareDataOneToOne)(connection.manager);
        const users = await connection
            .createQueryBuilder(User_1.User, "user")
            .setFindOptions({
            where: [
                {
                    profile: (0, src_1.In)([1, 2]),
                },
                {
                    profile: (0, src_1.IsNull)(),
                },
            ],
        })
            .orderBy("user.id", "ASC")
            .getMany();
        users.should.be.eql([
            {
                id: 1,
                username: "user #1",
            },
            {
                id: 2,
                username: "user #2",
            },
            {
                id: 4,
                username: "user #4",
            },
        ]);
    })));
});
//# sourceMappingURL=issue-8890.js.map