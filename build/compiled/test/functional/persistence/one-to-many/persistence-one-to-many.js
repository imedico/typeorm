"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../utils/test-utils");
describe("persistence > one-to-many", function () {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    let connections;
    before(() => {
        return (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post, Category_1.Category],
        }).then((all) => (connections = all));
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should add exist element to exist object with empty one-to-many relation and save it", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        const newCategory = categoryRepository.create();
        newCategory.id = 1;
        newCategory.name = "Animals";
        await categoryRepository.save(newCategory);
        const newPost = postRepository.create();
        newPost.id = 1;
        newPost.title = "All about animals";
        await postRepository.save(newPost);
        newPost.categories = [newCategory];
        await postRepository.save(newPost);
        const loadedPost = await postRepository.findOne({
            where: {
                id: newPost.id,
            },
            relations: {
                categories: true,
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).not.to.be.undefined;
        (0, chai_1.expect)(loadedPost.categories[0]).not.to.be.undefined;
    })));
    it("should add exist element to new object with empty one-to-many relation and save it", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        const newCategory = categoryRepository.create();
        newCategory.id = 1;
        newCategory.name = "Animals";
        await categoryRepository.save(newCategory);
        const newPost = postRepository.create();
        newPost.id = 1;
        newPost.title = "All about animals";
        newPost.categories = [newCategory];
        await postRepository.save(newPost);
        const loadedPost = await postRepository.findOne({
            where: {
                id: newPost.id,
            },
            relations: {
                categories: true,
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).not.to.be.undefined;
        (0, chai_1.expect)(loadedPost.categories[0]).not.to.be.undefined;
    })));
    it("should remove exist element from one-to-many relation and save it", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        const firstNewCategory = categoryRepository.create();
        firstNewCategory.id = 1;
        firstNewCategory.name = "Animals";
        await categoryRepository.save(firstNewCategory);
        const secondNewCategory = categoryRepository.create();
        secondNewCategory.id = 2;
        secondNewCategory.name = "Insects";
        await categoryRepository.save(secondNewCategory);
        const newPost = postRepository.create();
        newPost.id = 1;
        newPost.title = "All about animals";
        await postRepository.save(newPost);
        newPost.categories = [firstNewCategory, secondNewCategory];
        await postRepository.save(newPost);
        newPost.categories = [firstNewCategory];
        await postRepository.save(newPost);
        const loadedPost = await postRepository.findOne({
            where: {
                id: newPost.id,
            },
            join: {
                alias: "post",
                innerJoinAndSelect: {
                    categories: "post.categories",
                },
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).not.to.be.undefined;
        (0, chai_1.expect)(loadedPost.categories[0]).not.to.be.undefined;
        (0, chai_1.expect)(loadedPost.categories[1]).to.be.undefined;
    })));
    it("should remove all elements from one-to-many relation and save it", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        let firstNewCategory = categoryRepository.create();
        firstNewCategory.id = 1;
        firstNewCategory.name = "Animals";
        await categoryRepository.save(firstNewCategory);
        let secondNewCategory = categoryRepository.create();
        secondNewCategory.id = 2;
        secondNewCategory.name = "Insects";
        await categoryRepository.save(secondNewCategory);
        let newPost = postRepository.create();
        newPost.id = 1;
        newPost.title = "All about animals";
        await postRepository.save(newPost);
        newPost.categories = [firstNewCategory, secondNewCategory];
        await postRepository.save(newPost);
        newPost.categories = [];
        await postRepository.save(newPost);
        const loadedPost = await postRepository.findOne({
            where: {
                id: newPost.id,
            },
            join: {
                alias: "post",
                leftJoinAndSelect: {
                    categories: "post.categories",
                },
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).to.be.eql([]);
    })));
    it("set relation to null (elements exist there) from one-to-many relation and save it", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        let firstNewCategory = categoryRepository.create();
        firstNewCategory.id = 1;
        firstNewCategory.name = "Animals";
        await categoryRepository.save(firstNewCategory);
        let secondNewCategory = categoryRepository.create();
        secondNewCategory.id = 2;
        secondNewCategory.name = "Insects";
        await categoryRepository.save(secondNewCategory);
        let newPost = postRepository.create();
        newPost.id = 1;
        newPost.title = "All about animals";
        await postRepository.save(newPost);
        newPost.categories = [firstNewCategory, secondNewCategory];
        await postRepository.save(newPost);
        newPost.categories = null;
        await postRepository.save(newPost);
        const loadedPost = (await postRepository.findOne({
            where: {
                id: newPost.id,
            },
            join: {
                alias: "post",
                leftJoinAndSelect: {
                    categories: "post.categories",
                },
            },
        }));
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).to.be.eql([]);
    })));
});
//# sourceMappingURL=persistence-one-to-many.js.map