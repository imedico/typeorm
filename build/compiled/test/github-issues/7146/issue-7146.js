"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #7146 Lazy relations resolve to 'undefined' instead of 'null'", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const savedPost = new Post_1.Post();
        await connection.manager.save(savedPost);
    }
    // The following 3 tests hilight the reported issue.
    // The remaining 6 tests were already succeeding before, but are included for completeness sake.
    describe("lazy-loaded relations", () => {
        it("should return null if ManyToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(await post.lazyManyToOne).to.be.null;
        })));
        it("should return null if OneToOne+JoinColumn relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(await post.lazyOneToOneOwner).to.be.null;
        })));
        it("should return null if OneToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(await post.lazyOneToOne).to.be.null;
        })));
    });
    describe("lazy-loaded relations included in 'relations' find option", () => {
        it("should return null if ManyToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneOrFail(Post_1.Post, {
                where: {
                    id: 1,
                },
                relations: {
                    lazyManyToOne: true,
                },
            });
            (0, chai_1.expect)(await post.lazyManyToOne).to.be.null;
        })));
        it("should return null if OneToOne+JoinColumn relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneOrFail(Post_1.Post, {
                where: {
                    id: 1,
                },
                relations: {
                    lazyOneToOneOwner: true,
                },
            });
            (0, chai_1.expect)(await post.lazyOneToOneOwner).to.be.null;
        })));
        it("should return null if OneToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneOrFail(Post_1.Post, {
                where: {
                    id: 1,
                },
                relations: {
                    lazyOneToOne: true,
                },
            });
            (0, chai_1.expect)(await post.lazyOneToOne).to.be.null;
        })));
    });
    describe("eager-loaded relations", () => {
        it("should return null if ManyToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(post.eagerManyToOne).to.be.null;
        })));
        it("should return null if OneToOne+JoinColumn relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(post.eagerOneToOneOwner).to.be.null;
        })));
        it("should return null if OneToOne relation has NULL in database", () => Promise.all(connections.map(async (connection) => {
            await prepareData(connection);
            const post = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
            (0, chai_1.expect)(post.eagerOneToOne).to.be.null;
        })));
    });
});
//# sourceMappingURL=issue-7146.js.map