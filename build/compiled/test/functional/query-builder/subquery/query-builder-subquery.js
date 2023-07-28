"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("query builder > sub-query", () => {
    // -------------------------------------------------------------------------
    // Prepare
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Reusable functions
    // -------------------------------------------------------------------------
    async function prepare(connection) {
        const user1 = new User_1.User();
        user1.name = "Alex Messer";
        user1.registered = true;
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.name = "Dima Zotov";
        user2.registered = true;
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.name = "Umed Khudoiberdiev";
        user3.registered = false;
        await connection.manager.save(user3);
        const category1 = new Category_1.Category();
        category1.name = "Alex Messer";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "Dima Zotov";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.title = "Alex Messer";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Dima Zotov";
        post2.categories = [category1, category2];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "Umed Khudoiberdiev";
        await connection.manager.save(post3);
    }
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should execute sub query in where string using subQuery method", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const qb = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post");
        const posts = await qb
            .where("post.title IN " +
            qb
                .subQuery()
                .select("usr.name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered")
                .getQuery())
            .setParameter("registered", true)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in where function using subQuery method", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select("usr.name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered")
                .getQuery();
            return "post.title IN " + subQuery;
        })
            .setParameter("registered", true)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in where function using subQuery method", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select("usr.name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered")
                .getQuery();
            return "post.title IN " + subQuery;
        })
            .setParameter("registered", true)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query using different query builder", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const userQb = await connection
            .getRepository(User_1.User)
            .createQueryBuilder("usr")
            .select("usr.name")
            .where("usr.registered = :registered", { registered: true });
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .where("post.title IN (" + userQb.getQuery() + ")")
            .setParameters(userQb.getParameters())
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in from expression (using different query builder)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const userQb = await connection
            .getRepository(User_1.User)
            .createQueryBuilder("usr")
            .select("usr.name", "name")
            .where("usr.registered = :registered", { registered: true });
        const posts = await connection
            .createQueryBuilder()
            .select(`${connection.driver.escape("usr")}.${connection.driver.escape("name")}`, "name")
            .from("(" + userQb.getQuery() + ")", "usr")
            .setParameters(userQb.getParameters())
            .getRawMany();
        posts.should.be.eql([
            { name: "Alex Messer" },
            { name: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in from expression (using from's query builder)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const userQb = await connection
            .getRepository(User_1.User)
            .createQueryBuilder("usr")
            .select("usr.name", "name")
            .where("usr.registered = :registered", { registered: true });
        const posts = await connection
            .createQueryBuilder()
            .select(`${connection.driver.escape("usr")}.${connection.driver.escape("name")}`, "name")
            .from((subQuery) => {
            return subQuery
                .select("usr.name", "name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered", {
                registered: true,
            });
        }, "usr")
            .setParameters(userQb.getParameters())
            .getRawMany();
        posts.should.be.eql([
            { name: "Alex Messer" },
            { name: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in from expression (using from's query builder)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const userQb = await connection
            .getRepository(User_1.User)
            .createQueryBuilder("usr")
            .select("usr.name", "name")
            .where("usr.registered = :registered", { registered: true });
        const posts = await connection
            .createQueryBuilder()
            .select(`${connection.driver.escape("usr")}.${connection.driver.escape("name")}`, "name")
            .from((subQuery) => {
            return subQuery
                .select("usr.name", "name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered", {
                registered: true,
            });
        }, "usr")
            .setParameters(userQb.getParameters())
            .getRawMany();
        posts.should.be.eql([
            { name: "Alex Messer" },
            { name: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in from expression as second from expression", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const posts = await connection
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .addFrom((subQuery) => {
            return subQuery
                .select("usr.name", "name")
                .from(User_1.User, "usr")
                .where("usr.registered = :registered", {
                registered: true,
            });
        }, "usr")
            .where(`${connection.driver.escape("post")}.${connection.driver.escape("title")} = ${connection.driver.escape("usr")}.${connection.driver.escape("name")}`)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in selects", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const subQuery = connection
            .createQueryBuilder()
            .select("usr.name", "name")
            .from(User_1.User, "usr")
            .limit(1)
            .orderBy("usr.name")
            .getQuery();
        const posts = await connection
            .createQueryBuilder()
            .select("post.id", "id")
            .addSelect(`(${subQuery})`, "name")
            .from(Post_1.Post, "post")
            .orderBy("post.id")
            .getRawMany();
        // CockroachDB returns numeric data types as string
        if (connection.driver.options.type === "cockroachdb") {
            posts.should.be.eql([
                { id: "1", name: "Alex Messer" },
                { id: "2", name: "Alex Messer" },
                { id: "3", name: "Alex Messer" },
            ]);
        }
        else {
            posts.should.be.eql([
                { id: 1, name: "Alex Messer" },
                { id: 2, name: "Alex Messer" },
                { id: 3, name: "Alex Messer" },
            ]);
        }
    })));
    it("should execute sub query in selects (using provided sub query builder)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const posts = await connection
            .createQueryBuilder()
            .select("post.id", "id")
            .addSelect((subQuery) => {
            return subQuery
                .select("usr.name", "name")
                .from(User_1.User, "usr")
                .orderBy("usr.name")
                .limit(1);
        }, "name")
            .from(Post_1.Post, "post")
            .orderBy("post.id")
            .getRawMany();
        // CockroachDB returns numeric data types as string
        if (connection.driver.options.type === "cockroachdb") {
            posts.should.be.eql([
                { id: "1", name: "Alex Messer" },
                { id: "2", name: "Alex Messer" },
                { id: "3", name: "Alex Messer" },
            ]);
        }
        else {
            posts.should.be.eql([
                { id: 1, name: "Alex Messer" },
                { id: 2, name: "Alex Messer" },
                { id: 3, name: "Alex Messer" },
            ]);
        }
    })));
    it("should execute sub query in joins (using provided sub query builder)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const subQuery = connection
            .createQueryBuilder()
            .select("usr.name", "name")
            .from(User_1.User, "usr")
            .getQuery();
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .innerJoin("post.categories", "category", `${connection.driver.escape("category")}.${connection.driver.escape("name")} IN (${subQuery})`)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
        ]);
    })));
    it("should execute sub query in joins with subquery factory (as selection)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const joinConditionSubQuery = connection
            .createQueryBuilder()
            .select("usr.name", "name")
            .from(User_1.User, "usr")
            .getQuery();
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .innerJoin((subQuery) => {
            return subQuery
                .select()
                .from("category", "category");
        }, "category", `${connection.driver.escape("category")}.${connection.driver.escape("name")} IN (${joinConditionSubQuery})`)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
            { id: 3, title: "Umed Khudoiberdiev" },
        ]);
    })));
    it("should execute sub query in joins as string (as selection)", () => Promise.all(connections.map(async (connection) => {
        await prepare(connection);
        const joinConditionSubQuery = connection
            .createQueryBuilder()
            .select("usr.name", "name")
            .from(User_1.User, "usr")
            .getQuery();
        const joinSubQuery = connection
            .createQueryBuilder()
            .select()
            .from("category", "category")
            .getQuery();
        const posts = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .innerJoin("(" + joinSubQuery + ")", "category", `${connection.driver.escape("category")}.${connection.driver.escape("name")} IN (${joinConditionSubQuery})`)
            .orderBy("post.id")
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Alex Messer" },
            { id: 2, title: "Dima Zotov" },
            { id: 3, title: "Umed Khudoiberdiev" },
        ]);
    })));
});
//# sourceMappingURL=query-builder-subquery.js.map