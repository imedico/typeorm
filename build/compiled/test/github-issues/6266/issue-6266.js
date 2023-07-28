"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const src_1 = require("../../../src");
const chai_1 = require("chai");
describe("github issues > #6266 Many identical selects after insert bunch of items", () => {
    let connections;
    const posts = [
        {
            title: "Post 1",
        },
        {
            title: "Post 2",
        },
        {
            title: "Post 3",
        },
        {
            title: "Post 4",
        },
    ];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should execute a single SELECT to get inserted default and generated values of multiple entities", () => Promise.all(connections.map(async (connection) => {
        const selectSpy = sinon_1.default.spy(src_1.SelectQueryBuilder.prototype, "select");
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(posts)
            .execute();
        chai_1.assert.strictEqual(selectSpy.calledOnce, true);
        selectSpy.restore();
    })));
});
//# sourceMappingURL=issue-6266.js.map