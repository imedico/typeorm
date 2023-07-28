"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Test_1 = require("./entity/Test");
const chai_1 = require("chai");
describe("query builder > comment", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should scrub end comment pattern from string", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .comment("Hello World */")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World  \*\/ /);
    })));
    it("should not allow an empty comment", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .comment("")
            .getSql();
        (0, chai_1.expect)(sql).to.not.match(/^\/\* Hello World  \*\/ /);
    })));
    it("should allow a comment with just whitespaces", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .comment(" ")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\*   \*\/ /);
    })));
    it("should allow a multi-line comment", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .comment("Hello World\nIt's a beautiful day!")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World\nIt's a beautiful day! \*\/ /);
    })));
    it("should include comment in select", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .comment("Hello World")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World \*\/ /);
    })));
    it("should include comment in update", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .update()
            .set({ id: 2 })
            .comment("Hello World")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World \*\/ /);
    })));
    it("should include comment in insert", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .insert()
            .values({ id: 1 })
            .comment("Hello World")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World \*\/ /);
    })));
    it("should include comment in delete", () => Promise.all(connections.map(async (connection) => {
        const sql = connection.manager
            .createQueryBuilder(Test_1.Test, "test")
            .delete()
            .comment("Hello World")
            .getSql();
        (0, chai_1.expect)(sql).to.match(/^\/\* Hello World \*\/ /);
    })));
});
//# sourceMappingURL=query-builder-comment.js.map