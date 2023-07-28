"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const src_1 = require("../../../../src");
const PostWithVersion_1 = require("./entity/PostWithVersion");
const chai_1 = require("chai");
const PostWithoutVersionAndUpdateDate_1 = require("./entity/PostWithoutVersionAndUpdateDate");
const PostWithUpdateDate_1 = require("./entity/PostWithUpdateDate");
const PostWithVersionAndUpdatedDate_1 = require("./entity/PostWithVersionAndUpdatedDate");
const Post_1 = require("./entity/Post");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("repository > find options > locking", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should throw error if pessimistic lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        if (connection.driver.options.type === "cockroachdb") {
            return Promise.all([
                connection
                    .getRepository(PostWithVersion_1.PostWithVersion)
                    .findOne({
                    where: { id: 1 },
                    lock: { mode: "pessimistic_write" },
                })
                    .should.be.rejectedWith(src_1.PessimisticLockTransactionRequiredError),
            ]);
        }
        return Promise.all([
            connection
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: { mode: "pessimistic_read" },
            })
                .should.be.rejectedWith(src_1.PessimisticLockTransactionRequiredError),
            connection
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: { mode: "pessimistic_write" },
            })
                .should.be.rejectedWith(src_1.PessimisticLockTransactionRequiredError),
        ]);
    })));
    it("should not throw error if pessimistic lock used with transaction", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        if (connection.driver.options.type === "cockroachdb") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .getRepository(PostWithVersion_1.PostWithVersion)
                        .findOne({
                        where: { id: 1 },
                        lock: { mode: "pessimistic_write" },
                    }).should.not.be.rejected,
                ]);
            });
        }
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager.getRepository(PostWithVersion_1.PostWithVersion).find({
                    where: { id: 1 },
                    lock: { mode: "pessimistic_read" },
                }).should.not.be.rejected,
                entityManager.getRepository(PostWithVersion_1.PostWithVersion).find({
                    where: { id: 1 },
                    lock: { mode: "pessimistic_write" },
                }).should.not.be.rejected,
            ]);
        });
    })));
    it("should attach pessimistic read lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager.getRepository(PostWithVersion_1.PostWithVersion).find({
                where: { id: 1 },
                lock: { mode: "pessimistic_read" },
            });
        });
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            (0, chai_1.expect)(executedSql[0].indexOf("LOCK IN SHARE MODE") !== -1)
                .to.be.true;
        }
        else if (connection.driver.options.type === "postgres") {
            (0, chai_1.expect)(executedSql[0].indexOf("FOR SHARE") !== -1).to.be
                .true;
        }
        else if (connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(executedSql[0].indexOf("FOR UPDATE") !== -1).to.be
                .true;
        }
        else if (connection.driver.options.type === "mssql") {
            (0, chai_1.expect)(executedSql[0].indexOf("WITH (HOLDLOCK, ROWLOCK)") !==
                -1).to.be.true;
        }
    })));
    it("should attach for no key update lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: { mode: "for_no_key_update" },
            });
        });
        (0, chai_1.expect)(executedSql.join(" ").includes("FOR NO KEY UPDATE")).to
            .be.true;
    })));
    it("should attach for key share lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: { mode: "for_key_share" },
            });
        });
        (0, chai_1.expect)(executedSql.join(" ").includes("FOR KEY SHARE")).to.be
            .true;
    })));
    it("should attach SKIP LOCKED for pessimistic_read", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            (connection.driver.options.type === "mysql" &&
                DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0"))))
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: {
                    mode: "pessimistic_read",
                    onLocked: "skip_locked",
                },
            });
        });
        (0, chai_1.expect)(executedSql.join(" ").includes("FOR SHARE SKIP LOCKED"))
            .to.be.true;
    })));
    it("should attach NOWAIT for pessimistic_write", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) &&
                DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0"))))
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: {
                    mode: "pessimistic_write",
                    onLocked: "nowait",
                },
            });
        });
        (0, chai_1.expect)(executedSql.join(" ").includes("FOR UPDATE NOWAIT")).to
            .be.true;
    })));
    it("should attach pessimistic write lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager.getRepository(PostWithVersion_1.PostWithVersion).find({
                where: { id: 1 },
                lock: { mode: "pessimistic_write" },
            });
        });
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(executedSql[0].indexOf("FOR UPDATE") !== -1).to.be
                .true;
        }
        else if (connection.driver.options.type === "mssql") {
            (0, chai_1.expect)(executedSql[0].indexOf("WITH (UPDLOCK, ROWLOCK)") !==
                -1).to.be.true;
        }
    })));
    it("should attach dirty read lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "mssql"))
            return;
        const executedSql = [];
        await connection.manager.transaction((entityManager) => {
            const originalQuery = entityManager.queryRunner.query.bind(entityManager.queryRunner);
            entityManager.queryRunner.query = (...args) => {
                executedSql.push(args[0]);
                return originalQuery(...args);
            };
            return entityManager
                .getRepository(PostWithVersion_1.PostWithVersion)
                .findOne({
                where: { id: 1 },
                lock: { mode: "dirty_read" },
            });
        });
        (0, chai_1.expect)(executedSql[0].indexOf("WITH (NOLOCK)") !== -1).to.be
            .true;
    })));
    it("should throw error if optimistic lock used with `find` method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .getRepository(PostWithVersion_1.PostWithVersion)
            .find({ lock: { mode: "optimistic", version: 1 } })
            .should.be.rejectedWith(src_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should not throw error if optimistic lock used with `findOne` method", () => Promise.all(connections.map(async (connection) => {
        return connection.getRepository(PostWithVersion_1.PostWithVersion).findOne({
            where: { id: 1 },
            lock: { mode: "optimistic", version: 1 },
        }).should.not.be.rejected;
    })));
    it("should throw error if entity does not have version and update date columns", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .getRepository(PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate)
            .findOne({
            where: { id: 1 },
            lock: { mode: "optimistic", version: 1 },
        })
            .should.be.rejectedWith(src_1.NoVersionOrUpdateDateColumnError);
    })));
    it("should throw error if actual version does not equal expected version", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithVersion_1.PostWithVersion();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .getRepository(PostWithVersion_1.PostWithVersion)
            .findOne({
            where: { id: 1 },
            lock: { mode: "optimistic", version: 2 },
        })
            .should.be.rejectedWith(src_1.OptimisticLockVersionMismatchError);
    })));
    it("should not throw error if actual version and expected versions are equal", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithVersion_1.PostWithVersion();
        post.title = "New post";
        await connection.manager.save(post);
        return connection.getRepository(PostWithVersion_1.PostWithVersion).findOne({
            where: { id: 1 },
            lock: { mode: "optimistic", version: 1 },
        }).should.not.be.rejected;
    })));
    it("should throw error if actual updated date does not equal expected updated date", () => Promise.all(connections.map(async (connection) => {
        // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
        if (connection.driver.options.type === "mssql")
            return;
        const post = new PostWithUpdateDate_1.PostWithUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .getRepository(PostWithUpdateDate_1.PostWithUpdateDate)
            .findOne({
            where: { id: 1 },
            lock: {
                mode: "optimistic",
                version: new Date(2017, 1, 1),
            },
        })
            .should.be.rejectedWith(src_1.OptimisticLockVersionMismatchError);
    })));
    it("should not throw error if actual updated date and expected updated date are equal", () => Promise.all(connections.map(async (connection) => {
        // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
        if (connection.driver.options.type === "mssql")
            return;
        const post = new PostWithUpdateDate_1.PostWithUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection.getRepository(PostWithUpdateDate_1.PostWithUpdateDate).findOne({
            where: { id: 1 },
            lock: { mode: "optimistic", version: post.updateDate },
        }).should.not.be.rejected;
    })));
    it("should work if both version and update date columns applied", () => Promise.all(connections.map(async (connection) => {
        // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
        if (connection.driver.options.type === "mssql")
            return;
        const post = new PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate();
        post.title = "New post";
        await connection.manager.save(post);
        return Promise.all([
            connection
                .getRepository(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate)
                .findOne({
                where: { id: 1 },
                lock: {
                    mode: "optimistic",
                    version: post.updateDate,
                },
            }).should.not.be.rejected,
            connection
                .getRepository(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate)
                .findOne({
                where: { id: 1 },
                lock: { mode: "optimistic", version: 1 },
            }).should.not.be.rejected,
        ]);
    })));
    it("should throw error if pessimistic locking not supported by given driver", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap")
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .getRepository(PostWithVersion_1.PostWithVersion)
                        .findOne({
                        where: { id: 1 },
                        lock: { mode: "pessimistic_read" },
                    })
                        .should.be.rejectedWith(src_1.LockNotSupportedOnGivenDriverError),
                    entityManager
                        .getRepository(PostWithVersion_1.PostWithVersion)
                        .findOne({
                        where: { id: 1 },
                        lock: { mode: "pessimistic_write" },
                    })
                        .should.be.rejectedWith(src_1.LockNotSupportedOnGivenDriverError),
                ]);
            });
        return;
    })));
    it("should not allow empty array for lockTables", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .getRepository(Post_1.Post)
                    .findOne({
                    where: { id: 1 },
                    lock: { mode: "pessimistic_write", tables: [] },
                })
                    .should.be.rejectedWith("lockTables cannot be an empty array"),
            ]);
        });
    })));
    it("should throw error when specifying a table that is not part of the query", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .getRepository(Post_1.Post)
                    .findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "pessimistic_write",
                        tables: ["img"],
                    },
                })
                    .should.be.rejectedWith('"img" is not part of this query'),
            ]);
        });
    })));
    it("should allow on a left join", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "cockroachdb") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager.getRepository(Post_1.Post).findOne({
                        where: { id: 1 },
                        relations: { author: true },
                        lock: {
                            mode: "pessimistic_write",
                            tables: ["post"],
                        },
                    }),
                    entityManager.getRepository(Post_1.Post).findOne({
                        where: { id: 1 },
                        relations: { author: true },
                        lock: { mode: "pessimistic_write" },
                    }),
                ]);
            });
        }
        if (connection.driver.options.type === "postgres") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager.getRepository(Post_1.Post).findOne({
                        where: { id: 1 },
                        relations: { author: true },
                        lock: {
                            mode: "pessimistic_write",
                            tables: ["post"],
                        },
                    }),
                    entityManager
                        .getRepository(Post_1.Post)
                        .findOne({
                        where: { id: 1 },
                        relations: { author: true },
                        lock: { mode: "pessimistic_write" },
                    })
                        .should.be.rejectedWith("FOR UPDATE cannot be applied to the nullable side of an outer join"),
                ]);
            });
        }
        return;
    })));
    it("should allow using lockTables on all types of locking", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "pessimistic_read",
                        tables: ["post"],
                    },
                }),
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "pessimistic_write",
                        tables: ["post"],
                    },
                }),
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "pessimistic_partial_write",
                        tables: ["post"],
                    },
                }),
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "pessimistic_write_or_fail",
                        tables: ["post"],
                    },
                }),
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "for_no_key_update",
                        tables: ["post"],
                    },
                }),
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    relations: { author: true },
                    lock: {
                        mode: "for_key_share",
                        tables: ["post"],
                    },
                }),
            ]);
        });
    })));
    it("should allow locking a relation of a relation", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager.getRepository(Post_1.Post).findOne({
                    where: { id: 1 },
                    join: {
                        alias: "post",
                        innerJoinAndSelect: {
                            categorys: "post.categories",
                            images: "categorys.images",
                        },
                    },
                    lock: {
                        mode: "pessimistic_write",
                        tables: ["image"],
                    },
                }),
            ]);
        });
    })));
});
//# sourceMappingURL=find-options-locking.js.map