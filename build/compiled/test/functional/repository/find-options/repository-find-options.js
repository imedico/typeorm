"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Photo_1 = require("./entity/Photo");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const src_1 = require("../../../../src");
const util_1 = require("util");
const fs_1 = require("fs");
describe("repository > find options", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load relations", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        const category = new Category_1.Category();
        category.name = "Boys";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "About Alex Messer";
        post.author = user;
        post.categories = [category];
        await connection.manager.save(post);
        const [loadedPost] = await connection.getRepository(Post_1.Post).find({
            relations: { author: true, categories: true },
        });
        (0, chai_1.expect)(loadedPost).to.be.eql({
            id: 1,
            title: "About Alex Messer",
            author: {
                id: 1,
                name: "Alex Messer",
            },
            categories: [
                {
                    id: 1,
                    name: "Boys",
                },
            ],
        });
    })));
    it("should execute select query inside transaction", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        const queryRunner = await connection.createQueryRunner();
        const startTransactionFn = sinon_1.default.spy(queryRunner, "startTransaction");
        const commitTransactionFn = sinon_1.default.spy(queryRunner, "commitTransaction");
        (0, chai_1.expect)(startTransactionFn.called).to.be.false;
        (0, chai_1.expect)(commitTransactionFn.called).to.be.false;
        await connection
            .createEntityManager(queryRunner)
            .getRepository(User_1.User)
            .findOne({
            where: {
                id: 1,
            },
            transaction: true,
        });
        (0, chai_1.expect)(startTransactionFn.calledOnce).to.be.true;
        (0, chai_1.expect)(commitTransactionFn.calledOnce).to.be.true;
        await queryRunner.release();
    })));
    it("should select specific columns", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "Bears";
        await connection.manager.save(category);
        const categories = [category];
        const photos = [];
        for (let i = 1; i < 10; i++) {
            const photo = new Photo_1.Photo();
            photo.name = `Me and Bears ${i}`;
            photo.description = `I am near bears ${i}`;
            photo.filename = `photo-with-bears-${i}.jpg`;
            photo.views = 10;
            photo.isPublished = false;
            photo.categories = categories;
            photos.push(photo);
            await connection.manager.save(photo);
        }
        const loadedPhoto = await connection
            .getRepository(Photo_1.Photo)
            .findOne({
            select: { name: true },
            where: {
                id: 5,
            },
        });
        const loadedPhotos1 = await connection
            .getRepository(Photo_1.Photo)
            .find({
            select: { filename: true, views: true },
        });
        const loadedPhotos2 = await connection
            .getRepository(Photo_1.Photo)
            .find({
            select: { id: true, name: true, description: true },
            relations: { categories: true },
        });
        // const loadedPhotos3 = await connection.getRepository(Photo).createQueryBuilder("photo")
        //     .select(["photo.name", "photo.description"])
        //     .addSelect(["category.name"])
        //     .leftJoin("photo.categories", "category")
        //     .getMany();
        (0, chai_1.expect)(loadedPhoto).to.be.eql({
            name: "Me and Bears 5",
        });
        (0, chai_1.expect)(loadedPhotos1).to.have.deep.members(photos.map((photo) => ({
            filename: photo.filename,
            views: photo.views,
        })));
        (0, chai_1.expect)(loadedPhotos2).to.have.deep.members(photos.map((photo) => ({
            id: photo.id,
            name: photo.name,
            description: photo.description,
            categories,
        })));
        // expect(loadedPhotos3).to.have.deep.members(photos.map(photo => ({
        //     name: photo.name,
        //     description: photo.description,
        //     categories: categories.map(category => ({
        //         name: category.name,
        //     })),
        // })));
    })));
    it("should select by given conditions", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "Bears";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "Dogs";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "Cats";
        await connection.manager.save(category3);
        const loadedCategories1 = await connection
            .getRepository(Category_1.Category)
            .find({
            where: {
                name: "Bears",
            },
        });
        (0, chai_1.expect)(loadedCategories1).to.be.eql([
            {
                id: 1,
                name: "Bears",
            },
        ]);
        const loadedCategories2 = await connection
            .getRepository(Category_1.Category)
            .find({
            where: [
                {
                    name: "Bears",
                },
                {
                    name: "Cats",
                },
            ],
            order: { id: "ASC" },
        });
        (0, chai_1.expect)(loadedCategories2).to.be.eql([
            {
                id: 1,
                name: "Bears",
            },
            {
                id: 3,
                name: "Cats",
            },
        ]);
    })));
});
describe("repository > find options > comment", () => {
    let connections;
    const logPath = "find_comment_test.log";
    before(async () => {
        // TODO: would be nice to be able to do this in memory with some kind of
        // test logger that buffers messages.
        const logger = new src_1.FileLogger(["query"], { logPath });
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            createLogger: () => logger,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(async () => {
        await (0, test_utils_1.closeTestingConnections)(connections);
        await (0, util_1.promisify)(fs_1.unlink)(logPath);
    });
    it("repository should insert comment", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(User_1.User)
            .find({ comment: "This is a query comment." });
        const logs = await (0, util_1.promisify)(fs_1.readFile)(logPath);
        const lines = logs.toString().split("\n");
        const lastLine = lines[lines.length - 2]; // last line is blank after newline
        // remove timestamp and prefix
        const sql = lastLine.replace(/^.*\[QUERY\]\: /, "");
        (0, chai_1.expect)(sql).to.match(/^\/\* This is a query comment. \*\//);
    })));
});
describe("repository > find options > cache", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        cache: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("repository should cache results properly", () => Promise.all(connections.map(async (connection) => {
        // first prepare data - insert users
        const user1 = new User_1.User();
        user1.name = "Harry";
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.name = "Ron";
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.name = "Hermione";
        await connection.manager.save(user3);
        // select for the first time with caching enabled
        const users1 = await connection
            .getRepository(User_1.User)
            .find({ cache: true });
        (0, chai_1.expect)(users1.length).to.be.equal(3);
        // insert new entity
        const user4 = new User_1.User();
        user4.name = "Ginny";
        await connection.manager.save(user4);
        // without cache it must return really how many there entities are
        const users2 = await connection.getRepository(User_1.User).find();
        (0, chai_1.expect)(users2.length).to.be.equal(4);
        // but with cache enabled it must not return newly inserted entity since cache is not expired yet
        const users3 = await connection
            .getRepository(User_1.User)
            .find({ cache: true });
        (0, chai_1.expect)(users3.length).to.be.equal(3);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // now, when our cache has expired we check if we have new user inserted even with cache enabled
        const users4 = await connection
            .getRepository(User_1.User)
            .find({ cache: true });
        (0, chai_1.expect)(users4.length).to.be.equal(4);
    })));
});
//# sourceMappingURL=repository-find-options.js.map