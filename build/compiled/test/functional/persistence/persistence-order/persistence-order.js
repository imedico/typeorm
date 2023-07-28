"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const DataSource_1 = require("../../../../src/data-source/DataSource");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const ConnectionMetadataBuilder_1 = require("../../../../src/connection/ConnectionMetadataBuilder");
const EntityMetadataValidator_1 = require("../../../../src/metadata-builder/EntityMetadataValidator");
const chai_1 = require("chai");
describe("persistence > order of persistence execution operations", () => {
    describe("should throw exception when non-resolvable circular relations found", function () {
        it("should throw CircularRelationsError", async () => {
            const connection = new DataSource_1.DataSource({
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [__dirname + "/entity/*{.js,.ts}"],
            });
            const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
            const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
                __dirname + "/entity/*{.js,.ts}",
            ]);
            const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
            (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).to.throw(Error);
        });
    });
    describe.skip("should persist all entities in correct order", function () {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("", () => Promise.all(connections.map(async (connection) => {
            // create first category and post and save them
            const category1 = new Category_1.Category();
            category1.name = "Category saved by cascades #1";
            const post1 = new Post_1.Post();
            post1.title = "Hello Post #1";
            post1.category = category1;
            await connection.manager.save(post1);
            // now check
            /*const posts = await connection.manager.find(Post, {
     alias: "post",
     innerJoinAndSelect: {
     category: "post.category"
     },
     orderBy: {
     "post.id": "ASC"
     }
     });

     posts.should.be.eql([{
     id: 1,
     title: "Hello Post #1",
     category: {
     id: 1,
     name: "Category saved by cascades #1"
     }
     }, {
     id: 2,
     title: "Hello Post #2",
     category: {
     id: 2,
     name: "Category saved by cascades #2"
     }
     }]);*/
        })));
    });
});
//# sourceMappingURL=persistence-order.js.map