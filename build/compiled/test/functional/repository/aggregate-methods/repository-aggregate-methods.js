"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const src_1 = require("../../../../src");
const chai_1 = require("chai");
describe("repository > aggregate methods", () => {
    debugger;
    let connections;
    let repository;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            schemaCreate: true,
            dropSchema: true,
        });
        repository = connections[0].getRepository(Post_1.Post);
        for (let i = 0; i < 100; i++) {
            const post = new Post_1.Post();
            post.id = i;
            post.counter = i + 1;
            await repository.save(post);
        }
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("sum", () => {
        it("should return the aggregate sum", async () => {
            const sum = await repository.sum("counter");
            (0, chai_1.expect)(sum).to.equal(5050);
        });
        it("should return null when 0 rows match the query", async () => {
            const sum = await repository.sum("counter", { id: (0, src_1.LessThan)(0) });
            (0, chai_1.expect)(sum).to.be.null;
        });
    });
    describe("average", () => {
        it("should return the aggregate average", async () => {
            const average = await repository.average("counter");
            // Some RDBMSs (e.g. SQL Server) will return an int when averaging an int column, so either
            // answer is acceptable.
            (0, chai_1.expect)([50, 50.5]).to.include(average);
        });
        it("should return null when 0 rows match the query", async () => {
            const average = await repository.average("counter", {
                id: (0, src_1.LessThan)(0),
            });
            (0, chai_1.expect)(average).to.be.null;
        });
    });
    describe("minimum", () => {
        it("should return the aggregate minimum", async () => {
            const minimum = await repository.minimum("counter");
            (0, chai_1.expect)(minimum).to.equal(1);
        });
        it("should return null when 0 rows match the query", async () => {
            const minimum = await repository.minimum("counter", {
                id: (0, src_1.LessThan)(0),
            });
            (0, chai_1.expect)(minimum).to.be.null;
        });
    });
    describe("maximum", () => {
        it("should return the aggregate maximum", async () => {
            const maximum = await repository.maximum("counter");
            (0, chai_1.expect)(maximum).to.equal(100);
        });
        it("should return null when 0 rows match the query", async () => {
            const maximum = await repository.maximum("counter", {
                id: (0, src_1.LessThan)(0),
            });
            (0, chai_1.expect)(maximum).to.be.null;
        });
    });
});
//# sourceMappingURL=repository-aggregate-methods.js.map