"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const User_1 = require("./entity/User");
describe("persistence > basic functionality", function () {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save an entity", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(new Post_1.Post(1, "Hello Post"));
    })));
    it("should remove an entity", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post(1, "Hello Post");
        await connection.manager.save(post);
        await connection.manager.remove(post);
    })));
    it("should throw an error when not an object is passed to a save method", () => Promise.all(connections.map(async (connection) => {
        await connection.manager
            .save(undefined)
            .should.be.rejectedWith(`Cannot save, given value must be an entity, instead "undefined" is given.`);
        await connection.manager
            .save(null)
            .should.be.rejectedWith(`Cannot save, given value must be an entity, instead "null" is given.`);
        await connection.manager
            .save(123)
            .should.be.rejectedWith(`Cannot save, given value must be an entity, instead "123" is given.`);
    })));
    it("should throw an error when not an object is passed to a remove method", () => Promise.all(connections.map(async (connection) => {
        await connection.manager
            .remove(undefined)
            .should.be.rejectedWith(`Cannot remove, given value must be an entity, instead "undefined" is given.`);
        await connection.manager
            .remove(null)
            .should.be.rejectedWith(`Cannot remove, given value must be an entity, instead "null" is given.`);
        await connection.manager
            .remove(123)
            .should.be.rejectedWith(`Cannot remove, given value must be an entity, instead "123" is given.`);
    })));
    it("should throw an exception if object literal is given instead of constructed entity because it cannot determine what to save", () => Promise.all(connections.map(async (connection) => {
        await connection.manager
            .save({})
            .should.be.rejectedWith(`Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
        await connection.manager
            .save([{}, {}])
            .should.be.rejectedWith(`Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
        await connection.manager
            .save([new Post_1.Post(1, "Hello Post"), {}])
            .should.be.rejectedWith(`Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
        await connection.manager
            .remove({})
            .should.be.rejectedWith(`Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
        await connection.manager
            .remove([{}, {}])
            .should.be.rejectedWith(`Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
        await connection.manager
            .remove([new Post_1.Post(1, "Hello Post"), {}])
            .should.be.rejectedWith(`Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.`);
    })));
    it("should be able to save and remove entities of different types", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post(1, "Hello Post");
        const category = new Category_1.Category(1, "Hello Category");
        const user = new User_1.User(1, "Hello User");
        await connection.manager.save([post, category, user]);
        await connection.manager
            .findOneBy(Post_1.Post, { id: 1 })
            .should.eventually.eql({ id: 1, title: "Hello Post" });
        await connection.manager
            .findOneBy(Category_1.Category, { id: 1 })
            .should.eventually.eql({ id: 1, name: "Hello Category" });
        await connection.manager
            .findOneBy(User_1.User, { id: 1 })
            .should.eventually.eql({ id: 1, name: "Hello User" });
        await connection.manager.remove([post, category, user]);
        await connection.manager.findOneBy(Post_1.Post, { id: 1 }).should
            .eventually.be.null;
        await connection.manager.findOneBy(Category_1.Category, { id: 1 }).should
            .eventually.be.null;
        await connection.manager.findOneBy(User_1.User, { id: 1 }).should
            .eventually.be.null;
    })));
});
//# sourceMappingURL=persistence-basic-functionality.js.map