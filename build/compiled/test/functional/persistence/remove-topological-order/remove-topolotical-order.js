"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../utils/test-utils");
// import {expect} from "chai";
describe("persistence > remove-topological-order", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should remove depend properties in a proper order", () => Promise.all(connections.map(async (connection) => {
        // insert some data
        const category1 = new Category_1.Category();
        category1.name = "cat#1";
        const category2 = new Category_1.Category();
        category2.name = "cat#2";
        const post = new Post_1.Post();
        post.title = "about post";
        post.categories = [category1, category2];
        // check insertion
        await connection.manager.save(post);
        // check deletion
        await connection.manager.remove([category2, post, category1]);
        // todo: finish test, e.g. check actual queries
    })));
});
//# sourceMappingURL=remove-topolotical-order.js.map