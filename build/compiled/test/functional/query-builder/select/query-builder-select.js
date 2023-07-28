"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Tag_1 = require("./entity/Tag");
const HeroImage_1 = require("./entity/HeroImage");
const ExternalPost_1 = require("./entity/ExternalPost");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > select", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Category_1.Category, Post_1.Post, Tag_1.Tag, HeroImage_1.HeroImage, ExternalPost_1.ExternalPost],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should append all entity mapped columns from main selection to select statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id, " +
            "post.title AS post_title, " +
            "post.description AS post_description, " +
            "post.rating AS post_rating, " +
            "post.version AS post_version, " +
            "post.heroImageId AS post_heroImageId, " +
            "post.categoryId AS post_categoryId " +
            "FROM post post");
    })));
    it("should append all entity mapped columns from main selection to SELECT DISTINCT statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .distinct()
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT DISTINCT post.id AS post_id, " +
            "post.title AS post_title, " +
            "post.description AS post_description, " +
            "post.rating AS post_rating, " +
            "post.version AS post_version, " +
            "post.heroImageId AS post_heroImageId, " +
            "post.categoryId AS post_categoryId " +
            "FROM post post");
    })));
    it("should append all entity mapped columns from both main selection and join selections to select statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("category", "category")
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id, " +
            "post.title AS post_title, " +
            "post.description AS post_description, " +
            "post.rating AS post_rating, " +
            "post.version AS post_version, " +
            "post.heroImageId AS post_heroImageId, " +
            "post.categoryId AS post_categoryId, " +
            "category.id AS category_id, " +
            "category.name AS category_name, " +
            "category.description AS category_description, " +
            "category.version AS category_version " +
            "FROM post post LEFT JOIN category category");
    })));
    it("should append entity mapped columns from both main alias and join aliases to select statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .select("post.id")
            .addSelect("category.name")
            .leftJoin("category", "category")
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id, " +
            "category.name AS category_name " +
            "FROM post post LEFT JOIN category category");
    })));
    it("should append entity mapped columns to select statement, if they passed as array", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .select(["post.id", "post.title"])
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id, post.title AS post_title FROM post post");
    })));
    it("should append raw sql to select statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .select("COUNT(*) as cnt")
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT COUNT(*) as cnt FROM post post");
    })));
    it("should append raw sql and entity mapped column to select statement", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .select(["COUNT(*) as cnt", "post.title"])
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.title AS post_title, COUNT(*) as cnt FROM post post");
    })));
    it("should not create alias for selection, which is not entity mapped column", () => Promise.all(connections.map(async (connection) => {
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .select("post.name")
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.equal("SELECT post.name FROM post post");
    })));
    describe("with relations and where clause", () => {
        describe("many-to-one", () => {
            it("should craft query with exact value", () => Promise.all(connections.map(async (connection) => {
                // For github issues #2707
                const [sql, params] = connection
                    .createQueryBuilder(Post_1.Post, "post")
                    .select("post.id")
                    .leftJoin("post.category", "category_join")
                    .where({
                    category: {
                        name: "Foo",
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "post"."id" AS "post_id" FROM "post" "post" ' +
                    'LEFT JOIN "category" "category_join" ON "category_join"."id"="post"."categoryId" ' +
                    'WHERE "category_join"."name" = ?');
                (0, chai_1.expect)(params).to.eql(["Foo"]);
            })));
            it("should craft query with FindOperator", () => Promise.all(connections.map(async (connection) => {
                const [sql, params] = connection
                    .createQueryBuilder(Post_1.Post, "post")
                    .select("post.id")
                    .leftJoin("post.category", "category_join")
                    .where({
                    category: {
                        name: (0, src_1.IsNull)(),
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "post"."id" AS "post_id" FROM "post" "post" ' +
                    'LEFT JOIN "category" "category_join" ON "category_join"."id"="post"."categoryId" ' +
                    'WHERE "category_join"."name" IS NULL');
                (0, chai_1.expect)(params).to.eql([]);
            })));
            it("should craft query with Raw", () => Promise.all(connections.map(async (connection) => {
                // For github issue #6264
                const [sql, params] = connection
                    .createQueryBuilder(Post_1.Post, "post")
                    .select("post.id")
                    .leftJoin("post.category", "category_join")
                    .where({
                    category: {
                        name: (0, src_1.Raw)((path) => `SOME_FUNCTION(${path})`),
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "post"."id" AS "post_id" FROM "post" "post" ' +
                    'LEFT JOIN "category" "category_join" ON "category_join"."id"="post"."categoryId" ' +
                    'WHERE SOME_FUNCTION("category_join"."name")');
                (0, chai_1.expect)(params).to.eql([]);
            })));
        });
        describe("one-to-many", () => {
            it("should craft query with exact value", () => Promise.all(connections.map(async (connection) => {
                (0, chai_1.expect)(() => {
                    connection
                        .createQueryBuilder(Category_1.Category, "category")
                        .select("category.id")
                        .leftJoin("category.posts", "posts")
                        .where({
                        posts: {
                            id: 10,
                        },
                    })
                        .getQueryAndParameters();
                }).to.throw();
            })));
            it("should craft query with FindOperator", () => Promise.all(connections.map(async (connection) => {
                // For github issue #6647
                (0, chai_1.expect)(() => {
                    connection
                        .createQueryBuilder(Category_1.Category, "category")
                        .select("category.id")
                        .leftJoin("category.posts", "posts")
                        .where({
                        posts: {
                            id: (0, src_1.IsNull)(),
                        },
                    })
                        .getQueryAndParameters();
                }).to.throw();
            })));
        });
        describe("many-to-many", () => {
            it("should craft query with exact value", () => Promise.all(connections.map(async (connection) => {
                (0, chai_1.expect)(() => {
                    connection
                        .createQueryBuilder(Post_1.Post, "post")
                        .select("post.id")
                        .leftJoin("post.tags", "tags_join")
                        .where({
                        tags: {
                            name: "Foo",
                        },
                    })
                        .getQueryAndParameters();
                }).to.throw();
            })));
            it("should craft query with FindOperator", () => Promise.all(connections.map(async (connection) => {
                (0, chai_1.expect)(() => {
                    connection
                        .createQueryBuilder(Post_1.Post, "post")
                        .select("post.id")
                        .leftJoin("post.tags", "tags_join")
                        .where({
                        tags: {
                            name: (0, src_1.IsNull)(),
                        },
                    })
                        .getQueryAndParameters();
                }).to.throw();
            })));
        });
        describe("one-to-one", () => {
            it("should craft query with exact value", () => Promise.all(connections.map(async (connection) => {
                const [sql, params] = connection
                    .createQueryBuilder(Post_1.Post, "post")
                    .select("post.id")
                    .leftJoin("post.heroImage", "hero_join")
                    .where({
                    heroImage: {
                        url: "Foo",
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "post"."id" AS "post_id" FROM "post" "post" ' +
                    'LEFT JOIN "hero_image" "hero_join" ON "hero_join"."id"="post"."heroImageId" ' +
                    'WHERE "hero_join"."url" = ?');
                (0, chai_1.expect)(params).to.eql(["Foo"]);
            })));
            it("should craft query with FindOperator", () => Promise.all(connections.map(async (connection) => {
                const [sql, params] = connection
                    .createQueryBuilder(Post_1.Post, "post")
                    .select("post.id")
                    .leftJoin("post.heroImage", "hero_join")
                    .where({
                    heroImage: {
                        url: (0, src_1.IsNull)(),
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "post"."id" AS "post_id" FROM "post" "post" ' +
                    'LEFT JOIN "hero_image" "hero_join" ON "hero_join"."id"="post"."heroImageId" ' +
                    'WHERE "hero_join"."url" IS NULL');
                (0, chai_1.expect)(params).to.eql([]);
            })));
        });
        describe("deeply nested relations", () => {
            it("should craft query with exact value", () => Promise.all(connections.map(async (connection) => {
                // For github issue #7251
                const [sql, params] = connection
                    .createQueryBuilder(HeroImage_1.HeroImage, "hero")
                    .leftJoin("hero.post", "posts")
                    .leftJoin("posts.category", "category")
                    .where({
                    post: {
                        category: {
                            name: "Foo",
                        },
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "hero"."id" AS "hero_id", "hero"."url" AS "hero_url" ' +
                    'FROM "hero_image" "hero" ' +
                    'LEFT JOIN "post" "posts" ON "posts"."heroImageId"="hero"."id"  ' +
                    'LEFT JOIN "category" "category" ON "category"."id"="posts"."categoryId" ' +
                    'WHERE "category"."name" = ?');
                (0, chai_1.expect)(params).to.eql(["Foo"]);
            })));
            it("should craft query with FindOperator", () => Promise.all(connections.map(async (connection) => {
                // For github issue #4906
                const [sql, params] = connection
                    .createQueryBuilder(HeroImage_1.HeroImage, "hero")
                    .leftJoin("hero.post", "posts")
                    .leftJoin("posts.category", "category")
                    .where({
                    post: {
                        category: {
                            name: (0, src_1.In)(["Foo", "Bar", "Baz"]),
                        },
                    },
                })
                    .getQueryAndParameters();
                (0, chai_1.expect)(sql).to.equal('SELECT "hero"."id" AS "hero_id", "hero"."url" AS "hero_url" ' +
                    'FROM "hero_image" "hero" ' +
                    'LEFT JOIN "post" "posts" ON "posts"."heroImageId"="hero"."id"  ' +
                    'LEFT JOIN "category" "category" ON "category"."id"="posts"."categoryId" ' +
                    'WHERE "category"."name" IN (?, ?, ?)');
                (0, chai_1.expect)(params).to.eql(["Foo", "Bar", "Baz"]);
            })));
        });
    });
    describe("query execution and retrieval", () => {
        it("should return a single entity for getOne when found", () => Promise.all(connections.map(async (connection) => {
            await connection.getRepository(Post_1.Post).save({
                id: "1",
                title: "Hello",
                description: "World",
                rating: 0,
            });
            const entity = await connection
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.id = :id", { id: "1" })
                .getOne();
            (0, chai_1.expect)(entity).not.to.be.null;
            (0, chai_1.expect)(entity.id).to.equal("1");
            (0, chai_1.expect)(entity.title).to.equal("Hello");
        })));
        it("should return undefined for getOne when not found", () => Promise.all(connections.map(async (connection) => {
            await connection.getRepository(Post_1.Post).save({
                id: "1",
                title: "Hello",
                description: "World",
                rating: 0,
            });
            const entity = await connection
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.id = :id", { id: "2" })
                .getOne();
            (0, chai_1.expect)(entity).to.be.null;
        })));
        it("should return a single entity for getOneOrFail when found", () => Promise.all(connections.map(async (connection) => {
            await connection.getRepository(Post_1.Post).save({
                id: "1",
                title: "Hello",
                description: "World",
                rating: 0,
            });
            const entity = await connection
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.id = :id", { id: "1" })
                .getOneOrFail();
            (0, chai_1.expect)(entity.id).to.equal("1");
            (0, chai_1.expect)(entity.title).to.equal("Hello");
        })));
        it("should throw an Error for getOneOrFail when not found", () => Promise.all(connections.map(async (connection) => {
            await connection.getRepository(Post_1.Post).save({
                id: "1",
                title: "Hello",
                description: "World",
                rating: 0,
            });
            await (0, chai_1.expect)(connection
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.id = :id", { id: "2" })
                .getOneOrFail()).to.be.rejectedWith("");
        })));
    });
    describe("where-in-ids", () => {
        it("should create expected query with simple primary keys", () => Promise.all(connections.map(async (connection) => {
            const [sql, params] = connection
                .createQueryBuilder(Post_1.Post, "post")
                .select("post.id")
                .whereInIds(["1", "2", "5", "9"])
                .disableEscaping()
                .getQueryAndParameters();
            (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id FROM post post WHERE post.id IN (?, ?, ?, ?)");
            (0, chai_1.expect)(params).to.eql(["1", "2", "5", "9"]);
        })));
        it("should create expected query with composite primary keys", () => Promise.all(connections.map(async (connection) => {
            const [sql, params] = connection
                .createQueryBuilder(ExternalPost_1.ExternalPost, "post")
                .select("post.id")
                .whereInIds([
                { outlet: "foo", id: "1" },
                { outlet: "bar", id: "2" },
                { outlet: "baz", id: "5" },
            ])
                .disableEscaping()
                .getQueryAndParameters();
            (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id FROM external_post post WHERE " +
                "(((post.outlet = ? AND post.id = ?)) OR " +
                "((post.outlet = ? AND post.id = ?)) OR " +
                "((post.outlet = ? AND post.id = ?)))");
            (0, chai_1.expect)(params).to.eql(["foo", "1", "bar", "2", "baz", "5"]);
        })));
        it("should create expected query with composite primary keys with missing value", () => Promise.all(connections.map(async (connection) => {
            const [sql, params] = connection
                .createQueryBuilder(ExternalPost_1.ExternalPost, "post")
                .select("post.id")
                .whereInIds([
                { outlet: "foo", id: "1" },
                { outlet: "bar", id: "2" },
                { id: "5" },
            ])
                .disableEscaping()
                .getQueryAndParameters();
            (0, chai_1.expect)(sql).to.equal("SELECT post.id AS post_id FROM external_post post WHERE " +
                "(((post.outlet = ? AND post.id = ?)) OR " +
                "((post.outlet = ? AND post.id = ?)) OR " +
                "(post.id = ?))");
            (0, chai_1.expect)(params).to.eql(["foo", "1", "bar", "2", "5"]);
        })));
    });
    it("Support max execution time", () => Promise.all(connections.map(async (connection) => {
        // MAX_EXECUTION_TIME supports only in MySQL
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .maxExecutionTime(1000)
            .getSql();
        (0, chai_1.expect)(sql).contains("SELECT /*+ MAX_EXECUTION_TIME(1000) */");
    })));
    it("Support using certain index", () => Promise.all(connections.map(async (connection) => {
        // `USE INDEX` is only supported in MySQL
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            return;
        }
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .useIndex("my_index")
            .getSql();
        (0, chai_1.expect)(sql).contains("FROM post USE INDEX (my_index)");
    })));
});
//# sourceMappingURL=query-builder-select.js.map