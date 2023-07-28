"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Example_1 = require("./entity/Example");
const src_1 = require("../../../src");
describe("github issues > #2286 find operators like MoreThan and LessThan doesn't work properly for date fields", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Example_1.Example],
        schemaCreate: true,
        dropSchema: true,
        /* Test not eligible for better-sql where binding Dates is impossible */
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should find a record by its datetime value with find options", () => Promise.all(connections.map(async (connection) => {
        const start = new Date("2000-01-01");
        const end = new Date("2001-01-01");
        const middle = new Date("2000-06-30");
        const post = new Post_1.Post();
        post.dateTimeColumn = middle;
        await connection.manager.save(post);
        const postByDateEquals = await connection.manager.findOneBy(Post_1.Post, {
            dateTimeColumn: middle,
        });
        (0, chai_1.expect)(postByDateEquals).to.not.be.undefined;
        const postByDateBetween = await connection.manager.findOneBy(Post_1.Post, {
            dateTimeColumn: (0, src_1.Between)(start, end),
        });
        (0, chai_1.expect)(postByDateBetween).to.not.be.undefined;
    })));
    it("should find a record by its datetime value with query builder", () => Promise.all(connections.map(async (connection) => {
        const now = new Date();
        const post = new Post_1.Post();
        post.dateTimeColumn = now;
        await connection.manager.save(post);
        const postByDateEquals = await connection.manager
            .getRepository(Post_1.Post)
            .createQueryBuilder("post")
            .where("post.dateTimeColumn = :now", { now })
            .getOne();
        (0, chai_1.expect)(postByDateEquals).to.not.be.undefined;
    })));
    it("should save, update, and load with a date PK", () => Promise.all(connections.map(async (connection) => {
        const start = new Date("2000-01-01");
        const middle = new Date("2000-06-30");
        const end = new Date("2001-01-01");
        await connection.manager.save(Example_1.Example, {
            id: start,
            text: "start",
        });
        await connection.manager.save(Example_1.Example, {
            id: middle,
            text: "middle",
        });
        await connection.manager.save(Example_1.Example, { id: end, text: "end" });
        const repo = connection.manager.getRepository(Example_1.Example);
        let example = await repo.findOneByOrFail({ id: middle });
        (0, chai_1.expect)(example.text).to.be.equal("middle");
        example.text = "in between";
        await repo.save(example);
        example = await repo.findOneByOrFail({ id: middle });
        (0, chai_1.expect)(example.text).to.be.equal("in between");
    })));
});
//# sourceMappingURL=issue-2286.js.map