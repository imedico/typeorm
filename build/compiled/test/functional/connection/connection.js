"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Guest_1 = require("./entity/v1/Guest");
const Comment_1 = require("./entity/v1/Comment");
const Guest_2 = require("./entity/v2/Guest");
const Comment_2 = require("./entity/v2/Comment");
const View_1 = require("./entity/View");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../utils/test-utils");
const DataSource_1 = require("../../../src/data-source/DataSource");
const Repository_1 = require("../../../src/repository/Repository");
const TreeRepository_1 = require("../../../src/repository/TreeRepository");
const NoConnectionForRepositoryError_1 = require("../../../src/error/NoConnectionForRepositoryError");
const EntityManager_1 = require("../../../src/entity-manager/EntityManager");
const CannotGetEntityManagerNotConnectedError_1 = require("../../../src/error/CannotGetEntityManagerNotConnectedError");
describe("Connection", () => {
    // const resourceDir = __dirname + "/../../../../../test/functional/connection/";
    describe("before connection is established", function () {
        let dataSource;
        before(async () => {
            const options = (0, test_utils_1.setupSingleTestingConnection)("mysql", {
                name: "default",
                entities: [],
            });
            if (!options)
                return;
            dataSource = new DataSource_1.DataSource(options);
        });
        after(() => {
            if (dataSource && dataSource.isInitialized)
                return dataSource.destroy();
            return Promise.resolve();
        });
        it("connection.isConnected should be false", () => {
            if (!dataSource)
                return;
            dataSource.isInitialized.should.be.false;
        });
        it.skip("entity manager and reactive entity manager should not be accessible", () => {
            (0, chai_1.expect)(() => dataSource.manager).to.throw(CannotGetEntityManagerNotConnectedError_1.CannotGetEntityManagerNotConnectedError);
            // expect(() => connection.reactiveEntityManager).to.throw(CannotGetEntityManagerNotConnectedError);
        });
        // todo: they aren't promises anymore
        /*it("import entities, entity schemas, subscribers and naming strategies should work", () => {
         return Promise.all([
         connection.importEntities([Post]).should.be.fulfilled,
         connection.importEntitySchemas([]).should.be.fulfilled,
         connection.importSubscribers([]).should.be.fulfilled,
         connection.importNamingStrategies([]).should.be.fulfilled,
         connection.importEntitiesFromDirectories([]).should.be.fulfilled,
         connection.importEntitySchemaFromDirectories([]).should.be.fulfilled,
         connection.importSubscribersFromDirectories([]).should.be.fulfilled,
         connection.importNamingStrategiesFromDirectories([]).should.be.fulfilled
         ]);
         });*/
        it("should not be able to close", () => {
            if (!dataSource)
                return;
            return dataSource.close().should.be.rejected; // CannotCloseNotConnectedError
        });
        it("should not be able to sync a schema", () => {
            if (!dataSource)
                return;
            return dataSource.synchronize().should.be.rejected; // CannotCloseNotConnectedError
        });
        it.skip("should not be able to use repositories", () => {
            if (!dataSource)
                return;
            (0, chai_1.expect)(() => dataSource.getRepository(Post_1.Post)).to.throw(NoConnectionForRepositoryError_1.NoConnectionForRepositoryError);
            (0, chai_1.expect)(() => dataSource.getTreeRepository(Category_1.Category)).to.throw(NoConnectionForRepositoryError_1.NoConnectionForRepositoryError);
            // expect(() => connection.getReactiveRepository(Post)).to.throw(NoConnectionForRepositoryError);
            // expect(() => connection.getReactiveTreeRepository(Category)).to.throw(NoConnectionForRepositoryError);
        });
        it("should be able to connect", () => {
            if (!dataSource)
                return;
            return dataSource.connect().should.be.fulfilled;
        });
    });
    describe.skip("establishing connection", function () {
        it("should throw DriverOptionNotSetError when extra.socketPath and host is missing", function () {
            (0, chai_1.expect)(() => {
                new DataSource_1.DataSource({
                    type: "mysql",
                    username: "test",
                    password: "test",
                    database: "test",
                    entities: [],
                    dropSchema: false,
                });
            }).to.throw(Error);
        });
    });
    describe("after connection is established successfully", function () {
        let connections;
        beforeEach(() => (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post, Category_1.Category],
            schemaCreate: true,
            dropSchema: true,
        }).then((all) => (connections = all)));
        afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("connection.isConnected should be true", () => connections.forEach((connection) => {
            connection.isInitialized.should.be.true;
        }));
        it("entity manager and reactive entity manager should be accessible", () => connections.forEach((connection) => {
            (0, chai_1.expect)(connection.manager).to.be.instanceOf(EntityManager_1.EntityManager);
            // expect(connection.reactiveEntityManager).to.be.instanceOf(ReactiveEntityManager);
        }));
        it("should not be able to connect again", () => connections.forEach((connection) => {
            return connection.connect().should.be.rejected; // CannotConnectAlreadyConnectedError
        }));
        it("should be able to close a connection", async () => Promise.all(connections.map((connection) => {
            return connection.close();
        })));
    });
    describe("working with repositories after connection is established successfully", function () {
        let connections;
        before(() => (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post, Category_1.Category],
            schemaCreate: true,
            dropSchema: true,
        }).then((all) => (connections = all)));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should be able to get simple entity repository", () => connections.forEach((connection) => {
            connection.getRepository(Post_1.Post).should.be.instanceOf(Repository_1.Repository);
            connection
                .getRepository(Post_1.Post)
                .should.not.be.instanceOf(TreeRepository_1.TreeRepository);
            connection.getRepository(Post_1.Post).target.should.be.eql(Post_1.Post);
        }));
        it("should be able to get tree entity repository", () => connections.forEach((connection) => {
            connection
                .getTreeRepository(Category_1.Category)
                .should.be.instanceOf(TreeRepository_1.TreeRepository);
            connection
                .getTreeRepository(Category_1.Category)
                .target.should.be.eql(Category_1.Category);
        }));
        // it("should be able to get simple entity reactive repository", () => connections.forEach(connection => {
        //     connection.getReactiveRepository(Post).should.be.instanceOf(ReactiveRepository);
        //     connection.getReactiveRepository(Post).should.not.be.instanceOf(TreeReactiveRepository);
        //     connection.getReactiveRepository(Post).target.should.be.eql(Post);
        // }));
        // it("should be able to get tree entity reactive repository", () => connections.forEach(connection => {
        //     connection.getReactiveTreeRepository(Category).should.be.instanceOf(TreeReactiveRepository);
        //     connection.getReactiveTreeRepository(Category).target.should.be.eql(Category);
        // }));
        // it("should not be able to get tree entity repository of the non-tree entities", () => connections.forEach(connection => {
        //     expect(() => connection.getTreeRepository(Post)).to.throw(Error); // RepositoryNotTreeError
        //     // expect(() => connection.getReactiveTreeRepository(Post)).to.throw(RepositoryNotTreeError);
        // }));
        // it("should not be able to get repositories that are not registered", () => connections.forEach(connection => {
        //     expect(() => connection.getRepository("SomeEntity")).to.throw(Error); // RepositoryNotTreeError
        //     expect(() => connection.getTreeRepository("SomeEntity")).to.throw(Error); // RepositoryNotTreeError
        //     // expect(() => connection.getReactiveRepository("SomeEntity")).to.throw(RepositoryNotFoundError);
        //     // expect(() => connection.getReactiveTreeRepository("SomeEntity")).to.throw(RepositoryNotFoundError);
        // }));
    });
    describe("generate a schema when connection.synchronize is called", function () {
        let connections;
        before(() => (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            schemaCreate: true,
            dropSchema: true,
        }).then((all) => (connections = all)));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("database should be empty after schema is synced with dropDatabase flag", () => Promise.all(connections.map(async (connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const post = new Post_1.Post();
            post.title = "new post";
            await postRepository.save(post);
            const loadedPost = await postRepository.findOneBy({
                id: post.id,
            });
            (0, chai_1.expect)(loadedPost).to.be.eql(post);
            await connection.synchronize(true);
            const againLoadedPost = await postRepository.findOneBy({
                id: post.id,
            });
            (0, chai_1.expect)(againLoadedPost).to.be.null;
        })));
    });
    describe("log a schema when connection.logSyncSchema is called", function () {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should return sql log properly", () => Promise.all(connections.map(async (connection) => {
            await connection.driver.createSchemaBuilder().log();
            // console.log(sql);
        })));
    });
    describe("after connection is closed successfully", function () {
        // open a close connections
        let connections = [];
        before(() => (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            schemaCreate: true,
            dropSchema: true,
        }).then((all) => {
            connections = all;
            return Promise.all(connections.map((connection) => connection.close()));
        }));
        it("should not be able to close already closed connection", () => connections.forEach((connection) => {
            return connection.close().should.be.rejected; // CannotCloseNotConnectedError
        }));
        it("connection.isConnected should be false", () => connections.forEach((connection) => {
            connection.isInitialized.should.be.false;
        }));
    });
    describe("skip schema generation when synchronize option is set to false", function () {
        let connections;
        beforeEach(() => (0, test_utils_1.createTestingConnections)({
            entities: [View_1.View],
            dropSchema: true,
        }).then((all) => (connections = all)));
        afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("database should be empty after schema sync", () => Promise.all(connections.map(async (connection) => {
            await connection.synchronize(true);
            const queryRunner = connection.createQueryRunner();
            let schema = await queryRunner.getTables(["view"]);
            await queryRunner.release();
            (0, chai_1.expect)(schema.some((table) => table.name === "view")).to.be
                .false;
        })));
    });
    describe("different names of the same content of the schema", () => {
        let connections;
        beforeEach(async () => {
            const connections1 = await (0, test_utils_1.createTestingConnections)({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [Comment_1.Comment, Guest_1.Guest],
                schema: "test-schema",
                dropSchema: true,
            });
            const connections2 = await (0, test_utils_1.createTestingConnections)({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [Comment_1.Comment, Guest_1.Guest],
                schema: "another-schema",
                dropSchema: true,
            });
            connections = [...connections1, ...connections2];
        });
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should not interfere with each other", async () => {
            await Promise.all(connections.map((c) => c.synchronize()));
            await (0, test_utils_1.closeTestingConnections)(connections);
            const connections1 = await (0, test_utils_1.createTestingConnections)({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [Comment_2.Comment, Guest_2.Guest],
                schema: "test-schema",
                dropSchema: false,
                schemaCreate: true,
            });
            const connections2 = await (0, test_utils_1.createTestingConnections)({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [Comment_2.Comment, Guest_2.Guest],
                schema: "another-schema",
                dropSchema: false,
                schemaCreate: true,
            });
            connections = [...connections1, ...connections2];
        });
    });
    describe("can change postgres default schema name", () => {
        let connections;
        beforeEach(async () => {
            const connections1 = await (0, test_utils_1.createTestingConnections)({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [Comment_1.Comment, Guest_1.Guest],
                schema: "test-schema",
                dropSchema: true,
            });
            const connections2 = await (0, test_utils_1.createTestingConnections)({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [Comment_1.Comment, Guest_1.Guest],
                schema: "another-schema",
                dropSchema: true,
            });
            connections = [...connections1, ...connections2];
        });
        afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("schema name can be set", () => {
            return Promise.all(connections.map(async (connection) => {
                await connection.synchronize(true);
                const schemaName = connection.options.schema;
                const comment = new Comment_1.Comment();
                comment.title = "Change SchemaName";
                comment.context = `To ${schemaName}`;
                const commentRepo = connection.getRepository(Comment_1.Comment);
                await commentRepo.save(comment);
                const queryRunner = connection.createQueryRunner();
                const rows = await queryRunner.query(`select * from "${schemaName}"."comment" where id = $1`, [comment.id]);
                await queryRunner.release();
                (0, chai_1.expect)(rows[0]["context"]).to.be.eq(comment.context);
            }));
        });
    });
});
//# sourceMappingURL=connection.js.map