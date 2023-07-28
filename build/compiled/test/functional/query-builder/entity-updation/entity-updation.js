"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("query builder > entity updation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update entity model after insertion if updateEntity is set to true", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post)
            .updateEntity(true)
            .execute();
        post.title.should.be.equal("about entity updation in query builder");
        post.order.should.be.equal(100);
        post.createDate.should.be.instanceof(Date);
        post.updateDate.should.be.instanceof(Date);
    })));
    it("should not update entity model after insertion if updateEntity is set to false", () => Promise.all(connections.map(async (connection) => {
        // for spanner we skip this test, because it's not possible to do it right considering we faked primary generated column
        // for the spanner and we have updateEntity(false) in this test, but we cannot disable subscriber defined in the tests setup
        // for the spanner and it updates the entity with it's id anyway
        if (connection.driver.options.type === "spanner")
            return;
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post)
            .updateEntity(false)
            .execute();
        (0, chai_1.expect)(post.id).to.be.undefined;
        post.title.should.be.equal("about entity updation in query builder");
        (0, chai_1.expect)(post.order).to.be.undefined;
        (0, chai_1.expect)(post.createDate).to.be.undefined;
        (0, chai_1.expect)(post.updateDate).to.be.undefined;
    })));
    it("should not override already set properties", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        post.order = 101;
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post)
            .updateEntity(true)
            .execute();
        post.title.should.be.equal("about entity updation in query builder");
        post.order.should.be.equal(101);
        post.createDate.should.be.instanceof(Date);
        post.updateDate.should.be.instanceof(Date);
    })));
    it("should update entity model after save", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        await connection.manager.save(post);
        post.version.should.be.equal(1);
        await connection.manager.save(post);
        post.version.should.be.equal(1);
        post.title = "changed title";
        await connection.manager.save(post);
        post.version.should.be.equal(2);
    })));
    it("should update special entity properties after entity updation if updateEntity is set to true", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        await connection.manager.save(post);
        post.version.should.be.equal(1);
        await connection
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({ title: "again changed title" })
            .whereEntity(post)
            .updateEntity(true)
            .execute();
        post.version.should.be.equal(2);
    })));
    it("should not update special entity properties after entity updation if updateEntity is set to false", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about entity updation in query builder";
        await connection.manager.save(post);
        post.version.should.be.equal(1);
        await connection
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({ title: "again changed title" })
            .whereEntity(post)
            .updateEntity(false)
            .execute();
        post.version.should.be.equal(1);
    })));
});
//# sourceMappingURL=entity-updation.js.map