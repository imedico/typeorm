"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const src_1 = require("../../../../src");
const Post_1 = require("./entity/Post");
const Raw_1 = require("../../../../src/find-options/operator/Raw");
const PersonAR_1 = require("./entity/PersonAR");
const chai_1 = require("chai");
describe("repository > find options > operators", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("not", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)("About #1"),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("lessThan", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.LessThan)(10),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("lessThanOrEqual", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "About #3";
        post3.likes = 13;
        await connection.manager.save(post3);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.LessThanOrEqual)(12),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(lessThan)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.LessThan)(10)),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("not(lessThanOrEqual)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "About #3";
        post3.likes = 13;
        await connection.manager.save(post3);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.LessThanOrEqual)(12)),
        });
        loadedPosts.should.be.eql([
            { id: 3, likes: 13, title: "About #3" },
        ]);
    })));
    it("moreThan", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.MoreThan)(10),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("moreThanOrEqual", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "About #3";
        post3.likes = 13;
        await connection.manager.save(post3);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.MoreThanOrEqual)(12),
        });
        loadedPosts.sort((a, b) => a.id - b.id);
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
            { id: 3, likes: 13, title: "About #3" },
        ]);
    })));
    it("not(moreThan)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.MoreThan)(10)),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(moreThanOrEqual)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "About #3";
        post3.likes = 13;
        await connection.manager.save(post3);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.MoreThanOrEqual)(12)),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("equal", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Equal)("About #2"),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(equal)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.Equal)("About #2")),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("ilike", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "about #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "ABOUT #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.ILike)("%out #%"),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "about #1" },
            { id: 2, likes: 3, title: "ABOUT #2" },
        ]);
    })));
    it("not(ilike)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "about #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "ABOUT #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.ILike)("%out #1")),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "ABOUT #2" },
        ]);
    })));
    it("like", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Like)("%out #%"),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(like)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.Like)("%out #1")),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("between", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts1 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Between)(1, 10),
        });
        loadedPosts1.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
        const loadedPosts2 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Between)(10, 13),
        });
        loadedPosts2.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
        const loadedPosts3 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Between)(1, 20),
        });
        loadedPosts3.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(between)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts1 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.Between)(1, 10)),
        });
        loadedPosts1.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
        const loadedPosts2 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.Between)(10, 13)),
        });
        loadedPosts2.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
        const loadedPosts3 = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, src_1.Not)((0, src_1.Between)(1, 20)),
        });
        loadedPosts3.should.be.eql([]);
    })));
    it("in", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.In)(["About #2", "About #3"]),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
        const noPosts = await connection.getRepository(Post_1.Post).findBy({
            title: (0, src_1.In)([]),
        });
        noPosts.length.should.be.eql(0);
    })));
    it("not(in)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.In)(["About #1", "About #3"])),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
        const noPosts = await connection.getRepository(Post_1.Post).findBy({
            title: (0, src_1.Not)((0, src_1.In)([])),
        });
        noPosts.length.should.be.eql(2);
    })));
    it("any", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            return;
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Any)(["About #2", "About #3"]),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("not(any)", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            return;
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.Any)(["About #2", "About #3"])),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("isNull", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = null;
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.IsNull)(),
        });
        loadedPosts.should.be.eql([{ id: 2, likes: 3, title: null }]);
    })));
    it("not(isNull)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = null;
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            title: (0, src_1.Not)((0, src_1.IsNull)()),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("raw", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, Raw_1.Raw)("12"),
        });
        loadedPosts.should.be.eql([
            { id: 1, likes: 12, title: "About #1" },
        ]);
    })));
    it("raw (function)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => "1 + " + columnAlias + " = 4"),
        });
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
        ]);
    })));
    it("raw (function with object literal parameters)", () => Promise.all(connections.map(async (connection) => {
        const createPost = (index) => {
            const post = new Post_1.Post();
            post.title = `About #${index}`;
            post.likes = index;
            return post;
        };
        // insert some fake data
        await connection.manager.save([
            createPost(1),
            createPost(2),
            createPost(3),
            createPost(4),
            createPost(5),
            createPost(6),
        ]);
        // check operator
        const result1 = await connection.getRepository(Post_1.Post).findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => {
                return `(${columnAlias} = :value1) OR (${columnAlias} = :value2)`;
            }, { value1: 2, value2: 3 }),
        });
        result1.sort((a, b) => a.id - b.id);
        result1.should.be.eql([
            { id: 2, likes: 2, title: "About #2" },
            { id: 3, likes: 3, title: "About #3" },
        ]);
        // check operator
        const result2 = await connection.getRepository(Post_1.Post).findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => {
                return `(${columnAlias} IN (1, 4, 5, 6)) AND (${columnAlias} < :maxValue)`;
            }, { maxValue: 6 }),
        });
        result2.sort((a, b) => a.id - b.id);
        result2.should.be.eql([
            { id: 1, likes: 1, title: "About #1" },
            { id: 4, likes: 4, title: "About #4" },
            { id: 5, likes: 5, title: "About #5" },
        ]);
        // check operator
        const result3 = await connection.getRepository(Post_1.Post).findBy({
            title: (0, Raw_1.Raw)((columnAlias) => {
                return `${columnAlias} IN (:a, :b, :c)`;
            }, { a: "About #1", b: "About #3", c: "About #5" }),
            likes: (0, Raw_1.Raw)((columnAlias) => `${columnAlias} IN (:d, :e)`, {
                d: 5,
                e: 1,
            }),
        });
        result3.sort((a, b) => a.id - b.id);
        result3.should.be.eql([
            { id: 1, likes: 1, title: "About #1" },
            { id: 5, likes: 5, title: "About #5" },
        ]);
        // check operator
        const result4 = await connection.getRepository(Post_1.Post).findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => `${columnAlias} IN (2, 6)`, {}),
        });
        result4.sort((a, b) => a.id - b.id);
        result4.should.be.eql([
            { id: 2, likes: 2, title: "About #2" },
            { id: 6, likes: 6, title: "About #6" },
        ]);
        // check operator
        const result5 = await connection.getRepository(Post_1.Post).findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => `${columnAlias} IN (2, :value, 6)`, { value: 3 }),
        });
        result5.sort((a, b) => a.id - b.id);
        result5.should.be.eql([
            { id: 2, likes: 2, title: "About #2" },
            { id: 3, likes: 3, title: "About #3" },
            { id: 6, likes: 6, title: "About #6" },
        ]);
        // check operator
        const result6 = await connection.getRepository(Post_1.Post).findBy({
            likes: (0, Raw_1.Raw)((columnAlias) => `${columnAlias} IN (:...values)`, { values: [2, 3, 6] }),
        });
        result6.sort((a, b) => a.id - b.id);
        result6.should.be.eql([
            { id: 2, likes: 2, title: "About #2" },
            { id: 3, likes: 3, title: "About #3" },
            { id: 6, likes: 6, title: "About #6" },
        ]);
    })));
    it("should work with ActiveRecord model", async () => {
        // These must run sequentially as we have the global context of the `PersonAR` ActiveRecord class
        for (const connection of connections) {
            PersonAR_1.PersonAR.useDataSource(connection);
            const person = new PersonAR_1.PersonAR();
            person.name = "Timber";
            await connection.manager.save(person);
            const loadedPeople = await PersonAR_1.PersonAR.findBy({
                name: (0, src_1.In)(["Timber"]),
            });
            (0, chai_1.expect)(loadedPeople[0].name).to.be.equal("Timber");
        }
    });
    it("or (array syntax)", () => Promise.all(connections.map(async (connection) => {
        // insert some fake data
        const post1 = new Post_1.Post();
        post1.title = "About #1";
        post1.likes = 12;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About #2";
        post2.likes = 3;
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "About #3";
        post3.likes = 4;
        await connection.manager.save(post3);
        // check operator
        const loadedPosts = await connection
            .getRepository(Post_1.Post)
            .findBy([
            {
                likes: 3,
            },
            {
                likes: 4,
            },
        ]);
        loadedPosts.sort((a, b) => a.id - b.id);
        loadedPosts.should.be.eql([
            { id: 2, likes: 3, title: "About #2" },
            { id: 3, likes: 4, title: "About #3" },
        ]);
    })));
});
//# sourceMappingURL=repository-find-operators.js.map