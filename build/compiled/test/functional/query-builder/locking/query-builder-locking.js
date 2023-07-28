"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const PostWithVersion_1 = require("./entity/PostWithVersion");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const PostWithoutVersionAndUpdateDate_1 = require("./entity/PostWithoutVersionAndUpdateDate");
const PostWithUpdateDate_1 = require("./entity/PostWithUpdateDate");
const PostWithVersionAndUpdatedDate_1 = require("./entity/PostWithVersionAndUpdatedDate");
const OptimisticLockVersionMismatchError_1 = require("../../../../src/error/OptimisticLockVersionMismatchError");
const OptimisticLockCanNotBeUsedError_1 = require("../../../../src/error/OptimisticLockCanNotBeUsedError");
const NoVersionOrUpdateDateColumnError_1 = require("../../../../src/error/NoVersionOrUpdateDateColumnError");
const PessimisticLockTransactionRequiredError_1 = require("../../../../src/error/PessimisticLockTransactionRequiredError");
const LockNotSupportedOnGivenDriverError_1 = require("../../../../src/error/LockNotSupportedOnGivenDriverError");
const VersionUtils_1 = require("../../../../src/util/VersionUtils");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > locking", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not attach pessimistic read lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const sql = connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .where("post.id = :id", { id: 1 })
            .getSql();
        (0, chai_1.expect)(sql.indexOf("LOCK IN SHARE MODE") === -1).to.be.true;
        (0, chai_1.expect)(sql.indexOf("FOR SHARE") === -1).to.be.true;
        (0, chai_1.expect)(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") === -1).to.be
            .true;
    })));
    it("should throw error if pessimistic lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        return Promise.all([
            connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_read")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError),
            connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_write")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError),
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
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_write")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
                ]);
            });
        }
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("pessimistic_read")
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected,
                entityManager
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("pessimistic_write")
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected,
            ]);
        });
    })));
    it("should throw error if for no key update lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            return connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("for_no_key_update")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
        }
        return;
    })));
    it("should not throw error if for no key update lock used with transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("for_no_key_update")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
                ]);
            });
        }
        return;
    })));
    it("should throw error if for key share lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            return connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("for_key_share")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
        }
        return;
    })));
    it("should not throw error if for key share lock used with transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("for_key_share")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
                ]);
            });
        }
        return;
    })));
    it("should throw error if pessimistic_partial_write lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            return connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_partial_write")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
        }
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            let [{ version }] = await connection.query("SELECT VERSION() as version;");
            version = version.toLowerCase();
            if (version.includes("maria"))
                return; // not supported in mariadb
            if (VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "8.0.0")) {
                return connection
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("pessimistic_partial_write")
                    .where("post.id = :id", { id: 1 })
                    .getOne()
                    .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
            }
        }
        return;
    })));
    it("should not throw error if pessimistic_partial_write lock used with transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_partial_write")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
                ]);
            });
        }
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            let [{ version }] = await connection.query("SELECT VERSION() as version;");
            version = version.toLowerCase();
            if (version.includes("maria"))
                return; // not supported in mariadb
            if (VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "8.0.0")) {
                return connection.manager.transaction((entityManager) => {
                    return Promise.all([
                        entityManager
                            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("pessimistic_partial_write")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected,
                    ]);
                });
            }
        }
        return;
    })));
    it("should throw error if pessimistic_write_or_fail lock used without transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            return connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_write_or_fail")
                .where("post.id = :id", { id: 1 })
                .getOne()
                .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
        }
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            let [{ version }] = await connection.query("SELECT VERSION() as version;");
            version = version.toLowerCase();
            if ((version.includes("maria") &&
                VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "10.3.0")) ||
                (!version.includes("maria") &&
                    VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "8.0.0"))) {
                return connection
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("pessimistic_write_or_fail")
                    .where("post.id = :id", { id: 1 })
                    .getOne()
                    .should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError);
            }
        }
        return;
    })));
    it("should not throw error if pessimistic_write_or_fail lock used with transaction", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_write_or_fail")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
                ]);
            });
        }
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            let [{ version }] = await connection.query("SELECT VERSION() as version;");
            version = version.toLowerCase();
            if ((version.includes("maria") &&
                VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "10.3.0")) ||
                (!version.includes("maria") &&
                    VersionUtils_1.VersionUtils.isGreaterOrEqual(version, "8.0.0"))) {
                return connection.manager.transaction((entityManager) => {
                    return Promise.all([
                        entityManager
                            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("pessimistic_write_or_fail")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected,
                    ]);
                });
            }
        }
        return;
    })));
    it("should attach pessimistic read lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const sql = connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("pessimistic_read")
            .where("post.id = :id", { id: 1 })
            .getSql();
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            (0, chai_1.expect)(sql.indexOf("LOCK IN SHARE MODE") !== -1).to.be.true;
        }
        else if (connection.driver.options.type === "postgres") {
            (0, chai_1.expect)(sql.indexOf("FOR SHARE") !== -1).to.be.true;
        }
        else if (connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
        }
        else if (connection.driver.options.type === "mssql") {
            (0, chai_1.expect)(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") !== -1).to.be
                .true;
        }
    })));
    it("should attach dirty read lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "mssql"))
            return;
        const sql = connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("dirty_read")
            .where("post.id = :id", { id: 1 })
            .getSql();
        (0, chai_1.expect)(sql.indexOf("WITH (NOLOCK)") !== -1).to.be.true;
    })));
    it("should not attach pessimistic write lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const sql = connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .where("post.id = :id", { id: 1 })
            .getSql();
        (0, chai_1.expect)(sql.indexOf("FOR UPDATE") === -1).to.be.true;
        (0, chai_1.expect)(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") === -1).to.be.true;
    })));
    it("should attach pessimistic write lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return;
        const sql = connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("pessimistic_write")
            .where("post.id = :id", { id: 1 })
            .getSql();
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
        }
        else if (connection.driver.options.type === "mssql") {
            (0, chai_1.expect)(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") !== -1).to.be
                .true;
        }
    })));
    it("should not attach for no key update lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR NO KEY UPDATE") === -1).to.be.true;
        }
        return;
    })));
    it("should attach for no key update lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("for_no_key_update")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR NO KEY UPDATE") !== -1).to.be.true;
        }
        return;
    })));
    it("should not attach for key share lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR KEY SHARE") === -1).to.be.true;
        }
        return;
    })));
    it("should attach for key share lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("for_key_share")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR KEY SHARE") !== -1).to.be.true;
        }
        return;
    })));
    it("should not attach pessimistic_partial_write lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE SKIP LOCKED") === -1).to.be
                .true;
        }
        return;
    })));
    it("should attach pessimistic_partial_write lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_partial_write")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE SKIP LOCKED") !== -1).to.be
                .true;
        }
        return;
    })));
    it("should not attach pessimistic_write_or_fail lock statement on query if locking is not used", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "cockroachdb") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE NOWAIT") === -1).to.be.true;
        }
        return;
    })));
    it("should attach pessimistic_write_or_fail lock statement on query if locking enabled", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "cockroachdb") {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_write_or_fail")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.indexOf("FOR UPDATE NOWAIT") !== -1).to.be.true;
        }
        return;
    })));
    it("should throw error if optimistic lock used with getMany method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .getMany()
            .should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should throw error if optimistic lock used with getCount method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .getCount()
            .should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should throw error if optimistic lock used with getManyAndCount method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .getManyAndCount()
            .should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should throw error if optimistic lock used with getRawMany method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .getRawMany()
            .should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should throw error if optimistic lock used with getRawOne method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .where("post.id = :id", { id: 1 })
            .getRawOne()
            .should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError);
    })));
    it("should not throw error if optimistic lock used with getOne method", () => Promise.all(connections.map(async (connection) => {
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .where("post.id = :id", { id: 1 })
            .getOne().should.not.be.rejected;
    })));
    it.skip("should throw error if entity does not have version and update date columns", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .createQueryBuilder(PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate, "post")
            .setLock("optimistic", 1)
            .where("post.id = :id", { id: 1 })
            .getOne()
            .should.be.rejectedWith(NoVersionOrUpdateDateColumnError_1.NoVersionOrUpdateDateColumnError);
    })));
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual version does not equal expected version", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithVersion_1.PostWithVersion();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 2)
            .where("post.id = :id", { id: 1 })
            .getOne()
            .should.be.rejectedWith(OptimisticLockVersionMismatchError_1.OptimisticLockVersionMismatchError);
    })));
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual version and expected versions are equal", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithVersion_1.PostWithVersion();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
            .setLock("optimistic", 1)
            .where("post.id = :id", { id: 1 })
            .getOne().should.not.be.rejected;
    })));
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual updated date does not equal expected updated date", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithUpdateDate_1.PostWithUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .createQueryBuilder(PostWithUpdateDate_1.PostWithUpdateDate, "post")
            .setLock("optimistic", new Date(2017, 1, 1))
            .where("post.id = :id", { id: 1 })
            .getOne()
            .should.be.rejectedWith(OptimisticLockVersionMismatchError_1.OptimisticLockVersionMismatchError);
    })));
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual updated date and expected updated date are equal", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "mssql")
            return;
        const post = new PostWithUpdateDate_1.PostWithUpdateDate();
        post.title = "New post";
        await connection.manager.save(post);
        return connection
            .createQueryBuilder(PostWithUpdateDate_1.PostWithUpdateDate, "post")
            .setLock("optimistic", post.updateDate)
            .where("post.id = :id", { id: 1 })
            .getOne().should.not.be.rejected;
    })));
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should work if both version and update date columns applied", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate();
        post.title = "New post";
        await connection.manager.save(post);
        return Promise.all([
            connection
                .createQueryBuilder(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate, "post")
                .setLock("optimistic", post.updateDate)
                .where("post.id = :id", { id: 1 })
                .getOne().should.not.be.rejected,
            connection
                .createQueryBuilder(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate, "post")
                .setLock("optimistic", 1)
                .where("post.id = :id", { id: 1 })
                .getOne().should.not.be.rejected,
        ]);
    })));
    it("should throw error if pessimistic locking not supported by given driver", () => Promise.all(connections.map(async (connection) => {
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_read")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError),
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_write")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError),
                ]);
            });
        return;
    })));
    it("should throw error if for no key update locking not supported by given driver", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb")) {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("for_no_key_update")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError),
                ]);
            });
        }
        return;
    })));
    it("should throw error if for key share locking not supported by given driver", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isPostgresFamily(connection.driver)) {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("for_key_share")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError),
                ]);
            });
        }
        return;
    })));
    it("should only specify locked tables in FOR UPDATE OF clause if argument is given", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        const sql = connection
            .createQueryBuilder(Post_1.Post, "post")
            .innerJoin("post.author", "user")
            .setLock("pessimistic_write", undefined, ["user"])
            .getSql();
        (0, chai_1.expect)(sql).to.match(/FOR UPDATE OF user$/);
        const sql2 = connection
            .createQueryBuilder(Post_1.Post, "post")
            .innerJoin("post.author", "user")
            .setLock("pessimistic_write", undefined, ["post", "user"])
            .getSql();
        (0, chai_1.expect)(sql2).to.match(/FOR UPDATE OF post, user$/);
    })));
    it("should not allow empty array for lockTables", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .innerJoin("post.author", "user")
                    .setLock("pessimistic_write", undefined, [])
                    .getOne()
                    .should.be.rejectedWith("lockTables cannot be an empty array"),
            ]);
        });
    })));
    it("should throw error when specifying a table that is not part of the query", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager
            .transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .innerJoin("post.author", "user")
                    .setLock("pessimistic_write", undefined, [
                    "img",
                ])
                    .getOne(),
            ]);
            // With the exception being thrown the transaction is not closed. if ".should.be.rejectedWith" is added to the inner promise
        })
            .should.be.rejectedWith('relation "img" in FOR UPDATE clause not found in FROM clause');
    })));
    it("should allow on a left join", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "cockroachdb") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(Post_1.Post, "post")
                        .leftJoin("post.author", "user")
                        .setLock("pessimistic_write", undefined, [
                        "post",
                    ])
                        .getOne(),
                    entityManager
                        .createQueryBuilder(Post_1.Post, "post")
                        .leftJoin("post.author", "user")
                        .setLock("pessimistic_write")
                        .getOne(),
                ]);
            });
        }
        if (connection.driver.options.type === "postgres") {
            return connection.manager.transaction((entityManager) => {
                return Promise.all([
                    entityManager
                        .createQueryBuilder(Post_1.Post, "post")
                        .leftJoin("post.author", "user")
                        .setLock("pessimistic_write", undefined, [
                        "post",
                    ])
                        .getOne(),
                    entityManager
                        .createQueryBuilder(Post_1.Post, "post")
                        .leftJoin("post.author", "user")
                        .setLock("pessimistic_write")
                        .getOne()
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
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .leftJoin("post.author", "user")
                    .setLock("pessimistic_read", undefined, ["post"])
                    .getOne(),
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .leftJoin("post.author", "user")
                    .setLock("pessimistic_write", undefined, ["post"])
                    .getOne(),
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .leftJoin("post.author", "user")
                    .setLock("pessimistic_partial_write", undefined, [
                    "post",
                ])
                    .getOne(),
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .leftJoin("post.author", "user")
                    .setLock("pessimistic_write_or_fail", undefined, [
                    "post",
                ])
                    .getOne(),
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .leftJoin("post.author", "user")
                    .setLock("for_no_key_update", undefined, ["post"])
                    .getOne(),
            ]);
        });
    })));
    it("should allow locking a relation of a relation", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres" ||
            connection.driver.options.type === "cockroachdb"))
            return;
        return connection.manager.transaction((entityManager) => {
            return Promise.all([
                entityManager
                    .createQueryBuilder(Post_1.Post, "post")
                    .innerJoin("post.categories", "cat")
                    .innerJoin("cat.images", "img")
                    .setLock("pessimistic_write", undefined, ["img"])
                    .getOne(),
            ]);
        });
    })));
    it("pessimistic_partial_write and skip_locked works", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_partial_write")
                .setOnLocked("skip_locked")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.endsWith("FOR UPDATE SKIP LOCKED")).to.be.true;
        }
    })));
    it("pessimistic_write_or_fail and skip_locked ignores skip_locked", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_write_or_fail")
                .setOnLocked("skip_locked")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.endsWith("FOR UPDATE NOWAIT")).to.be.true;
        }
    })));
    it('skip_locked with "pessimistic_read"', () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            (connection.driver.options.type === "mysql" &&
                DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0"))) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_read")
                .setOnLocked("skip_locked")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.endsWith("FOR SHARE SKIP LOCKED")).to.be.true;
        }
    })));
    it('nowait with "pessimistic_read"', () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            (connection.driver.options.type === "mysql" &&
                DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0"))) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_read")
                .setOnLocked("nowait")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.endsWith("FOR SHARE NOWAIT")).to.be.true;
        }
    })));
    it('skip_locked with "pessimistic_read" check getOne', () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres" ||
            (connection.driver.options.type === "mysql" &&
                DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0"))) {
            return connection.manager.transaction((entityManager) => {
                return Promise.resolve(entityManager
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("pessimistic_read")
                    .setOnLocked("skip_locked")
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected);
            });
        }
    })));
    it('skip_locked with "for_key_share" check getOne', () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "postgres") {
            return connection.manager.transaction((entityManager) => {
                return Promise.resolve(entityManager
                    .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("for_key_share")
                    .setOnLocked("skip_locked")
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected);
            });
        }
    })));
    it('skip_locked with "pessimistic_read" fails on early versions of MySQL', () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "mysql" &&
            !DriverUtils_1.DriverUtils.isReleaseVersionOrGreater(connection.driver, "8.0.0")) {
            const sql = connection
                .createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_read")
                .setOnLocked("nowait")
                .where("post.id = :id", { id: 1 })
                .getSql();
            (0, chai_1.expect)(sql.endsWith("LOCK IN SHARE MODE")).to.be.true;
        }
    })));
});
//# sourceMappingURL=query-builder-locking.js.map